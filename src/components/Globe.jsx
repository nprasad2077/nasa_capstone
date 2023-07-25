import React from "react";
import {
  Entity,
  EntityDescription,
  Viewer,
  CameraFlyTo,
  PointGraphics,
} from "resium";
import { Cartesian3, Color, LabelStyle } from "cesium";

const Globe = () => {
  const position = Cartesian3.fromDegrees(-74.0707, 40.711, 1000);
  const positionTwo = Cartesian3.fromDegrees(139, 35.681167, 1000000);
  const positionTexas = Cartesian3.fromDegrees(-95.35828, 29.75468, 3000);
  const pointGraphics = { pixelSize: 10, color: Color.BLUE };
  const globeStyle = {
    position: "absolute",
    top: 72,
    left: 0,
    right: 0,
    bottom: 0,
  };

  return (
    <Viewer style={globeStyle} className="mt-6">
      <CameraFlyTo duration={7} destination={positionTexas} />
      <Entity
        position={positionTexas}
        point={pointGraphics}
        name="Houston"
        label={{
          text: "Hello World, from Houston!",
          font: "30px sans-serif",
          fillColor: Color.BLACK,
          outlineColor: Color.WHITE,
          outlineWidth: 3,
          style: LabelStyle.FILL_AND_OUTLINE,
        }}
      >
        <EntityDescription className="text-black">
          <h1 className="text-black">Hello World!</h1>
        </EntityDescription>
      </Entity>
    </Viewer>
  );
};

export default Globe;
