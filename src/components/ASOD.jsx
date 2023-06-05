import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ASOD.css";

const ASOD = () => {
  const [asod, setAsod] = useState({});
  const [media, setMedia] = useState(null);
  // State to hold favorites image data
  const [favorites, setFavorites] = useState([]);
  // Loading state for images component. Will load once data has arrived.
  const [loading, setLoading] = useState(true);

  // Fetch ASOD media
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

  // If media type is video, set DOM element to video, if picture then set to Img. (re)executes when ASOD loads in.
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

  const getFavorites = async () => {
    try {
      const response = await axios.get(
        `https://calm-brushlands-38440.herokuapp.com/`
      );
      setFavorites(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  const images =
    favorites.length > 0
      ? favorites
          .filter((img) => img.name === "ASOD")[0]
          .postPhoto.map((img, i) => img)
      : [];

  console.log([...images, asod.hdurl]);

  const saveButton = () => {
    try {
      const response = axios.put(
        `https://calm-brushlands-38440.herokuapp.com/update`,
        { _id: import.meta.env.VITE_APP_HERO_KEY, postPhoto: [...images, asod.hdurl] }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card bg-base-100 text-neutral-content">
      <h1 className="text-center font-bold antialiased text-3xl mt-4">
        {asod.title}
      </h1>
      <figure className="px-10 pt-10">{media}</figure>
      <div className="card-body items-center text-center">
        <p>{asod.explanation}</p>
        <p className="my-4">
          NASA Astronomy Picture of the Day: Each day, a different image of our
          fascinating universe is featured, along with a brief statement written
          by a professional astronomer.
        </p>
      </div>
      <div className="self-center p-4">
        <button
          onClick={saveButton}
          className="btn btn-neuttral myButton"
          data-theme="night"
        >
          ❤️
        </button>
      </div>
    </div>
  );
};

export default ASOD;
