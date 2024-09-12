
import './App.css'
import LandingPage from './compo/LandingPage'
import HomePage from './compo/HomePage'
import {BrowserRouter as Router , Routes,Route} from "react-router-dom"

import 'react-toastify/dist/ReactToastify.css';
import AboutPage from './compo/AboutPage'



function App() {
  const isToken = localStorage.getItem("Token")

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



