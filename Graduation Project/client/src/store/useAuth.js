import { create } from "zustand"
import axiosInstance from '../lib/axiosInstance'
import toast from 'react-hot-toast';


export const useAuthStore = create((set, get) => ({
    user: null,
    isLoading: false,
    isCheckingAuth: false,

    checkAuth: async () => {
        set({ isLoading: true })

        try {

            const response = await axiosInstance.get("/user/check-auth")

            set({ user: response.data.user, isLoading: false })

        } catch (error) {
            set({ isLoading: false })
            console.log(error);
        }
    },

    signup: async (data) => {

        set({ isLoading: true })

        try {
            const response = await axiosInstance.post("/user/signup", data)

            set({ isLoading: false, user: response.data.newUser })

            toast.success("Account created successfully", { duration: 5000 })

        } catch (error) {
            console.log(error);
            set({ isLoading: false })
            toast.error(error.response.data.message)
        }

    },

    login: async (email, password) => {

        set({ isLoading: true })

        try {

            const response = await axiosInstance.post("/user/login", { email, password })

            set({ user: response.data.user, isLoading: false })

            toast.success("user logged in successfully",{ duration: 5000 })

        } catch (error) {
            set({ isLoading: false })
            toast.error(error.response.data.message)
            console.log(error);
        }
    },

    logout: async () => {
        set({ isLoading: true })

        try {

            await axiosInstance.post("/user/logout")

            set({ user: null, isLoading: false })

            toast.success("Logged out successfully");

        } catch (error) {
            set({ isLoading: false })
            console.log(error);
        }
    }

}))
