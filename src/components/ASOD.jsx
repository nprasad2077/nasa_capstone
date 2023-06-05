import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ASOD.css";

const ASOD = () => {
  // State to hold astronomy picture of the day data.
  const [asod, setAsod] = useState({});
  //State to hold the html data used to render the ASOD image or video onto the card component. Contains logic to discern if media type is video or image.
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
    if (!asod.media_type) {
      setMedia(
        <img
          src="https://cdn.mos.cms.futurecdn.net/PezBzd9Fehsq9XWgWMauVV-970-80.jpg.webp"
          alt="ASOD"
          className="rounded-xl"
          title="ASOD Image"
        />
      );
    } else if (asod.media_type === "video") {
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

  // Get list of favorite images for save button functionality.
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

  // Filter the fetch data for the raw image links into an array.
  const images =
    favorites.length > 0
      ? favorites
          .filter((img) => img.name === "ASOD")[0]
          .postPhoto.map((img, i) => img)
      : [];

  console.log([...images, asod.hdurl]);

  // Save image to favorites button. This put request updates the favorite images gallery. It makes a put request by using the entire favorites list + adding today's ASOD to the list.
  const saveButton = () => {
    try {
      const response = axios.put(
        `https://calm-brushlands-38440.herokuapp.com/update`,
        {
          _id: import.meta.env.VITE_APP_HERO_KEY,
          postPhoto: [...images, asod.hdurl],
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(asod.url);

  return (
    <div className="card bg-base-100 text-neutral-content">
      <h1 className="font-bold antialiased text-3xl mt-4 text-center">
        {asod.title ? asod.title : 'Neptune'}
      </h1>
      <figure className="px-10 pt-10">{media}</figure>
      <div className="card-body items-center text-center">
        <p>
          {asod.explanation ? (
            asod.explanation
          ) : (
            <div className="flex flex-col items-center justify-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-16 h-16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
              <p>
                The ASOD server is temporarily down due to maintenance. Please
                enjoy this image of Neptune until the NASA servers come back online.
              </p>
            </div>
          )}
        </p>
        <p className="mt-6 text-xs">
          NASA Astronomy Picture of the Day: Each day, a different image of our
          fascinating universe is featured, along with a brief statement written
          by a professional astronomer. Click the save button below to post this photo the favorites wall.
        </p>
      </div>
      <div className="self-center pb-4 object-contain">
        <button
          onClick={saveButton}
          className="btn btn-neuttral myButton"
          data-theme="night"
          disabled={!asod.hdurl ? true : false}
        >
          ❤️
        </button>
      </div>
    </div>
  );
};

export default ASOD;
