import { useState } from "react";

export const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        city: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        city: '',
        password: ''
    });

    const cities = ['Cairo', 'Alexandria', 'Giza', 'Sharm El Sheikh', 'Luxor'];

    const validateForm = () => {
        let tempErrors = {
            fullName: '',
            email: '',
            city: '',
            password: ''
        };
        let isValid = true;

        // Full Name validation
        if (!formData.fullName) {
            tempErrors.fullName = 'Full name is required';
            isValid = false;
        } else if (formData.fullName.length < 3) {
            tempErrors.fullName = 'Full name must be at least 3 characters';
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!formData.email) {
            tempErrors.email = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            tempErrors.email = 'Invalid email address';
            isValid = false;
        }

        // City validation
        if (!formData.city) {
            tempErrors.city = 'Please select a city';
            isValid = false;
        }

        // Password validation
        if (!formData.password) {
            tempErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 6) {
            tempErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleFocus = (e) => {
        e.target.style.border = 'solid 1px red';
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        e.target.style.border = '';

        // Validate field on blur
        let fieldError = '';
        switch (name) {
            case 'fullName':
                if (!value) fieldError = 'Full name is required';
                else if (value.length < 3) fieldError = 'Full name must be at least 3 characters';
                break;
            case 'email':
                if (!value) fieldError = 'Email is required';
                else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    fieldError = 'Invalid email address';
                }
                break;
            case 'password':
                if (!value) fieldError = 'Password is required';
                else if (value.length < 6) fieldError = 'Password must be at least 6 characters';
                break;
        }
        setErrors(prev => ({ ...prev, [name]: fieldError }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form Data:', formData);
            alert('Registration successful!\n' + JSON.stringify(formData, null, 2));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
                <div>
                    <label className="block mb-2">Full Name *</label>
                    <input
                        type="text"
                        name="fullName"
                        className={`w-full p-2 border rounded-md focus:outline-none ${errors.fullName ? 'border-red-500' : 'focus:border-red-500'
                            }`}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                    {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                    )}
                </div>

                <div>
                    <label className="block mb-2">Email *</label>
                    <input
                        type="email"
                        name="email"
                        className={`w-full p-2 border rounded-md focus:outline-none ${errors.email ? 'border-red-500' : 'focus:border-red-500'
                            }`}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                </div>

                <div>
                    <label className="block mb-2">City *</label>
                    <select
                        name="city"
                        className={`w-full p-2 border rounded-md focus:outline-none ${errors.city ? 'border-red-500' : 'focus:border-red-500'
                            }`}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        value={formData.city}
                        onChange={handleChange}
                    >
                        <option value="">Select a city</option>
                        {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                    {errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                </div>

                <div>
                    <label className="block mb-2">Password *</label>
                    <input
                        type="password"
                        name="password"
                        className={`w-full p-2 border rounded-md focus:outline-none ${errors.password ? 'border-red-500' : 'focus:border-red-500'
                            }`}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Register
                </button>
            </form>
        </div>
    );
};