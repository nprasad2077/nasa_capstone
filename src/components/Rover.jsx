import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../styles/Rover.css";

const Rover = () => {
  // State for fetching rover data
  const [rover, setRover] = useState({});
  // Rover date in mars years (sol).
  const sol = 3473;
  // State for holding rover images in carousel.
  const [images, setImages] = useState([]);
  // Conditional rendering to show carousel based on button click.
  const [imageDisplay, setImageDisplay] = useState(false);

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
      setImageDisplay(true)
    }
    if (e.target.name === "MAST") {
      setImages(mastCAM);
      setImageDisplay(true)
    }
    if (e.target.name === "CHEMCAM") {
      setImages(chemCAM);
      setImageDisplay(true)
    }
    if (e.target.name === "NAVCAM") {
      setImages(navCAM);
      setImageDisplay(true)
    }
  };

  // Hide carousel button.
  const hideButton = () => {
    setImageDisplay(false);
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
              <button
                onClick={hideButton}
                className="btn btn-outline btn-secondary btn-xs sm:btn-sm md:btn-md lg:btn-md my-4 w-1/2 self-center"
                data-theme="night"
              >
                HIDE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rover;
