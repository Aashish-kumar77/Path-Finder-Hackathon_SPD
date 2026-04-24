import { useState, useEffect } from 'react';

const useGeolocation = (isTracking) => {
  const [position, setPosition] = useState(null);
  const [path, setPath] = useState([]); // Array to store the run coordinates
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }

   const handleSuccess = (pos) => {
  const { latitude, longitude } = pos.coords;
  console.log(`📍 New Position: ${latitude}, ${longitude} | Tracking: ${isTracking}`);
  
  const newPos = { lat: latitude, lng: longitude };
  setPosition(newPos);

  if (isTracking) {
    setPath((prevPath) => {
      const updatedPath = [...prevPath, [latitude, longitude]];
      console.log("📏 Current Path Length:", updatedPath.length);
      return updatedPath;
    });
  }
};

    const handleError = (err) => setError(err.message);

    const watchId = navigator.geolocation.watchPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      maximumAge: 0,
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, [isTracking]); // Re-run effect when tracking status changes

  return { position, path, setPath, error };
};

export default useGeolocation;