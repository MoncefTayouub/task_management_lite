import logo from './logo.svg';
import './App.css';
import React , {useState , useEffect} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Project from './pages/Project';
function App() {
  return (
    <div className="App">
           <BrowserRouter>
              <Routes>
                    <Route path="/" element={<Home    />} />    
                    <Route path="/Project/:id" element={<Project    />} />    
                </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;