import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, GeoJSON, useMap } from 'react-leaflet';
import useGeolocation from '../../hooks/useGeolocation';

// Component to handle map centering
function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo([position.lat, position.lng], 15);
  }, [position, map]);
  return null;
}

const TerritoryMap = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [allTerritories, setAllTerritories] = useState([]);
  const { position, path, setPath, error } = useGeolocation(isRunning);

  // Fetch territories from backend
  const fetchTerritories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/runs/all');
      const data = await response.json();
      // Filter out any runs that might have empty geojson
      setAllTerritories(data.filter(run => run.territory_geojson));
    } catch (err) {
      console.error("Failed to load territories:", err);
    }
  };

  useEffect(() => {
    fetchTerritories();
  }, [isRunning]); // Refetch when a run ends to see the new territory

  const toggleRun = async () => {
    if (isRunning) {
      // STOP RUN: Send the path to backend
      try {
        await fetch('http://localhost:5000/api/runs/end', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: 'aashish-01', path: path })
        });
        setPath([]); // Clear the blue line
      } catch (err) {
        console.error("Save failed:", err);
      }
    }
    setIsRunning(!isRunning);
  };

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      
      {/* UI Button */}
      <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
        <button onClick={toggleRun} style={{
            padding: '15px 40px', fontSize: '18px', fontWeight: 'bold', borderRadius: '50px', border: 'none',
            backgroundColor: isRunning ? '#ff4444' : '#00C851', color: 'white', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
        }}>
          {isRunning ? '🛑 Stop & Claim' : '🏃‍♂️ Start Run'}
        </button>
      </div>

      <MapContainer center={[30.901, 75.857]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {/* Draw claimed territories */}
        {allTerritories.map((run) => (
          <GeoJSON 
            key={run.id} 
            data={run.territory_geojson} 
            style={{ color: '#00C851', weight: 2, fillColor: '#00C851', fillOpacity: 0.3 }}
          />
        ))}

        {/* Draw active path */}
        {path.length > 1 && <Polyline positions={path} color="blue" weight={5} />}

        {position && (
          <>
            <RecenterMap position={position} />
            <Marker position={[position.lat, position.lng]}>
              <Popup>You are here!</Popup>
            </Marker>
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default TerritoryMap;