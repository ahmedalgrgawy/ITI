import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { useBlogStore } from '../store/useBlog';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const { searchBlogs } = useBlogStore();

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();

        if (searchQuery.trim() === '') return;

        const res = await searchBlogs(searchQuery);

        if (res.status == 200) {
            setSearchQuery('');
        }

    };

    return (
        <div className="form-control w-32 sm:w-40 md:w-48">
            <div className="flex items-center justify-center">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="bg-transparent outline-none border-none text-sm w-full max-w-xs py-1"
                />
                <button
                    onClick={handleSearchSubmit}
                    className="btn btn-sm btn-primary"
                >
                    <Search size={16} />
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
