import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    status: {
        type: String,
        enum: ['to-do', 'completed'],
        default: 'to-do'
    },
    tags: {
        type: [String],
        validate: {
            validator: function (tags) {
                return tags.every(tag => tag.length <= 10);
            },
            message: 'Tag length must be less than or equal to 10 characters'
        }
    },

}, { timestamps: true })

const List = mongoose.model("List", listSchema)

export default List