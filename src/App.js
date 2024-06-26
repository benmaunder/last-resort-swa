import React from "react";
import "./App.css";
import Navbar from "./components/Navbar"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages";
import Socials from "./pages/Socials";
import Events from "./pages/Events";
import Drinks from "./pages/Drinks";
import Food from "./pages/Food";
import DrawTool from "./pages/DrawTool";
import Disco from "./pages/Disco";
import NoPage from "./pages/NoPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="socials" element={<Socials />} />
          <Route path="events" element={<Events />} />
          <Route path="drinks" element={<Drinks />} />
          <Route path="food" element={<Food />} />
          <Route path="draw" element={<DrawTool />} />
          <Route path="disco" element={<Disco />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;