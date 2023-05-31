import React from "react";

const Rover = () => {
  return (
    <div className="card bg-base-100 text-neutral-content flex flex-col items-center">
      <h2 className="text-center font-semibold antialiased text-3xl mt-4 text-orange-500">
        Mars Rover
      </h2>
      <div className="mt-4">
        {/* 3D Mars Rover model */}
        <iframe
          title="Perseverance Rover 3D model"
          className="object-scale-down p-4"
          src="https://mars.nasa.gov/layout/embed/model/?s=6"
          width="720"
          height="450"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Rover;
