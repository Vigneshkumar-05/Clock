import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import StopWatch from "./pages/StopWatch";
import Timer from "./pages/Timer";
import Navbar from "./components/NavBar/Navbar";

const App = () => {
  return (
    <div className="m-0 p-0 box-border h-screen font-poppins">
      <HashRouter>
        <Routes>
          <Route path="/" element={<StopWatch />} />
          <Route path="/Timer" element={<Timer />} />
        </Routes>
        <Navbar />
      </HashRouter>
    </div>
  );
};

export default App;
