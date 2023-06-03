import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

// Components
import ASOD from "./components/ASOD";
import Asteroid from "./components/Asteroid";
import Rover from "./components/Rover";
import Earth from "./components/Earth";
import NavHeader from "./components/NavHeader";

const App = () => {
  return (
    <div
      data-theme="night"
      className="bg-neutral text-neutral-content min-h-screen"
    >
      <NavHeader />

      {/* First Row */}
      <div className="mx-auto my-auto p-4 w-full flex flex-row gap-4 mt-4">
        <div className="basis-1/2">
          <ASOD />
        </div>
        <div className="basis-1/2">
          <Rover />
        </div>
      </div>

      {/* Second Row */}
      <div className="mx-auto my-auto p-4 w-full flex flex-row gap-4">
        <div className="basis-1/2">
          <Earth />
        </div>
        <div className="basis-1/2">
          <Asteroid />
        </div>
      </div>
    </div>
  );
};

export default App;
