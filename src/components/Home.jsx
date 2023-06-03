import React from "react";

import '../styles/Container.css'

// Components
import ASOD from "./ASOD";
import Rover from "./Rover";
import Earth from "./Earth";
import Asteroid from "./Asteroid";

const Home = () => {
  return (
    <div>
      {/* First Row */}
      <div className="flex flex-col md:flex-row justify-around items-start mx-4 pt-2">
        <div className="w-full md:w-1/2 p-4">
          <ASOD />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <Rover />
        </div>
      </div>

      {/* Second Row */}
      <div className="flex flex-col md:flex-row justify-around items-star mx-4 pb-2">
        <div className="w-full md:w-1/2 p-4">
          <Earth />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <Asteroid />
        </div>
      </div>
    </div>
  );
};

export default Home;
