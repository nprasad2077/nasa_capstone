import React, { useState, useEffect } from "react";
import axios from "axios";

const ASOD = () => {
  const [asod, setAsod] = useState([]);

  const getAsod = async () => {
    const response = await axios
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=${
          import.meta.env.VITE_APP_NASA_API_KEY
        }`
      )
      .then((res) => {
        setAsod(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAsod();
  }, []);

  console.log(asod);

  return (
    <div className="card w-96 bg-base-100 text-neutral-content ">
      <figure className="px-10 pt-10">
        <img
          src={asod.hdurl}
          alt="ASOD"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{asod.title}</h2>
        <p>{asod.explanation}</p>
      </div>
    </div>
  );
};

export default ASOD;
