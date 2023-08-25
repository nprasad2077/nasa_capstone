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
        // Filter the array to find the "orig.mp4" file.
        const mp4File = result.data.find((item) => item.endsWith("orig.mp4"));
        if (mp4File) {
          setSelectedMediaUrl(mp4File);
          // Manually reload the video player if it exists
          const videoElement = document.getElementById("videoPlayer");
          if (videoElement) {
            videoElement.load();
            videoElement.play();
          }
        } else {
          setError("No MP4 file found in the collection");
        }
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
      const result = await axios.get(
        `${API_SEARCH_ENDPOINT}?q=${keyword}&media_type=video&page_size=5`
      );
      if (
        result.data &&
        result.data.collection &&
        result.data.collection.items
      ) {
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
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={keyword}
          onChange={handleInputChange}
          placeholder="Search keyword"
          className="input input-bordered input-accent w-2/3"
        />
        <button onClick={handleSearch} className="btn btn-accent ml-4">
          Search
        </button>
      </div>
      {isLoading && (
        <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {error && <div className="text-center text-red-500">{error}</div>}
      <div className="grid grid-cols-4 gap-4">
        {mediaList.map((item, index) => (
          <div
            key={index}
            onClick={() => handleImageClick(item.href)}
            className="cursor-pointer"
          >
            <img
              src={item.links[0].href}
              alt="preview"
              className="w-full object-cover"
            />
          </div>
        ))}
      </div>
      {selectedMediaUrl && (
        <div className="mt-8">
          <video id="videoPlayer" controls width="100%">
            <source src={selectedMediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default MediaPlayer;
