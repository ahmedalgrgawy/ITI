import Blog from '../models/blog.model.js';
import User from '../models/user.model.js'
import { generateToken } from '../utils/generateToken.js'
import { storeTokenInCookies } from '../utils/storeToken.js'

export const getUserBlogs = async (req, res) => {
    try {

        const userId = req.user._id.toString();

        const blogs = await Blog.find({ author: userId }).sort({ createdAt: -1 })

        blogs.forEach(blog => {
            blog.author = req.user
        })

        return res.status(200).json({ success: true, blogs })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const checkAuth = async (req, res) => {
    try {
        return res.status(200).json({ success: true, message: "Authenticated", user: req.user })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const signup = async (req, res) => {
    try {

        const { email, name, password } = req.body

        if (!email || !name || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }

        const newUser = await User.create({ email, name, password })

        const { accessToken } = generateToken(newUser._id)

        storeTokenInCookies(res, accessToken)

        await newUser.save()

        newUser.password = undefined

        return res.status(201).json({ message: "User created successfully", newUser })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        const isMatch = await user.comparePassword(password)

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" })
        }

        const { accessToken } = generateToken(user._id)

        storeTokenInCookies(res, accessToken)

        user.password = undefined

        return res.status(200).json({
            success: true, message: "Logged in successfully", user
        })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("accessToken");

        return res.status(200).json({ success: true, message: "Logged out successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error", error: error.message })
    }
}
