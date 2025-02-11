import { Link } from "react-router-dom"

const Navbar = () => {
    return (

        <div>
            <nav className="bg-gray-800 text-white p-4 text-center">
                <div className="container mx-auto flex items-center justify-center gap-10">
                    <Link to={"/products"}>
                        <button
                            className="btn btn-primary"    >
                            Products
                        </button>
                    </Link>
                    <Link to={"/register"}>
                        <button
                            className="btn btn-primary">
                            Register
                        </button>
                    </Link>
                </div>
            </nav>

            <div className="text-center text-green">
                Welcome to Day 9 , Click to Navigate
            </div>
        </div>
    )
}

export default Navbar