import { create } from "zustand"
import axiosInstance from "../lib/axiosInstance"
import e from "express"

export const useBlogStore = ((set, get) => ({
    userBlogs: null,
    allBlogs: null,
    isLoading: false,

    getUserBlogs: async () => {

        set({ isLoading: true })

        try {
            const response = await axiosInstance.get("/auth/blogs")

            set({ isLoading: false, userBlogs: response.data.blogs })

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

    addBlog: async (title, text, img, tags) => {
        set({ isLoading: true })

        try {
            await axiosInstance.post("/blog/post", {
                title, text, img, tags
            })

            set({ isLoading: false })
        } catch (error) {
            console.log(error);
        }
    },

    editBlog: async (id, title, text, img, tags) => {
        set({ isLoading: true })

        try {
            await axiosInstance.put(`/blog/${id}`, {
                title, text, img, tags
            })

            set({ isLoading: false })

        } catch (error) {
            console.log(error);
        }
    },

    deleteBlog: async (id) => {
        set({ isLoading: true })

        try {
            await axiosInstance.delete(`/blog/${id}`)
            set({ isLoading: false })

        } catch (error) {
            console.log(error);
        }
    },
}))