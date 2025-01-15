// Frontend (React)
import { useState, useEffect } from "react";

const GeolocationComponent = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `${process.env.REACT_APP_Backend_Url}/reverse-geocode`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                }),
              }
            );

            const data = await response.json();
            setLocation(data);
          } catch (err) {
            handleBrowserLocation();
          }
        },
        (err) => {
          console.error("Erreur de géolocalisation:", err);
          handleBrowserLocation();
        }
      );
    } else {
      handleBrowserLocation();
    }
  }, []);

  const handleBrowserLocation = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_Backend_Url}/browser-location`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: navigator.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            userAgent: navigator.userAgent,
          }),
        }
      );

      const data = await response.json();
      setLocation(data);
    } catch (err) {
      setError("Impossible de déterminer la localisation");
    }
  };

  return (
    <div>
      {location ? (
        <div>
          <p>Pays: {location.country}</p>
          <p>Ville: {location.city}</p>
          <p>Ville: {location.region}</p>
        </div>
      ) : error ? (
        <p>Erreur: {error}</p>
      ) : (
        <p>Chargement de la localisation...</p>
      )}
    </div>
  );
};

export default GeolocationComponent;
