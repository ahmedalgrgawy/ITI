import List from "../models/list.model.js"

export const createList = async (req, res) => {
    try {
        const userId = req.user._id

        const { title, tags, status } = req.body;

        const newList = await List.create({ userId, title, status, tags })

        return res.status(201).json({ success: true, message: "List created successfully", newList })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error", error: error.message })
    }
}

export const getAllList = async (req, res) => {
    try {
        const userId = req.user._id

        const userList = await List.find({ userId })

        return res.status(200).json({ success: true, message: "Lists fetched successfully", userList })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error", error: error.message })
    }
}

export const editList = async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body

        const list = await List.findById(id)

        if (!list) {
            return res.status(404).json({ success: false, message: "List not found" })
        }

        const updatedList = await List.findByIdAndUpdate(id, data, { new: true })

        return res.status(200).json({ success: true, message: "List updated successfully", updatedList })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error", error: error.message })
    }
}


export const deleteList = async (req, res) => {
    try {
        const id = req.params.id

        const list = await List.findById(id)

        if (!list) {
            return res.status(404).json({ success: false, message: "List not found" })
        }

        const deletedList = await List.findByIdAndDelete(id)

        return res.status(200).json({ success: true, message: "List deleted successfully", deletedList })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error", error: error.message })
    }
}