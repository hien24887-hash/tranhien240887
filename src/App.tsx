import { HashRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Home from "./pages/Home";
import Rules from "./pages/Rules";
import Transcribe from "./pages/Transcribe";
import Read from "./pages/Read";
import DailyReading from "./pages/DailyReading";
import Listening from "./pages/Listening";
import Wardrobe from "./pages/Wardrobe";

export default function App() {
  return (
    <HashRouter>
      <div className="app-shell">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/transcribe" element={<Transcribe />} />
          <Route path="/read" element={<Read />} />
          <Route path="/danhvantienganh" element={<DailyReading />} />
          <Route path="/nghehieu" element={<Listening />} />
          <Route path="/wardrobe" element={<Wardrobe />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
