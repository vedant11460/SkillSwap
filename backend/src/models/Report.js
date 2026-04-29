import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reportedUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ["Open", "Reviewed", "Closed"],
      default: "Open",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
