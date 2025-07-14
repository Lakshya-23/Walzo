import React, { useState } from 'react';
import { useMapEvents, Circle, Rectangle, useMap } from 'react-leaflet';

const ClickInterceptor = ({ radiusKm, onRadiusSelect }) => {
  const [hoverPosition, setHoverPosition] = useState(null);
  const map = useMap(); 

  useMapEvents({
    mousemove(e) {
      setHoverPosition(e.latlng);
    },
    mouseout() {
      setHoverPosition(null);
    },
    click(e) {
      onRadiusSelect(e.latlng);
      setHoverPosition(null);
    },
  });

  const mapBounds = map.getBounds().pad(0.5);

  return (
    <>
  
      <Rectangle
        bounds={mapBounds}
        pathOptions={{
          stroke: false,
          fill: true,
          fillOpacity: 0.0, 
        }}
        pane="tooltipPane" 
      />

      {hoverPosition && (
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
          interactive={false} 
        />
      )}
    </>
  );
};

export default ClickInterceptor;