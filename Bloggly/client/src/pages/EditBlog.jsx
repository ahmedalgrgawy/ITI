import { useNavigate, useParams } from "react-router-dom";
import { useBlogStore } from "../store/useBlog";
import { useAuthStore } from "../store/useAuth";
import { useState } from "react";
import { XIcon } from "lucide-react";

const EditBlog = () => {

    const blogId = useParams().blogId;

    const navigate = useNavigate();

    const { editBlog, allBlogs, isLoading } = useBlogStore();

    const blog = allBlogs.find(blog => blog._id === blogId);

    const [formData, setFormData] = useState({
        title: blog?.title || "",
        text: blog?.text || "",
        image: blog?.image || "",
        tags: blog?.tags || [],
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddTag = (tag) => {
        if (tag && !formData.tags.includes(tag)) {
            setFormData({ ...formData, tags: [...formData.tags, tag] });
        }
    };

    const handleRemoveTag = (tag) => {
        setFormData({ ...formData, tags: formData.tags.filter((t, index) => index !== tag) });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageDelete = () => {
        setFormData({ ...formData, image: null });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedBlog = {
            ...blog,
            title: formData.title,
            text: formData.text,
            image: formData.image,
            tags: formData.tags,
        };

        const res = await editBlog(blogId, updatedBlog);

        if (res.status === 200) {
            navigate("/user-blogs");
        }
    };

    return (
        <div className="h-screen mx-auto pt-20 w-3/4">
            <button
                onClick={() => navigate(-1)}
                className="btn btn-outline mb-6"
            >
                Back to Blog
            </button>

            <div className="card p-6 bg-base-100 shadow-xl">
                <h1 className="text-3xl font-bold text-primary mb-6">Edit Blog</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Title</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="input input-bordered"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Text</span>
                        </label>
                        <textarea
                            name="text"
                            value={formData.text}
                            onChange={handleChange}
                            className="textarea textarea-bordered h-40 resize-none"
                            required
                        ></textarea>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Image</span>
                        </label>
                        {formData.image ? (
                            <div className="flex flex-col items-center">
                                <img src={formData.image} alt="Blog" className="w-3/5 object-cover mb-4" />
                                <button
                                    type="button"
                                    onClick={handleImageDelete}
                                    className="btn btn-error btn-outline"
                                >
                                    Delete Image
                                </button>
                            </div>
                        ) : (
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="file-input file-input-bordered"
                            />
                        )}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Tags</span>
                        </label>
                        <div className="flex gap-2 flex-wrap mb-2">
                            {formData.tags.map((tag, index) => (
                                <div key={index} className="badge badge-primary badge-outline flex justify-center p-3 mr-2 mb-2">
                                    {tag}
                                    <XIcon
                                        type="button"
                                        className="cursor-pointer hover:bg-red-500 ml-2 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center"
                                        onClick={() => handleRemoveTag(index)}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Add a tag"
                                className="input input-bordered flex-grow"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleAddTag(e.target.value);
                                        e.target.value = "";
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="btn btn-outline btn-error"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {isLoading ? "Saving..." : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditBlog