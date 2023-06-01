import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const Rover = () => {
  const [rover, setRover] = useState({});
  const sol = 3473;
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

  const mastCAM =
    rover.photos &&
    rover.photos
      .filter((rov) => rov.camera.name === "MAST")
      .map((rov) => ({ original: rov.img_src, thumbnail: rov.img_src }));

  const chemCAM =
    rover.photos &&
    rover.photos
      .filter((rov) => rov.camera.name === "CHEMCAM")
      .map((rov) => ({ original: rov.img_src, thumbnail: rov.img_src }));

  const navCAM =
    rover.photos &&
    rover.photos
      .filter((rov) => rov.camera.name === "NAVCAM")
      .map((rov) => ({ original: rov.img_src, thumbnail: rov.img_src }));

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
    if (e.target.name === "MAST") {
      setImages(mastCAM);
      if (imageDisplay === true) {
        setImageDisplay(false);
      } else {
        setImageDisplay(true);
      }
    }
    if (e.target.name === "CHEMCAM") {
      setImages(chemCAM);
      if (imageDisplay === true) {
        setImageDisplay(false);
      } else {
        setImageDisplay(true);
      }
    }
    if (e.target.name === "NAVCAM") {
      setImages(navCAM);
      if (imageDisplay === true) {
        setImageDisplay(false);
      } else {
        setImageDisplay(true);
      }
    }
  };
  
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
            <div className="carousel-container">
              <ImageGallery
                items={images}
                autoPlay={false}
                showPlayButton={false}
                showFullscreenButton={false}
              />
            </div>
          </div>
        )}
      </div>
      <style>
        {`
          .carousel-container {
            width: 100%;
            max-width: 720px; /* Adjust the max-width as needed */
            margin: 0 auto;
          }

          .carousel-container .image-gallery-slide img {
            object-fit: contain;
            max-width: 100%;
            max-height: 450px; /* Adjust the max-height as needed */
            margin: 0 auto;
          }
        `}
      </style>
    </div>
  );
};

export default Rover;
