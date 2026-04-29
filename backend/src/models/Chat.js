import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    request: { type: mongoose.Schema.Types.ObjectId, ref: "Request" },
    lastMessage: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
