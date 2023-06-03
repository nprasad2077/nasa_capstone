import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "react-visual-grid";
import "react-visual-grid/dist/react-visual-grid.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

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
          .postPhoto.map((img, i) => ({
            src: img,
            alt: `Image ${i + 1}`,
          }))
      : [];

  if (loading) {
    return <progress className="progress w-56"></progress>;
  }

  return (
    <div className="text-center font-sans">
      <Grid images={images} mode="auto" width={800} height={900} />
    </div>
  );
};

export default Favorites;
