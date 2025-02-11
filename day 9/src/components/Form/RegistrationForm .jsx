import { useState } from "react";

export const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        city: '',
        password: ''
    });

    const cities = ['Cairo', 'Alexandria', 'Giza', 'Sharm El Sheikh', 'Luxor'];

    const handleFocus = (e) => {
        e.target.style.border = 'solid 1px red';
    };

    const handleBlur = (e) => {
        e.target.style.border = '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Display form data
        console.log('Form Data:', formData);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
                <div>
                    <label className="block mb-2">Full Name *</label>
                    <input
                        type="text"
                        required
                        className="w-full p-2 border rounded-md focus:outline-none focus:border-red-500"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block mb-2">Email *</label>
                    <input
                        type="email"
                        required
                        className="w-full p-2 border rounded-md focus:outline-none focus:border-red-500"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block mb-2">City</label>
                    <select
                        className="w-full p-2 border rounded-md focus:outline-none focus:border-red-500"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    >
                        <option value="">Select a city</option>
                        {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block mb-2">Password *</label>
                    <input
                        type="password"
                        required
                        className="w-full p-2 border rounded-md focus:outline-none focus:border-red-500"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md focus:border-red-500 hover:bg-blue-600"
                >
                    Register
                </button>
            </form>
        </div>
    );
};