import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../styles/Earth.css";

const Earth = () => {
  const [enhancedDate, setEnhancedDate] = useState([])
  const [earth, setEarth] = useState([]);
  const [images, setImages] = useState([]);
  const [enhanced, setEnhanced] = useState([])

  const getEarthEnhanched = async () => {
    try {
      const response = await axios.get('https://epic.gsfc.nasa.gov/api/enhanced/all')
      const responseData = await axios.get(`https://epic.gsfc.nasa.gov/api/enhanced/date/${response.data[0].date}`)
      setEnhancedDate(response.data[0].date)
      setEnhanced(responseData.data)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getEarthEnhanched()
  }, []);

  // Map out images in a data structure suitable for react-image-gallery.
  useEffect(() => {
    const imagesData = enhanced.map((img) => {
      // Get the date in a format suitable for the API call
      const enhancedDateFormatted = img.date.substring(0, 10).replace(/-/g, "/");

      return {
        original: `https://epic.gsfc.nasa.gov/archive/enhanced/${enhancedDateFormatted}/png/${img.image}.png`,
        thumbnail: `https://epic.gsfc.nasa.gov/archive/enhanced/${enhancedDateFormatted}/png/${img.image}.png`
      };
    });

    setImages(imagesData);
  }, [enhanced]);

  return (
    <div className="card bg-base-100 text-neutral-content flex flex-col items-center">
      <h2 className="text-center font-bold antialiased text-3xl mt-4">
        Earth Polychromatic Imaging Camera {"(EPIC)"}
      </h2>

      <div className="carousel-container p-6">
        {images ? (
          <ImageGallery
            items={images}
            autoPlay={false}
            showPlayButton={false}
            showFullscreenButton={true}
          />
        ) : (
          <progress data-theme="night" className="progress w-72"></progress>
        )}
      </div>

      <div className="card-body items-center text-center text-sm mb-6">
        <p>
          These images were taken by NASA's EPIC camera onboard the NOAA DSCOVR
          spacecraft
        </p>
        <p>The most recent images are from: {enhancedDate}</p>
      </div>
    </div>
  );
};

export default Earth;
