import { SingleBlogCard } from "../components/SingleBlogCard";
import { useAuthStore } from "../store/useAuth";
import { useBlogStore } from "../store/useBlog";

const HomePage = () => {

    const { allBlogs } = useBlogStore();
    const { user } = useAuthStore()

    return (
        <div className="h-screen bg-base-100">
            <div className="flex items-center justify-center pt-20 px-4">
                <div className="flex justify-evenly items-start flex-wrap gap-y-10 p-4">

                    {user ?
                        allBlogs?.filter((blog) => blog.author._id !== user._id).map((blog) => <SingleBlogCard key={blog._id}  {...blog} />) :
                        allBlogs?.map((blog) => <SingleBlogCard key={blog._id}  {...blog} />)
                    }

                </div>
            </div>
        </div>
    );
}

export default HomePage