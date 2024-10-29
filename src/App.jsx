import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StopWatch from "./pages/StopWatch.jsx";
import Timer from "./pages/Timer.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <div className="m-0 p-0 box-border h-screen font-poppins">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StopWatch />} />
          <Route path="/Timer" element={<Timer />} />
        </Routes>
        <Navbar />
      </BrowserRouter>
    </div>
  );
}

export default App;
