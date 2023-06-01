import React, { useState, useEffect } from "react";
import axios from "axios";

const Asteroid = () => {
  // Today's date for accessing daily asteroids
  const today = new Date().toISOString().slice(0, 10);
  const [neo, setNeo] = useState({});

  // Fetch near earth object data from NASA (asteroids)
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

  const asteroids =
    neo["near_earth_objects"] && neo["near_earth_objects"][today];

  // Map each asteroid data point to the table to display the name, size, hazard status, and approach time to the user.
  const asteroidTable =
    asteroids &&
    asteroids.map((asteroid, index) => {
      return (
        <tr key={index}>
          <td>{asteroid.name}</td>
          <td>
            {asteroid.estimated_diameter.miles.estimated_diameter_max.toFixed(
              3
            )}{" "}
            miles
          </td>
          <td>{asteroid.is_potentially_hazardous_asteroid ? "☢️" : "❎"}</td>
          <td>{asteroid.close_approach_data[0].close_approach_date_full}</td>
        </tr>
      );
    });

  return (
    <div className="card bg-base-100 text-neutral-content">
      <h1 className="text-center font-semibold antialiased text-3xl mt-4">
        Asteroid Watch
      </h1>
      <div className="card-body items-center text-center">
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
    </div>
  );
};

export default Asteroid;
