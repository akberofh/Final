import mongoose from "mongoose";


const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    catagory:{
      type: String,
      required: true, 
    },
    photo: {
      type: String, // base64 encoded ucun string qebul edir
      required: true,
      default: '',
  },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;