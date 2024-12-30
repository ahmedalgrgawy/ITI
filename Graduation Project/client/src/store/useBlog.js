import { create } from "zustand"
import axiosInstance from "../lib/axiosInstance"
import toast from "react-hot-toast"

export const useBlogStore = create((set, get) => ({
    userBlogs: null,
    allBlogs: null,
    searchedBlogs: null,
    isLoading: false,

    getUserBlogs: async () => {
        set({ isLoading: true })

        try {
            const res = await axiosInstance.get("/user/blogs")

            set({ userBlogs: res.data.blogs, isLoading: false })

        } catch (error) {
            set({ isLoading: false })
            console.log(error);
        }
    },

    getAllBlogs: async () => {
        set({ isLoading: true })

        try {
            const res = await axiosInstance.get("/blog")

            set({ allBlogs: res.data.blogs, isLoading: false })

        } catch (error) {
            set({ isLoading: false })
            console.log(error);
        }
    },

    addBlog: async (data) => {
        set({ isLoading: true })

        try {
            await axiosInstance.post("/blog/post", {
                title: data.title,
                text: data.text,
                image: data.image,
                tags: data.tags
            })

            set({ isLoading: false })

            toast.success("Blog added successfully");

            return { status: 201 }

        } catch (error) {
            set({ isLoading: false })
            console.log(error);
        }
    },

    editBlog: async (id, data) => {
        set({ isLoading: true })

        try {
            await axiosInstance.put(`/blog/${id}`, {
                title: data.title,
                text: data.text,
                image: data.image,
                tags: data.tags
            })

            set({ isLoading: false })

            return { status: 200 }

        } catch (error) {
            set({ isLoading: false })
            console.log(error);
        }
    },

    deleteBlog: async (id) => {
        set({ isLoading: true })

        try {
            await axiosInstance.delete(`/blog/${id}`)
            set({ isLoading: false })

            toast.success("Blog deleted successfully");

            return { status: 200 }

        } catch (error) {
            set({ isLoading: false })
            console.log(error);
        }
    },

    searchBlogs: async (query) => {
        set({ isLoading: true })

        try {

            if (query.trim() === '') {
                set({ isLoading: false })
                toast.error("Please enter a search query", {
                    position: 'top-left'
                })
                return
            }

            if (query.length < 2) {
                set({ isLoading: false })
                toast.error("Search query must be at least 2 characters long", {
                    position: 'top-right'
                })
                return
            }

            const res = await axiosInstance.get(`/blog/search/${query}`)

            set({ searchedBlogs: res.data, isLoading: false })

            return { status: 200 }

        } catch (error) {
            set({ isLoading: false })
            console.log(error);
        }
    },
    setSearchedBlogs: (blogs) => set({ searchedBlogs: blogs }),
}))