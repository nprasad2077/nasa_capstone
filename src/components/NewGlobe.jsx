import React from 'react';
import Globe from 'react-globe.gl';

const NewGlobe = () => {
  const globeEl = React.useRef(null);

  React.useEffect(() => {
    // Initialize the globe
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.5;
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology-min.jpg"
      />
    </div>
  );
};

export default NewGlobe;
