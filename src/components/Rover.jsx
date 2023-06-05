import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../styles/Rover.css";

// Information Accordian
import Accord from "./Accord";

const Rover = () => {
  // State for fetching rover data
  const [rover, setRover] = useState({});
  // Rover date in mars years (sol).
  const sol = 3473;
  // State for holding rover images in carousel.
  const [images, setImages] = useState([]);
  // Conditional rendering to show carousel based on button click.
  const [imageDisplay, setImageDisplay] = useState(false);
  const iframeContainerRef = useRef(null);

  // Fetch Curiosity rover data
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

  // Filter by rover camera type, then map to a data structure acceptable for react-image-gallery.
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

  // Camera button click function. When camera button is pressed, then display react-image-carousel containing the selected pictures.
  const roverClick = (e) => {
    if (e.target.name === "FHAZ") {
      setImages(fhazCAM);
      setImageDisplay(true);
    }
    if (e.target.name === "MAST") {
      setImages(mastCAM);
      setImageDisplay(true);
    }
    if (e.target.name === "CHEMCAM") {
      setImages(chemCAM);
      setImageDisplay(true);
    }
    if (e.target.name === "NAVCAM") {
      setImages(navCAM);
      setImageDisplay(true);
    }
  };

  // Hide carousel button.
  const hideButton = () => {
    setImageDisplay(false);
  };

  return (
    <div className="card bg-base-100 text-neutral-content flex flex-col items-center">
      <h2 className="text-center font-bold antialiased text-3xl mt-4 text-orange-500">
        Mars Rover
      </h2>
      <div className="h-auto w-full max-w-[720px]  p-10">
        {/* 3D Mars Rover model */}
       
          <iframe
            title="Perseverance Rover 3D model"
            className="w-full h-[420px]"
            src="https://mars.nasa.gov/layout/embed/model/?s=6"
            allowFullScreen
          ></iframe>
        

        <div className="flex flex-row flex-wrap text-center items-center justify-center gap-2 p-4 mb-6">
          <button
            onClick={roverClick}
            name="FHAZ"
            className="btn btn-outline btn-info object-contain"
          >
            FHAZ CAM
          </button>
          <button
            onClick={roverClick}
            name="NAVCAM"
            className="btn btn-outline btn-success object-contain"
          >
            NAVCAM
          </button>
          <button
            onClick={roverClick}
            name="CHEMCAM"
            className="btn btn-outline btn-warning object-contain"
          >
            CHEMCAM
          </button>
          <button
            onClick={roverClick}
            name="MAST"
            className="btn btn-outline btn-error object-contain"
          >
            MAST CAM
          </button>
        </div>
        {imageDisplay && (
          <div className="visible">
            <div className="carousel-container flex flex-col">
              <ImageGallery
                items={images}
                autoPlay={false}
                showPlayButton={false}
                showFullscreenButton={false}
              />
              <button
                onClick={hideButton}
                className="btn btn-outline btn-secondary btn-xs sm:btn-sm md:btn-md lg:btn-md w-1/2 self-center my-6"
                data-theme="night"
              >
                HIDE
              </button>
            </div>
          </div>
        )}
        {/* <div className="m-auto px-4">
          <Accord />
        </div> */}
      </div>
    </div>
  );
};

export default Rover;
