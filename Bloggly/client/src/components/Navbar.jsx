import { Link } from "react-router-dom";
import { ArrowUpFromDot, Book, BookAIcon, LogIn, LogOut, PenBoxIcon, XIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuth";
import SearchBar from "./SearchBar";
import { useBlogStore } from "../store/useBlog";
import { getFirst15Words } from "../utils/getFirst15Words";


const Navbar = () => {

    const { logout, user } = useAuthStore();

    const { searchedBlogs, isLoading } = useBlogStore();

    const closeSearchResults = () => {
        useBlogStore.getState().setSearchedBlogs(null);
    }



    return (
        <header
            className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
            backdrop-blur-lg bg-base-100/80"
        >
            <div className="container mx-auto px-4 h-16">
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
                            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                <BookAIcon className="w-5 h-5 text-primary" />
                            </div>
                            <h1 className="text-lg font-bold">Bloggly</h1>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2">

                        <SearchBar />

                        <Link to="/" className="btn btn-sm gap-2 hover:bg-primary hover:text-white">
                            <Book className="size-5" />
                            <span className="hidden sm:inline">Blogs</span>
                        </Link>

                        {user && (
                            <>
                                <Link to="/add-blog" className="btn btn-sm gap-2 hover:bg-primary hover:text-white" >
                                    <PenBoxIcon className="size-5" />
                                    <span className="hidden sm:inline">Add Blog</span>
                                </Link>

                                <Link to={"/user-blogs"} className={`btn btn-sm gap-2 hover:bg-primary hover:text-white`}>
                                    <Book className="size-5" />
                                    <span className="hidden sm:inline">My Blogs</span>
                                </Link>

                                <button className="btn btn-sm hover:bg-red-500 hover:text-white gap-2" onClick={logout}>
                                    <LogOut className="size-5" />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </>
                        )}

                        {!user && (
                            <>
                                <Link to="/login" className="btn btn-sm gap-2">
                                    <LogIn className="size-5" />
                                    <span className="hidden sm:inline">Login</span>
                                </Link>
                                <Link to="/signup" className="btn btn-sm gap-2">
                                    <ArrowUpFromDot className="size-5" />
                                    <span className="hidden sm:inline">Signup</span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {searchedBlogs && (
                <div className="container mx-auto px-4 pb-2 mt-8">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        searchedBlogs.length > 0 ? (
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-semibold">Search Results:</h2>
                                    <ul>
                                        {searchedBlogs.map((blog) => (
                                            <li onClick={closeSearchResults} key={blog._id} className="my-2">
                                                <Link to={`/blog/${blog._id}`} className="text-lg font-semibold text-primary hover:text-secondary">
                                                    {blog.title}
                                                </Link>
                                                <p>{getFirst15Words(blog.text)}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <XIcon
                                    type="button"
                                    className="cursor-pointer hover:bg-red-500 ml-2 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center"
                                    onClick={closeSearchResults}
                                />

                            </div>
                        ) : (
                            <div className="flex justify-between items-center">
                                <p>No results found.</p>
                                <XIcon
                                    type="button"
                                    className="cursor-pointer hover:bg-red-500 ml-2 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center"
                                    onClick={closeSearchResults}
                                />
                            </div>
                        )
                    )}
                </div>
            )}

        </header>
    )
}

export default Navbar