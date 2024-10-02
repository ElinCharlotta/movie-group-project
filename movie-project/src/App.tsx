
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Categories from './Pages/Categories';
import Bookmarked from './Pages/Bookmarked';
import Navbar from "./Components/Navbar";
import './App.css';



export default function App() {
  return (
    <div className='App'>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/bookmarked" element={<Bookmarked />} />
        </Routes>
    </div>
  )
}
