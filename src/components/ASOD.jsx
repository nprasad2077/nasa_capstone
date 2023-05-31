import React, { useState, useEffect } from "react";
import axios from "axios";

const ASOD = () => {
  const [asod, setAsod] = useState({});
  const [media, setMedia] = useState(null);

  const getAsod = async () => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${
          import.meta.env.VITE_APP_NASA_API_KEY
        }`
      );
      setAsod(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAsod();
  }, []);

  useEffect(() => {
    if (asod.media_type === "video") {
      setMedia(
        <iframe
          width="720"
          height="480"
          src={asod.url}
          allowFullScreen
          title="ASOD Video"
        ></iframe>
      );
    } else {
      setMedia(
        <img
          src={asod.hdurl}
          alt="ASOD"
          className="rounded-xl"
          title="ASOD Image"
        />
      );
    }
  }, [asod]);

  return (
    <div className="card w-auto bg-base-100 text-neutral-content">
      <h1 className="text-center font-semibold antialiased text-3xl mt-4">
        {asod.title}
      </h1>
      <figure className="px-10 pt-10">{media}</figure>
      <div className="card-body items-center text-center w-auto">
        <p>{asod.explanation}</p>
      </div>
    </div>
  );
};

export default ASOD;
