import React, { useEffect, useState, useMemo, useRef } from 'react';
import GoogleMapReact from "google-map-react";
import csvToJson from "convert-csv-to-json";
import useSupercluster from "use-supercluster";
import "./style.css";
// link Map web https://codesandbox.io/p/sandbox/react-map-cluster-w87mrc?file=%2Fsrc%2FApp.js%3A10%2C40
const Marker = ({ children }) => children;

export default function Map() {
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(10);
  const mapRef = useRef();

  const loadData = async () => {
    try {
      const response = await fetch("/path/to/data-point-eau-paris.csv");
      const csvText = await response.text();
      let json = csvToJson.getJsonFromCsv(csvText);
      return json;
    } catch (error) {
      console.error("Error loading CSV:", error);
      return [];
    }
  };

  const data = useMemo(() => {
    const res = loadData().then(data => {
      return data.slice(0, 1000).map((elem) => ({
        type: "Feature",
        properties: {
          cluster: false,
          category: "wells",
          wellId: elem.osm_id,
        },
        geometry: {
          type: "Point",
          coordinates: [parseFloat(elem.X), parseFloat(elem.Y)],
        },
      }));
    });

    return res;
  }, []);

  const { clusters, supercluster } = useSupercluster({
    points: data,
    bounds,
    zoom,
    options: {
      radius: 75,
      maxZoom: 20,
      map: (item) => ({ c: 1 }),
      reduce: (acc, cur) => {
        acc.c += 1;
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const jsonData = await loadData();
      // Handle data loading in effect if necessary
    };
    fetchData();
  }, []);

  return (
    <div>
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "YOUR_GOOGLE_MAPS_API_KEY" }} // Add your API key
          defaultCenter={{ lat: 48.8566, lng: 2.3522 }}
          defaultZoom={10}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map }) => {
            mapRef.current = map;
          }}
          onChange={({ zoom, bounds }) => {
            setZoom(zoom);
            setBounds([
              bounds.nw.lng,
              bounds.se.lat,
              bounds.se.lng,
              bounds.nw.lat,
            ]);
          }}
        >
          {clusters &&
            clusters.map((cluster) => {
              const [longitude, latitude] = cluster.geometry.coordinates;
              const { cluster: isCluster, point_count: pointCount } = cluster.properties;

              if (isCluster) {
                const size = (pointCount * 20) / data.length;

                return (
                  <Marker
                    lat={latitude}
                    lng={longitude}
                    key={`cluster-${cluster.id}`}
                    className="cluster-marker"
                  >
                    <div
                      className="cluster-marker"
                      style={{ width: size + "px", height: size + "px" }}
                      onClick={() => {
                        const expansionZoom = Math.min(
                          supercluster.getClusterExpansionZoom(cluster.id),
                          20
                        );
                        mapRef.current.setZoom(expansionZoom);
                        mapRef.current.panTo({ lat: latitude, lng: longitude });
                      }}
                    >
                      {pointCount}
                    </div>
                  </Marker>
                );
              } else {
                return (
                  <Marker
                    key={`cluster-${cluster.properties.wellId}`}
                    lat={latitude}
                    lng={longitude}
                  >
                    <div className="well-marker">F</div>
                  </Marker>
                );
              }
            })}
        </GoogleMapReact>
      </div>
    </div>
  );
}
