import { Link } from "react-router-dom";
import { Book, BookAIcon, LogOut, PenBoxIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuth";


const Navbar = () => {

    const { logout, user } = useAuthStore();

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
                        {user && (
                            <>

                                <button className="flex gap-2 items-center" >
                                    <PenBoxIcon className="size-5" />
                                    <span className="hidden sm:inline">Add Blog</span>
                                </button>

                                <Link to={"/user-blogs"} className={`btn btn-sm gap-2`}>
                                    <Book className="size-5" />
                                    <span className="hidden sm:inline">My Blogs</span>
                                </Link>

                                <button className="flex gap-2 items-center" onClick={logout}>
                                    <LogOut className="size-5" />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar