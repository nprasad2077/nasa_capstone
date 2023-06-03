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

export default Home;
