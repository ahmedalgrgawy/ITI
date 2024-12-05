import User from '../models/user.model.js'
import { generateToken } from '../utils/generateToken.js'
import { storeTokenInCookies } from '../utils/storeToken.js'

export const signup = async (req, res) => {
    try {

        const { email, username, firstName, password, age } = req.body

        if (!email || !username || !firstName || !password || !age) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }

        const newUser = new User({ email, username, firstName, password, age })

        const { accessToken } = generateToken(newUser._id)

        storeTokenInCookies(res, accessToken)

        newUser.save()

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

        return res.status(200).json({
            success: true, message: "Logged in successfully", user: {
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                age: user.age
            }
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

export const updateProfile = async (req, res) => {
    try {
        const { firstName, age } = req.body
        const userId = req.user._id

        const updatedUser = await User.findByIdAndUpdate(userId, { firstName: firstName || req.user.firstName, age: age || req.user.age }, { new: true }).select("-password")

        return res.status(200).json({ success: true, message: "User updated successfully", updatedUser })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error", error: error.message })
    }

}

export const getAllUsers = async (req, res) => {
    try {

        const users = await User.find({})

        const usersFirstName = users.map(user => user.firstName)

        return res.status(200).json({ success: true, users: usersFirstName })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error", error: error.message })
    }

}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id

        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        const deletedUser = await User.findByIdAndDelete(id).select("-password")

        return res.status(200).json({ success: true, message: "User deleted successfully", deletedUser })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error", error: error.message })
    }
}