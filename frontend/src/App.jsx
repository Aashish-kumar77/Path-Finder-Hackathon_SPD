import React from 'react';
import TerritoryMap from './components/Map/TerritoryMap';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {/* Header Overlay */}
      <div style={{ 
        position: 'absolute', 
        top: '10px', 
        left: '10px', 
        zIndex: 1000, 
        background: 'white', 
        padding: '10px', 
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
      }}>
        <h2 style={{ margin: 0 }}>🏃‍♂️ Territory Runner</h2>
        <small>Tracking Live in Ludhiana</small>
      </div>
      
      {/* The Map Component */}
      <TerritoryMap />
    </div>
  );
}

// THIS IS THE LINE YOU ARE MISSING:
export default App;