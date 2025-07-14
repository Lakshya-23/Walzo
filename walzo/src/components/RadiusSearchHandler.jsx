import React, { useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import { Circle } from 'react-leaflet';

const RadiusSearchHandler = ({ mode, radiusKm, onRadiusSelect }) => {
  const [hoverPosition, setHoverPosition] = useState(null);

  
  useMapEvents({
    
    mousemove(e) {
      if (mode === 'radius') {
        setHoverPosition(e.latlng);
      }
    },
    
    mouseout() {
      setHoverPosition(null);
    },
    
    click(e) {
      if (mode === 'radius') {
        onRadiusSelect(e.latlng); 
        setHoverPosition(null); 
      }
    },
  });

  
  if (mode !== 'radius' || !hoverPosition) {
    return null;
  }

  return (
    <Circle
      center={hoverPosition}
      radius={radiusKm * 1000} 
      pathOptions={{
        color: '#00A36C',
        fillColor: '#00A36C',
        fillOpacity: 0.1,
        weight: 2,
        dashArray: '5, 10', 
      }}
    />
  );
};

export default RadiusSearchHandler;