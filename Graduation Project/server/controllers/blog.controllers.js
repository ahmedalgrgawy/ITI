import cloudinary from "../lib/cloudinary.js";
import Blog from "../models/blog.model.js"

export const getAllBlogs = async (req, res) => {
    try {

        const blogs = await Blog.find({}).sort({ createdAt: -1 });

        res.status(200).json(blogs);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const postBlog = async (req, res) => {
    try {
        const { title, text, img, tags } = req.body;
        let imgUrl;

        if (img) {
            const uploadResponse = await cloudinary.uploader.upload(img)
            imgUrl = uploadResponse.secure_url
        }

        const newPost = new Blog({ title, text, image: imgUrl, tags, author: req.user._id });

        await newPost.save();

        res.status(201).json({ success: true, message: "Post created successfully", newPost });

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const editBlog = async (req, res) => {
    try {

        const id = req.params.id;
        const { title, text, img, tags } = req.body;
        let imgUrl;

        if (img) {
            const uploadResponse = await cloudinary.uploader.upload(img)
            imgUrl = uploadResponse.secure_url
        }

        const blog = await Blog.findById(id);

        if (blog.author.toString() != req.user._id.toString()) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!blog) return res.status(404).json({ message: "Blog not found" });

        blog.title = title || blog.title;

        blog.text = text || blog.text;

        blog.image = imgUrl || blog.image;

        blog.tags = tags || blog.tags;

        await blog.save();

        res.status(200).json({ success: true, message: "Blog updated successfully", blog });

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteBlog = async (req, res) => {
    try {

        const id = req.params.id;

        const blog = await Blog.findById(id);

        if (blog.author.toString() != req.user._id.toString()) return res.status(401).json({ message: "Unauthorized" });

        if (!blog) return res.status(404).json({ message: "Blog not found" });

        await Blog.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Blog deleted successfully" });

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const searchBlog = async (req, res) => {
    try {
        const { query } = req.body;

        const posts = await Blog.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { author: { $regex: query, $options: 'i' } }
            ]
        });

        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}