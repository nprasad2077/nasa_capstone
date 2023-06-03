import React from "react";

// Components
import ASOD from "./ASOD";
import Rover from "./Rover";
import Earth from "./Earth";
import Asteroid from "./Asteroid";

const Home = () => {
  return (
    <div>
      {/* First Row */}
      <div className="mx-auto w-full flex flex-row ">
        <div className="basis-1/2 p-6 ml-4">
          <ASOD />
        </div>
        <div className="basis-1/2 p-6 mr-4">
          <Rover />
        </div>
      </div>

      {/* Second Row */}
      <div className="mx-auto w-full flex flex-row ">
        <div className="basis-1/2 p-6 ml-4">
          <Earth />
        </div>
        <div className="basis-1/2 p-6 ml-4">
          <Asteroid />
        </div>
      </div>
    </div>
  );
};

export default Home;
