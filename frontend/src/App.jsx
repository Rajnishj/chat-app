
import { Route, Routes } from 'react-router-dom'
import Sidebar from './components/sidebar/Sidebar'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import ProtectedRoutes from './protectedRoutes/ProtectedRoute'
import { Toaster } from 'react-hot-toast'


function App() {
  return (
   <div className='p-4 h-screen flex items-center justify-center'>
    <Routes>
      <Route element={<ProtectedRoutes />}>
      <Route path='/' element={<Home />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
    <Toaster />
   </div>
  )
}

export default App
