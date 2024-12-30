import { XIcon } from "lucide-react";
import { useState } from "react";
import { useBlogStore } from "../store/useBlog";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AddBlog = () => {

    const navigate = useNavigate()

    const { addBlog } = useBlogStore()

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [tags, setTags] = useState([]);
    const [currentTag, setCurrentTag] = useState("");

    const [imagePreview, setImagePreview] = useState(null);

    const handleTagAddition = () => {
        if (currentTag.trim() !== "") {
            setTags([...tags, currentTag.trim()]);
            setCurrentTag("");
        }
    };

    const handleTagRemoval = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };


    const handleImgChange = (e) => {
        const file = e.target.files[0]

        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    }


    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await addBlog({
                title: title,
                text: text,
                image: imagePreview,
                tags: tags
            });


            if (res.status === 201) {
                setTitle("");
                setText("");
                setTags([]);
                setCurrentTag("");
                setImagePreview();

                navigate("/user-blogs");
            };

        } catch (error) {
            console.log(error);
        }

    };

    return (
        <div className="h-screen bg-base-100">
            <div className="flex items-center justify-center pt-20 px-4">
                <form onSubmit={handleFormSubmit} className="w-3/4 flex items-start justify-center gap-20 p-4">
                    <div className="flex flex-col gap-10 w-full">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter blog title"
                                className="input input-bordered w-full"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Content</span>
                            </label>
                            <textarea
                                placeholder="Write your blog content here..."
                                className="textarea textarea-bordered w-full h-60 resize-none"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                required
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex flex-col gap-10 w-full">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Image</span>
                            </label>
                            <input
                                type="file"
                                className="file-input file-input-bordered w-full"
                                onChange={handleImgChange}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Tags</span>
                            </label>
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    placeholder="Add a tag"
                                    className="input input-bordered flex-grow"
                                    value={currentTag}
                                    onChange={(e) => setCurrentTag(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleTagAddition}
                                >
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap mt-2">
                                {tags.map((tag, index) => (
                                    <div
                                        key={index}
                                        className="badge badge-primary badge-outline flex justify-center p-3 mr-2 mb-2"
                                    >
                                        {tag}
                                        <XIcon
                                            type="button"
                                            className="cursor-pointer hover:bg-red-500 ml-2 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center"
                                            onClick={() => handleTagRemoval(index)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="form-control mt-4">
                            <button type="submit" className="btn btn-primary w-full">
                                Add Blog
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
