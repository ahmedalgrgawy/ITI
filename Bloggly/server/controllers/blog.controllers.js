import cloudinary from "../lib/cloudinary.js";
import Blog from "../models/blog.model.js"
import User from "../models/user.model.js";

export const getAllBlogs = async (req, res) => {
    try {

        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        const users = await User.find({});

        if (!blogs) return res.status(404).json({ message: "Blogs not found" });

        blogs.forEach(blog => {
            users.forEach(user => {
                if (blog.author.toString() === user._id.toString()) {
                    blog.author = user;
                }
            })
        })

        res.status(200).json({ success: true, blogs });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const postBlog = async (req, res) => {
    try {
        const { title, text, image, tags } = req.body;
        const user = req.user;
        let imgUrl;

        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image)
            imgUrl = uploadResponse.secure_url
        }

        const newPost = new Blog({ title, text, image: imgUrl, tags, author: req.user._id });

        await newPost.save();

        user.blogs.push(newPost);

        await user.save();

        res.status(201).json({ success: true, message: "Post created successfully" });

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const editBlog = async (req, res) => {
    try {

        const id = req.params.id;
        const { title, text, image, tags } = req.body;
        let imgUrl;

        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image)
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
        const query = req.params.query;

        if (!query) return res.status(404).json({ message: "No query provided" });

        if (query.length < 2) return res.status(404).json({ message: "Query must be at least 2 characters long" });

        const blogs = await Blog.find({
            title: { $regex: new RegExp(query, 'i') }
        });

        res.status(200).json(blogs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}