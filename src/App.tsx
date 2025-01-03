import { HashRouter, Routes, Route } from "react-router-dom";
import StopWatch from "./components/Stopwatch/StopWatch";
import Timer from "./components/Timer/Timer";
import Navbar from "./components/NavBar/Navbar";

const App: React.FC = () => {
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
