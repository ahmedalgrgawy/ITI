import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/cartSlice';

const CartPage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleQuantityChange = (id, quantity) => {
        if (quantity < 1) {
            dispatch(removeFromCart(id));
        } else {
            dispatch(updateQuantity({ id, quantity }));
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    {cartItems.map(item => (
                        <div key={item.id} className="flex items-center border-b py-4">
                            <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded" />
                            <div className="ml-4 flex-grow">
                                <h3 className="font-semibold">{item.title}</h3>
                                <p className="text-gray-600">{item.price.toFixed(2)} EGP</p>
                                <div className="flex items-center mt-2">
                                    <button
                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                        className="px-2 py-1 bg-gray-200 rounded"
                                    >
                                        -
                                    </button>
                                    <span className="mx-4">{item.quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                        className="px-2 py-1 bg-gray-200 rounded"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => dispatch(removeFromCart(item.id))}
                                        className="ml-4 text-red-500"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold">{(item.price * item.quantity).toFixed(2)} EGP</p>
                            </div>
                        </div>
                    ))}
                    <div className="mt-4 text-right">
                        <p className="text-xl font-bold">Total: {total.toFixed(2)} EGP</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;