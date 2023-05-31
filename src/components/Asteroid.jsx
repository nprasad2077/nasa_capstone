import React, { useState, useEffect } from "react";
import axios from "axios";

const Asteroid = () => {
  const today = new Date().toISOString().slice(0, 10);
  const [neo, setNeo] = useState({});

  const getAsteroid = async () => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${
          import.meta.env.VITE_APP_NASA_API_KEY
        }`
      );
      setNeo(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAsteroid();
  }, []);

  const asteroids = neo["near_earth_objects"][today];

  console.log(neo);
  console.log(asteroids);

  return <div>Asteroid</div>;
};

export default Asteroid;
