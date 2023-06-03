import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

// Components
import ASOD from "./components/ASOD";
import Asteroid from "./components/Asteroid";
import Rover from "./components/Rover";
import Earth from "./components/Earth";
import NavHeader from "./components/NavHeader";
import Globe from "./components/Globe";
import Favorites from "./components/Favorites";
import MediaPlayer from "./components/MediaPlayer";
import Home from './components/Home'

const App = () => {
  return (
    <div
      data-theme="night"
      className="bg-neutral text-neutral-content min-h-screen"
    >
      <NavHeader />

      {/* Routes*/}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/globe" element={<Globe />} />
        <Route path="/media" element={<MediaPlayer />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
};

export default App;
