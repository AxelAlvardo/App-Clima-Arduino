import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "pk.eyJ1IjoiYXhlbGFsdmFyYWRvMzQwIiwiYSI6ImNtM2hqY3J6ZTBoMjUya3FjcWZjM3g3ZWkifQ.Z009SrSLOPsY9ahyx4f4Tg";

function MapComponent() {
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: [-89.2360, 13.68046], 
      zoom: 15.5,
    });

    map.on("load", () => {
      map.addSource("agricultural-zone", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [-89.250, 13.678],
                [-89.249, 13.675],
                [-89.253, 13.674],
                [-89.254, 13.677],
                [-89.250, 13.678],
              ],
            ],
          },
        },
      });

      map.addLayer({
        id: "agricultural-zone-layer",
        type: "fill",
        source: "agricultural-zone",
        layout: {},
        paint: {
          "fill-color": "#088",
          "fill-opacity": 0.5,
        },
      });
    });

    return () => map.remove();
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: "100%", borderRadius: '15px', overflow: 'hidden', border: '2px solid #ccc', border: 'none' }}
    />
  );
}

export default MapComponent;
