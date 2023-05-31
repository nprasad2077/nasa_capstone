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

  const asteroids = neo["near_earth_objects"] && neo["near_earth_objects"][today];

  const asteroidTable = asteroids && asteroids.map((asteroid, index) => {
    return (
      <tr key={index}>
        <td>{asteroid.name}</td>
        <td>
          {asteroid.estimated_diameter.miles.estimated_diameter_max} miles
        </td>
        <td>{asteroid.is_potentially_hazardous_asteroid ? "☢️" : "❎"}</td>
        <td>{asteroid.close_approach_data[0].close_approach_date_full}</td>
      </tr>
    );
  });

  console.log(neo);
  console.log(asteroids);

  return (
    <div className="overflow-x-auto mt-8" data-theme="business">
      <table className="table table-zebra w-full text-center items-center justify-center">
        {/* head */}
        <thead>
          <tr>
            <th>Asteroid Name</th>
            <th>Size {"(max diameter)"}</th>
            <th>Potentially Hazardous?</th>
            <th>Approach Date</th>
          </tr>
        </thead>
        <tbody>{asteroidTable}</tbody>
      </table>
    </div>
  );
};

export default Asteroid;
