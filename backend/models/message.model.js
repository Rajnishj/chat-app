import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recieverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message:{
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

messageSchema.pre("save", function (next) {
  if (!this.message && !this.image) {
    const error = new Error("Either message or image is required");
    next(error); // Pass the error to stop saving
  } else {
    next(); // Proceed with the save if validation passes
  }
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
