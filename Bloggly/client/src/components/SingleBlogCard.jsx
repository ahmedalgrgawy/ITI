import { formatDate } from "../utils/formateDate"
import img from "../assets/blog.png"
import { NavLink } from "react-router-dom"
import { getFirst15Words } from "../utils/getFirst15Words"

export const SingleBlogCard = (blog) => {

    return (
        <NavLink to={`/blog/${blog._id}`} className="card bg-base-100 w-[380px] shadow-xl cursor-pointer" >
            <figure >
                {
                    blog.image ? <img className="w-[350px] object-cover" src={blog.image} alt="Shoes" /> :
                        <img className="w-[350px] object-cover" src={img} alt="Shoes" />
                }
            </figure>
            <div className="card-body card">
                <h2 className="card-title text-primary capitalize font-bold">
                    {blog.title}
                </h2>
                <p className="text-[#ccc] py-2 leading-7">{getFirst15Words(blog.text)}</p>

                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col pb-2 w-full">
                        <p className="font-bold">{blog.author.name}</p>
                        <p>{formatDate(blog.createdAt)}</p>
                    </div>
                    {blog.tags.map((tag) => <div key={tag} className="badge p-3 mr-1 badge-outline capitalize">{tag}</div>)}
                </div>
            </div>
        </NavLink>
    )
}

