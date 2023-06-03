import React from "react";
import { Entity, EntityDescription, Viewer, CameraFlyTo } from "resium";
import { Cartesian3 } from "cesium";

const Globe = () => {
  const position = Cartesian3.fromDegrees(-74.0707, 40.711, 1000);
  const pointGraphics = { pixelSize: 10 };
  const globeStyle = {
    position: "absolute",
    top: 72,
    left: 0,
    right: 0,
    bottom: 0,
  };

  return (
    <Viewer style={globeStyle}>
      <CameraFlyTo duration={5} destination={position}>
        <Entity position={position} point={pointGraphics}>
          <EntityDescription>
            <h1 className="text-black">Hello World!</h1>
          </EntityDescription>
        </Entity>
      </CameraFlyTo>
    </Viewer>
  );
};

export default Globe;
