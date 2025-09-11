import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Home from "./pages/Home"
import Country from "./pages/Country"

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country" element={<Country />} />
        </Routes>
      </main>
      
      <Footer />
    </BrowserRouter>
  )
}

export default App
