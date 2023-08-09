import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import '../styles/Reset.css'

const NewGlobe = () => {
  const globeEl = useRef(null);
  const [countries, setCountries] = useState({ features: [] });
  const [altitude, setAltitude] = useState(0.1);
  const [transitionDuration, setTransitionDuration] = useState(1000);

  useEffect(() => {
    // Initialize the globe
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.3;

    // Fetch the geojson data
    fetch("/globeData/datasets/ne_110m_admin_0_countries.geojson")
      .then(res => res.json())
      .then(data => {
        setCountries(data);

        setTimeout(() => {
          setTransitionDuration(4000);
          setAltitude(() => feat => Math.max(0.1, Math.sqrt(+feat.properties.POP_EST) * 7e-5));
        }, 3000);
      });
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology-min.jpg"
        polygonsData={countries.features.filter(d => d.properties.ISO_A2 !== 'AQ')}
        polygonAltitude={altitude}
        polygonCapColor={() => 'rgba(200, 0, 0, 0.6)'}
        polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
        polygonLabel={({ properties: d }) => `
          <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
          Population: <i>${Math.round(+d.POP_EST / 1e4) / 1e2}M</i>
        `}
        polygonsTransitionDuration={transitionDuration}
      />
    </div>
  );
};

export default NewGlobe;
