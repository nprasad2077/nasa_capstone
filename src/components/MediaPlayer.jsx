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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const fetchMediaFile = async (collectionUrl) => {
    try {
      const result = await axios.get(collectionUrl);
      if (Array.isArray(result.data)) {
        // Filter the array to find the "orig.mp4" file.
        const mp4File = result.data.find((item) => item.endsWith("orig.mp4"));
        if (mp4File) {
          setSelectedMediaUrl(mp4File);
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
    <div className="container mx-auto p-4 flex-col py-8">
      <h1 className="text-5xl text-center subpixel-antialiased font-semibold tracking-wide">NASA Media Player</h1>
      <h3 className="text-xl text-center mt-4">
        Search for your favorite video topics!
      </h3>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={keyword}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search keyword"
          className="border border-gray-300 focus:outline-none px-4 py-2 rounded flex-grow"
        />
        <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">
          Search
        </button>
      </div>
      {isLoading && (
        <div className="text-center">
          <span className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-900"></span>
        </div>
      )}
      {error && <div className="text-center text-red-500">{error}</div>}
      <div className="grid grid-cols-4 gap-4 mb-10">
        {mediaList.map((item, index) => (
          <div
            key={index}
            onClick={() => handleImageClick(item.href)}
            className="cursor-pointer"
          >
            <img
              src={item.links[0].href}
              alt="preview"
              className="w-full object-cover rounded"
            />
          </div>
        ))}
      </div>
      {selectedMediaUrl && (
        <video controls autoPlay className="max-w-full max-h-full mt-6" src={selectedMediaUrl} type='video/mp4'>
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default MediaPlayer;