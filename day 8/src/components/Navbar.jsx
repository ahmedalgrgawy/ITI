import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div className="w-full flex items-center justify-center">
            <div className="flex items-center justify-center border-4 p-8 gap-10">
                <Link to="/to-do">
                    <button className="btn btn-primary">To Do</button>
                </Link>
                <Link to="/form">
                    <button className="btn btn-primary">Form</button>
                </Link>
            </div>

        </div>
    )
}

export default Navbar