import { NavLink, useNavigate, useParams } from "react-router-dom"
import { useBlogStore } from "../store/useBlog";
import { useAuthStore } from "../store/useAuth";
import { formatDate } from "../utils/formateDate";
import img from "../assets/blog.png";
import { useEffect } from "react";


export const SingleBlog = () => {

    const blogId = useParams().blogId;

    const navigate = useNavigate();

    const { deleteBlog, allBlogs } = useBlogStore();
    const { user } = useAuthStore();

    const blog = allBlogs.find(blog => blog._id === blogId);

    const handleDelete = async (blogId) => {

        const ask = window.confirm("Are you sure you want to delete this blog?");

        if (!ask) return

        const res = await deleteBlog(blogId);

        if (res.status === 200) {
            navigate("/user-blogs");
        }
    }

    return (
        <div className="h-screen mx-auto pt-20 w-3/4">
            <NavLink to={"/"} className="btn btn-outline mb-6">Back to Blogs</NavLink>

            <div className="card flex flex-col gap-4 items-center justify-center">
                <figure className="">
                    {blog.image ? (
                        <img className="w-3/5 object-cover" src={blog.image} alt={blog.title} />
                    ) : (
                        <img className="w-3/5 object-cover" src={img} alt={blog.title} />
                    )}
                </figure>
                <div className="card-body">
                    <h1 className="text-4xl font-bold text-primary mb-4 capitalize">{blog.title}</h1>
                    <div className="prose max-w-none mb-6 text-white  leading-7">
                        {blog.text}
                    </div>
                    <div className="flex flex-col mb-4 text-sm text-gray-500">
                        <p className="font-bold">By: {blog.author.name}</p>
                        <p>{formatDate(blog.createdAt)}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {blog.tags.map((tag) => (
                            <div key={tag} className="badge badge-outline capitalize p-3">
                                {tag}
                            </div>
                        ))}
                    </div>
                    {user && user._id === blog.author._id && (
                        <div className="flex justify-center gap-10 mt-6">
                            <NavLink to={`/edit-blog/${blog._id}`} className="btn btn-primary">
                                Edit
                            </NavLink>
                            <button onClick={() => handleDelete(blog._id)} className="btn btn-error">
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
