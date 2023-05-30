import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Components

import ASOD from "./components/ASOD";

const App = () => {
  return (
    <div data-theme='business' className="bg-neutral text-neutral-content">
      <h1 className="text-3xl font-bold text-center underline">Planetarium</h1>

      <ASOD />
    </div>
  );
};

export default App;
