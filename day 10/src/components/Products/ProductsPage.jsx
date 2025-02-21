import { useState } from "react";
import { ProductCard } from "./ProductCard";

export const ProductsPage = () => {
    const [products] = useState([
        {
            id: 1,
            title: "CHERRY ZE97B Laptop",
            price: 4555.00,
            category: "Laptops",
            image: "/lap.webp"
        },
        {
            id: 2,
            title: "Lenovo IdeaCentre All-in-One",
            price: 10666.00,
            category: "Laptops",
            image: "/lap.webp"
        },
        {
            id: 3,
            title: "MacBook Pro M1",
            price: 15999.00,
            category: "Laptops",
            image: "/lap.webp"
        },
        {
            id: 4,
            title: "Gaming Desktop PC4",
            price: 8999.00,
            category: "Desktops",
            image: "/lap.webp"
        },
        {
            id: 5,
            title: "Gaming Desktop PC5",
            price: 8999.00,
            category: "Desktops",
            image: "/lap.webp"
        },
        {
            id: 6,
            title: "Gaming Desktop PC6",
            price: 8999.00,
            category: "Desktops",
            image: "/lap.webp"
        },
        {
            id: 7,
            title: "Gaming Desktop PC7",
            price: 8999.00,
            category: "Desktops",
            image: "/lap.webp"
        },
        {
            id: 8,
            title: "Gaming Desktop PC8 ",
            price: 8999.00,
            category: "Laptops",
            image: "/lap.webp"
        }
    ]);

    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("default");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const categories = ["all", ...new Set(products.map(product => product.category))];

    const filteredAndSortedProducts = products
        .filter(product =>
            product.title.toLowerCase().includes(search.toLowerCase()) &&
            (selectedCategory === "all" || product.category === selectedCategory)
        )
        .sort((a, b) => {
            switch (sortBy) {
                case "price-asc":
                    return a.price - b.price;
                case "price-desc":
                    return b.price - a.price;
                case "name-asc":
                    return a.title.localeCompare(b.title);
                case "name-desc":
                    return b.title.localeCompare(a.title);
                default:
                    return 0;
            }
        });

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 space-y-4 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Products</h2>

                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search products by name..."
                        className="w-full p-3 border rounded-md pl-10"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <span className="absolute left-3 top-3">🔍</span>
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
                        <select
                            className="w-full p-2 border rounded-md bg-white"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="default">Default</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="name-asc">Name: A to Z</option>
                            <option value="name-desc">Name: Z to A</option>
                        </select>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            className="w-full p-2 border rounded-md bg-white"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category === "all" ? "All Categories" : category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="text-sm text-gray-600">
                    Showing {filteredAndSortedProducts.length} results
                    {selectedCategory !== "all" && ` in ${selectedCategory}`}
                    {search && ` for "${search}"`}
                </div>
            </div>

            {filteredAndSortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredAndSortedProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 text-gray-500">
                    No products found matching your criteria
                </div>
            )}
        </div>
    );
};
