import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

// Components
import NavHeader from "./components/NavHeader";
import Globe from "./components/Globe";
import Favorites from "./components/Favorites";
import MediaPlayer from "./components/MediaPlayer";
import Home from './components/Home'
import NewGlobe from './components/NewGlobe.jsx'

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
        <Route path="/globe" element={<NewGlobe />} />
        <Route path="/media" element={<MediaPlayer />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
};

export default App;
