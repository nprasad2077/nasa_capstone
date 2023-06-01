import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const Earth = () => {
    // Get yesterday's date in a format suitable for the API call.
  let epicDate = ((d) => new Date(d.setDate(d.getDate() - 2)))(new Date())
    .toISOString()
    .slice(0, 10);
  const regex = /-/gi;
  let date = epicDate.replace(regex, "/");
  const [earth, setEarth] = useState([]);
  const [images, setImages] = useState([]);

// Fetch earth images by date.
  const getEarth = async () => {
    try {
      const response = await axios.get(
        `https://epic.gsfc.nasa.gov/api/natural/date/${epicDate}`
      );
      setEarth(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEarth();
  }, []);

  // Map out images in a data structure suitable for react-image-gallery.
  useEffect(() => {
    const imagesData = earth.map((img) => ({
      original: `https://epic.gsfc.nasa.gov/archive/natural/${date}/png/${img.image}.png`,
      thumbnail: `https://epic.gsfc.nasa.gov/archive/natural/${date}/png/${img.image}.png`,
    }));
    setImages(imagesData);
  }, [earth, date]);

  return (
    <div className="card bg-base-100 text-neutral-content flex flex-col items-center">
      <div className="items-center justify-center">
        <div className="card bg-base-100 text-neutral-content flex flex-col items-center">
          <h2 className="text-center font-semibold antialiased text-3xl mt-4">
            Earth Polychromatic Imaging Camera {"(EPIC)"}
          </h2>
          <div className="px-10 pt-10">
          <div className="carousel-container">
              <ImageGallery
                items={images}
                autoPlay={false}
                showPlayButton={false}
                showFullscreenButton={true}
              />
            </div>
          </div>
          <div className="card-body items-center text-center">
            <p>
              These images were taken by NASA's EPIC camera onboard the NOAA DSCOVR
              spacecraft
            </p>
            <p>The most recent images are from: {date}</p>
          </div>
        </div>
      </div>
      <style>
        {`
          .image-gallery-earth {
            max-width: 100%;
            height: auto;
          }

          .image-gallery-slide img {
            object-fit: contain;
            max-width: 100%;
            max-height: 400px; /* Adjust the max-height as needed */
            margin: 0 auto;
          }
        `}
      </style>
    </div>
  );
};

export default Earth;
