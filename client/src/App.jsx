import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder.jsx'
import Preview from './pages/Preview'
import Login from './pages/Login'
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='app'  element={<Layout/>} >    
          <Route index element={<Dashboard/>} />
          <Route path='builder/:resumeId' element={<ResumeBuilder/>} />
        </Route>
        <Route path='view/:resumeId' element={<Preview/>}/>
        <Route path='login' element={<Login/>}/>
        
      </Routes>
    </>
  )
}

export default App