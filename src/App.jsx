import { useState , useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ContextMaker } from './context/Context'
import LandingPage from './compo/LandingPage'
import HomePage from './compo/HomePage'
import {BrowserRouter as Router , Routes,Route} from "react-router-dom"

import 'react-toastify/dist/ReactToastify.css';
import AboutPage from './compo/AboutPage'



function App() {
  const isToken = localStorage.getItem("Token")
  // console.log(isToken)
  return (
    <Router>
    <>
    <Routes>
      <Route path="/" element={ !isToken ? <LandingPage/> : <HomePage/> }/>
      <Route path="/about" element={ <AboutPage/> }/>
    </Routes>
    </>
    </Router>
  )
}

export default App

{/* <LandingPage/> */}


