import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "react-visual-grid";
import "react-visual-grid/dist/react-visual-grid.css";

const Favorites = () => {
  // State to hold favorites image data
  const [favorites, setFavorites] = useState([]);
  // Loading state for images component. Will load once data has arrived.
  const [loading, setLoading] = useState(true);

  // Fetch list of favorites images.
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

  // Filter data to extract image links and map to data structure suitable for Grid component.
  const images =
    favorites.length > 0
      ? favorites
        .filter((img) => img.name === "ASOD")[0]
        .postPhoto.map((img, i) => ({
          src: img,
          alt: `Image ${i + 1}`,
        }))
      : [];

  // Loading progress bar
  if (loading) {
    return <progress data-theme="night" className="progress w-72"></progress>;
  }

  return (
    <div className="text-center font-sans flex items-center justify-center h-screen w-screen">
      <Grid images={images} mode="auto" width="100%" height="100%" />
    </div>
  );
};

export default Favorites;
