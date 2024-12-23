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


function App() {

  const { user, checkAuth, isLoading } = useAuthStore()

  // useEffect(() => {
  //   checkAuth()
  // }, [user, checkAuth])

  // if (isLoading) return (
  //   <div className='flex items-center justify-center h-screen'>
  //     <Loader2 className="size-40 animate-spin" />
  //   </div>
  // )

  return (
    <div data-theme='dark'>

      {user && <Navbar />}

      <Routes>
        <Route path='/' element={user ? <HomePage /> : <Navigate to={'/login'} />} />
        <Route path='/signup' element={!user ? <SignupPage /> : <Navigate to={"/"} />} />
        <Route path='/login' element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/user-blogs" element={user ? <UserBlogs /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
