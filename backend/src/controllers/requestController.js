import Request from "../models/Request.js";
import Chat from "../models/Chat.js";

export const sendRequest = async (req, res) => {
  const { receiver, message, offeredSkill, requestedSkill } = req.body;

  if (receiver === String(req.user._id)) {
    return res.status(400).json({ message: "You cannot send request to yourself" });
  }

  const existing = await Request.findOne({
    sender: req.user._id,
    receiver,
    status: { $in: ["Pending", "Accepted"] },
  });

  if (existing) return res.status(400).json({ message: "Request already exists" });

  const request = await Request.create({
    sender: req.user._id,
    receiver,
    message,
    offeredSkill,
    requestedSkill,
  });

  res.status(201).json(request);
};

export const myRequests = async (req, res) => {
  const requests = await Request.find({
    $or: [{ sender: req.user._id }, { receiver: req.user._id }],
  })
    .populate("sender", "name email profilePhoto teachSkills")
    .populate("receiver", "name email profilePhoto teachSkills")
    .sort({ createdAt: -1 });

  res.json(requests);
};

export const updateRequestStatus = async (req, res) => {
  const { status } = req.body;
  const request = await Request.findById(req.params.id);

  if (!request) return res.status(404).json({ message: "Request not found" });

  const isReceiver = String(request.receiver) === String(req.user._id);
  const isSender = String(request.sender) === String(req.user._id);

  if (!isReceiver && !isSender) {
    return res.status(403).json({ message: "Not allowed" });
  }

  if (status === "Cancelled" && !isSender) {
    return res.status(403).json({ message: "Only sender can cancel" });
  }

  if (["Accepted", "Rejected"].includes(status) && !isReceiver) {
    return res.status(403).json({ message: "Only receiver can accept/reject" });
  }

  request.status = status;
  await request.save();

  if (status === "Accepted") {
    const chatExists = await Chat.findOne({ request: request._id });
    if (!chatExists) {
      await Chat.create({
        participants: [request.sender, request.receiver],
        request: request._id,
      });
    }
  }

  res.json(request);
};
