import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Pages/Auth/Login'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard'
import Sidebar from './Pages/Sidebar'
import Category from './Pages/CategoryManage/Category'
function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/dashboard' element={<Sidebar/>}/>
        <Route path='/category' element={<Category/>}/>
      </Routes>
    </Router>
  
    </>
  )
}

export default App
