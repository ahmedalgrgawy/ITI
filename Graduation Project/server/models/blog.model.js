import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        text: {
            type: String,
            required: [true, "text is required"],
        },
        imgUrl: {
            type: String,
            default: ""
        },
        tags: {
            type: [String],
            default: []
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;