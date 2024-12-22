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

        const user = req.user;

        const { title, text, imgUrl, tags } = req.body;

        const newPost = new Blog({ title, text, imgUrl, tags, author: user._id });

        await newPost.save();

        res.status(201).json({ success: true, message: "Post created successfully", newPost });

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const editBlog = async (req, res) => {
    try {

        const id = req.params.id;
        const { title, text, imgUrl, tags } = req.body;

        const blog = await Blog.findById(id);

        if (blog.author != req.user._id) return res.status(401).json({ message: "Unauthorized" });

        if (!blog) return res.status(404).json({ message: "Blog not found" });

        blog.title = title || blog.title;

        blog.text = text || blog.text;

        blog.imgUrl = imgUrl || blog.imgUrl;

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

        if (blog.author != req.user._id) return res.status(401).json({ message: "Unauthorized" });

        if (!blog) return res.status(404).json({ message: "Blog not found" });

        await blog.remove();

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