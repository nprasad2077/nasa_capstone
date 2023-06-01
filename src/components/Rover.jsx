import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const Rover = () => {
  const [rover, setRover] = useState({});
  const sol = 3403;
  const [images, setImages] = useState([]);
  const [imageDisplay, setImageDisplay] = useState(false);

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

  const fhazCAM =
    rover.photos &&
    rover.photos
      .filter((rov) => rov.camera.name === "FHAZ")
      .map((fhaz) => ({ original: fhaz.img_src, thumbnail: fhaz.img_src }));

  const roverClick = (e) => {
    console.log(e.target.name);
    if (e.target.name === "FHAZ") {
      setImages(fhazCAM);
      if (imageDisplay === true) {
        setImageDisplay(false);
      } else {
        setImageDisplay(true);
      }
    }
  };

  console.log(imageDisplay);

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
        <div className="flex flex-row text-center items-center justify-center gap-2 p-4">
          <button
            onClick={roverClick}
            name="FHAZ"
            className="btn btn-outline btn-info"
          >
            FHAZ CAM
          </button>
          <button
            onClick={roverClick}
            name="NAVCAM"
            className="btn btn-outline btn-success"
          >
            NAVCAM
          </button>
          <button
            onClick={roverClick}
            name="CHEMCAM"
            className="btn btn-outline btn-warning"
          >
            CHEMCAM
          </button>
          <button
            onClick={roverClick}
            name="MAST"
            className="btn btn-outline btn-error"
          >
            MAST CAM
          </button>
        </div>
        {imageDisplay && (
          <div className="visible">
            <ImageGallery items={images} autoPlay={false} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Rover;
