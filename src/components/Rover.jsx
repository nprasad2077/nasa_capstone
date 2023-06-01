import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const Rover = () => {
  const [rover, setRover] = useState({});
  const sol = 3403;
  const [images, setImages] = useState([]);
  const [imageDisplay, setImageDisplay] = useState("invisibile")

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

  // useEffect(() => {
  //   if (rover.photos) {
  //     const fhazCAMImages = rover.photos
  //       .filter((rov) => rov.camera.name === "FHAZ")
  //       .map((fhaz) => ({ original: fhaz.img_src, thumbnail: fhaz.img_src }));
  //     setImages(fhazCAMImages);
  //   }
  // }, [rover.photos]);

  const mastCAM =
    rover.photos && rover.photos.filter((rov) => rov.camera.name === "MAST");

  const chemCAM =
    rover.photos && rover.photos.filter((rov) => rov.camera.name === "CHEMCAM");

  const mardiCAM =
    rover.photos && rover.photos.filter((rov) => rov.camera.name === "MARDI");

  const navCAM =
    rover.photos && rover.photos.filter((rov) => rov.camera.name === "NAVCAM");

  const fhazCAM =
    rover.photos &&
    rover.photos
      .filter((rov) => rov.camera.name === "FHAZ")
      .map((fhaz) => ({ original: fhaz.img_src, thumbnail: fhaz.img_src }));

  const rhazCAM =
    rover.photos && rover.photos.filter((rov) => rov.camera.name === "RHAZ");

  const mahliCAM =
    rover.photos && rover.photos.filter((rov) => rov.camera.name === "MAHLI");

  const roverClick = (e) => {
    console.log(e.target.name);
    if (e.target.name === 'FHAZ') {
      setImages(fhazCAM)
    }
  }

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
          <button onClick={roverClick} name="FHAZ" class="btn btn-outline btn-info">FHAZ CAM</button>
          <button onClick={roverClick} name="NAVCAM" class="btn btn-outline btn-success">NAVCAM</button>
          <button onClick={roverClick} name="CHEMCAM" class="btn btn-outline btn-warning">CHEMCAM</button>
          <button onClick={roverClick} name="MAST" class="btn btn-outline btn-error">MAST CAM</button>
        </div>
        <div className={'visible'}>
          <ImageGallery items={images} autoPlay={false} />
        </div>
      </div>
    </div>
  );
};

export default Rover;
