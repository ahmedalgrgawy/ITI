import { Navigate, Route, Routes } from 'react-router-dom'
import './index.css'
import LoginPage from './pages/LoginPage'
import { useAuthStore } from './store/useAuth'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import Navbar from './components/Navbar'
import { Toaster } from "react-hot-toast";
import UserBlogs from './pages/UserBlogs'
import { useBlogStore } from './store/useBlog'
import { AddBlog } from './pages/AddBlog'
import { SingleBlog } from './pages/SingleBlog'
import EditBlog from './pages/EditBlog'


function App() {

  const { user, checkAuth, isCheckingAuth } = useAuthStore()
  const { getAllBlogs, getUserBlogs, editBlog, deleteBlog } = useBlogStore()

  useEffect(() => {
    checkAuth()
    getAllBlogs()
    getUserBlogs()
  }, [checkAuth, getAllBlogs, getUserBlogs, editBlog, deleteBlog])

  if (isCheckingAuth) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader2 className="size-40 animate-spin" />
    </div>
  )

  return (
    <div data-theme='dark'>

      <Navbar />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={!user ? <SignupPage /> : <Navigate to={"/"} />} />
        <Route path='/login' element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path='/add-blog' element={user ? <AddBlog /> : <Navigate to="/login" />} />
        <Route path="/user-blogs" element={user ? <UserBlogs /> : <Navigate to="/login" />} />
        <Route path="/blog/:blogId" element={user ? <SingleBlog /> : <Navigate to="/signup" />} />
        <Route path="/edit-blog/:blogId" element={user ? <EditBlog /> : <Navigate to="/signup" />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
