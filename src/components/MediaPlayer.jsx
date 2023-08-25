import React, { useState } from "react";
import axios from "axios";

const API_SEARCH_ENDPOINT = "https://images-api.nasa.gov/search";

const MediaPlayer = () => {
  const [keyword, setKeyword] = useState("");
  const [mediaList, setMediaList] = useState([]);
  const [selectedMediaUrl, setSelectedMediaUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const fetchMediaFile = async (collectionUrl) => {
    try {
      const result = await axios.get(collectionUrl);
      if (Array.isArray(result.data)) {
        setSelectedMediaUrl(result.data[0]); // Assuming the first item is the media file.
      } else {
        setError("Unexpected data structure in collection.json");
      }
    } catch (err) {
      setError(`Error fetching media file: ${err}`);
    }
  };

  const handleImageClick = (collectionUrl) => {
    fetchMediaFile(collectionUrl);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await axios.get(`${API_SEARCH_ENDPOINT}?q=${keyword}&media_type=video&page_size=5`);
      if (result.data && result.data.collection && result.data.collection.items) {
        setMediaList(result.data.collection.items);
      } else {
        setError("No media found");
      }
    } catch (err) {
      setError(`Search error: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={keyword}
        onChange={handleInputChange}
        placeholder="Search keyword"
      />
      <button onClick={handleSearch}>Search</button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="gallery">
        {mediaList.map((item, index) => (
          <img
            key={index}
            src={item.links[0].href} // Assuming the first link is the preview image.
            alt="preview"
            onClick={() => handleImageClick(item.href)}
          />
        ))}
      </div>
      {selectedMediaUrl && (
        <video controls width="300">
          <source src={selectedMediaUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default MediaPlayer;
