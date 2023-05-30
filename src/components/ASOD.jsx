import React, { useState, useEffect } from "react";
import axios from "axios";



const ASOD = () => {
  return (
    <div className="card w-96 bg-base-100 text-neutral-content " >
      <figure className="px-10 pt-10">
        <img
          src="https://apod.nasa.gov/apod/image/2305/M27_Cosgrove_2717.jpg"
          alt="ASOD"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
      </div>
    </div>
  );
};

export default ASOD;
