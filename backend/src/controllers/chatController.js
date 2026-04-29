import Chat from "../models/Chat.js";
import Message from "../models/Message.js";

export const getMyChats = async (req, res) => {
  const chats = await Chat.find({ participants: req.user._id })
    .populate("participants", "name email profilePhoto")
    .sort({ updatedAt: -1 });

  res.json(chats);
};

export const getMessages = async (req, res) => {
  const chat = await Chat.findById(req.params.chatId);
  if (!chat || !chat.participants.some((p) => String(p) === String(req.user._id))) {
    return res.status(403).json({ message: "Not allowed" });
  }

  const messages = await Message.find({ chat: chat._id })
    .populate("sender", "name profilePhoto")
    .sort({ createdAt: 1 });

  res.json(messages);
};

export const createMessage = async (req, res) => {
  const { text } = req.body;
  const chat = await Chat.findById(req.params.chatId);
  if (!chat || !chat.participants.some((p) => String(p) === String(req.user._id))) {
    return res.status(403).json({ message: "Not allowed" });
  }

  const message = await Message.create({
    chat: chat._id,
    sender: req.user._id,
    text,
    readBy: [req.user._id],
  });

  chat.lastMessage = text;
  await chat.save();

  res.status(201).json(await message.populate("sender", "name profilePhoto"));
};
