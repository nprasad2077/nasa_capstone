import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Components

import ASOD from "./components/ASOD";

const App = () => {
  return (
    <div data-theme="business" className="bg-neutral text-neutral-content">
      <h1 className="text-5xl font-bold text-center">Planetarium</h1>
      <div className="mx-auto my-auto p-4">
        <ASOD />
      </div>
    </div>
  );
};

export default App;
