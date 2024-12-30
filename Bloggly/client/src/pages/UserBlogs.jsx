import { useEffect } from "react";
import { SingleBlogCard } from "../components/SingleBlogCard"
import { useBlogStore } from "../store/useBlog";

const UserBlogs = () => {

    const { userBlogs, getUserBlogs } = useBlogStore();

    useEffect(() => {
        getUserBlogs();
    }, [getUserBlogs])

    return (
        <div className="h-screen bg-base-100">
            <div className="flex items-center justify-center pt-20 px-4">
                <div className="flex justify-evenly items-start flex-wrap gap-y-10 p-4">

                    {userBlogs?.length === 0 && <h1 className="text-2xl text-primary">No Blogs Found</h1>}

                    {userBlogs?.map((blog) => <SingleBlogCard key={blog._id} {...blog} />)}
                </div>
            </div>
        </div>
    )
}

export default UserBlogs