import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const Navbar = () => {
    const cartItems = useSelector(state => state.cart.items);
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <div>
            <nav className="bg-gray-800 text-white p-4 text-center">
                <div className="container mx-auto flex items-center justify-center gap-10">
                    <Link to="/products">
                        <button className="btn btn-primary">
                            Products
                        </button>
                    </Link>
                    <Link to="/register">
                        <button className="btn btn-primary">
                            Register
                        </button>
                    </Link>
                    <Link to="/cart">
                        <button className="btn btn-primary relative">
                            Cart
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </Link>
                </div>
            </nav>
            <div className="text-center text-green">
                Welcome to Day 10 , Click to Navigate
            </div>
        </div>
    );
}

export default Navbar;