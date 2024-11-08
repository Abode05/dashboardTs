import { Outlet, useNavigate } from 'react-router-dom'
import SideBar from './components/SideBar'
import Navbar from './components/Navbar'
import { createContext, useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { linkSideBar } from './constant/data';



interface ContextProps {
  SearchFilter: string
  SetSearchFilter: React.Dispatch<React.SetStateAction<string>>
}

export const Context = createContext<ContextProps>({
  SearchFilter: '',
  SetSearchFilter: () => {},
})

function App() {
  const [SearchFilter, SetSearchFilter] = useState<string>('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/auth')
    }
  }, [navigate])

  return (
    <Context.Provider value={{ SearchFilter, SetSearchFilter }}>
      <div className="flex flex-row  dark:bg-dark-1">
        <SideBar links={linkSideBar} />
        <div className="flex flex-col w-full">
          <Navbar />
          <Outlet />
        </div>
      </div>
      <ToastContainer/>
    </Context.Provider>
  )
}

export default App
