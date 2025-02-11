export const ProductCard = ({ product }) => {
    return (
        <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-4 rounded-md" />
            <h3 className="text-lg font-semibold mb-2 truncate">{product.title}</h3>
            <div className="flex items-center mb-2">
                {[...Array(5)].map((_, index) => (
                    <span key={index} className="text-yellow-400">★</span>
                ))}
            </div>
            <p className="text-gray-600 mb-4 text-lg font-bold">{product.price.toFixed(2)} EGP</p>
            <p className="text-sm text-gray-500 mb-4">Category: {product.category}</p>
            <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors">
                ADD TO CART
            </button>
        </div>
    );
}