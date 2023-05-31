import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Components

import ASOD from "./components/ASOD";

const App = () => {
  return (
    <div
      data-theme="business"
      className="bg-neutral text-neutral-content min-h-screen"
    >
      <div className="m-auto">
        <h1 className="text-5xl font-bold text-center">Planetarium</h1>
      </div>

      <div className="mx-auto my-auto p-4 w-full">
        <ASOD />
      </div>
    </div>
  );
};

export default App;
