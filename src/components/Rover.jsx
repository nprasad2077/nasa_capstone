import React, { useState, useEffect } from "react";
import axios from "axios";

const Rover = () => {
  const [rover, setRover] = useState({});
  const sol = 3403;

  const getRover = async () => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${
          import.meta.env.VITE_APP_NASA_API_KEY
        }`
      );
      setRover(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRover();
  }, []);

  const mastCAM =
    rover.photos && rover.photos.filter((rov) => rov.camera.name === "MAST");

  const chemCAM =
    rover.photos && rover.photos.filter((rov) => rov.camera.name === "CHEMCAM");

  const mardiCAM =
    rover.photos && rover.photos.filter((rov) => rov.camera.name === "MARDI");

  const navCAM =
    rover.photos && rover.photos.filter((rov) => rov.camera.name === "NAVCAM");

  const fhazCAM =
    rover.photos && rover.photos.filter((rov) => rov.camera.name === "FHAZ");

  const rhazCAM =
    rover.photos && rover.photos.filter((rov) => rov.camera.name === "RHAZ");

  const mahliCAM =
    rover.photos && rover.photos.filter((rov) => rov.camera.name === "MAHLI");

  console.log(chemCAM, navCAM);

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
