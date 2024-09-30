// Root of project

import React from 'react'
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";

export default function App() {
  return (
    <div className='App'>
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    </div>
  )
}
