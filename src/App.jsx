import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Components
import ASOD from "./components/ASOD";
import Asteroid from "./components/Asteroid";

const App = () => {
  return (
    <div
      data-theme="night"
      className="bg-neutral text-neutral-content min-h-screen"
    >
      <div >
        <h1 className="text-5xl font-bold text-center p-4">Planetarium</h1>
      </div>

      <div className="mx-auto my-auto p-4 w-full flex flex-row gap-4 mt-4">
        <div className="basis-1/3 md:basis-1/2">
          <ASOD />
        </div>
        <div className="basis-1/3 md:basis-1/2">
          <Asteroid />
        </div>
      </div>
    </div>
  );
};

export default App;
