import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import LocationPanel from '../components/LocationPanel';
import MapControls from '../components/MapControls'; 
import ClickInterceptor from '../components/ClickInterceptor';
import MapResizer from '../components/MapResizer';

import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;


const AdminPage = () => {
    const [allLocations, setAllLocations] = useState([]);
    const [visibleMarkers, setVisibleMarkers] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [searchMode, setSearchMode] = useState('nationwide');
    const [searchRadiusKm, setSearchRadiusKm] = useState(100);
    const [searchCircle, setSearchCircle] = useState(null);
    const [isActivelySearching, setIsActivelySearching] = useState(false); // Our new state!

    useEffect(() => {
        fetch('/locations.json')
            .then(res => res.json())
            .then(data => {
                setAllLocations(data);
                handleSearchModeChange('nationwide', data);
            });
    }, []);

    const handleSearchModeChange = (mode, data) => {
        setSearchMode(mode);
        setSelectedLocation(null);
        setSearchCircle(null);
        const locations = data || allLocations;
        if (mode === 'nationwide') {
            setIsActivelySearching(false); 
            const top5 = [...locations].sort((a, b) => b.Darkstore_Score - a.Darkstore_Score).slice(0, 5);
            setVisibleMarkers(top5);
        } else {
            setIsActivelySearching(true); 
            setVisibleMarkers(locations); 
        }
    };
    
    const handleRadiusSelect = (centerLatLng) => {
        const radiusMeters = searchRadiusKm * 1000;
        setSearchCircle({ center: centerLatLng, radius: radiusMeters });
        
        const locationsInRadius = allLocations.filter(loc => 
            L.latLng(loc.Latitude, loc.Longitude).distanceTo(centerLatLng) <= radiusMeters
        );
        const top5InRadius = locationsInRadius.sort((a, b) => b.Darkstore_Score - a.Darkstore_Score).slice(0, 5);
        setVisibleMarkers(top5InRadius);

        setIsActivelySearching(false);
    };

    const handleNewSearchClick = () => {
       
        setSearchCircle(null);
        setVisibleMarkers(allLocations); 
        setIsActivelySearching(true);
    };

    const segmentColors = { 0: '#00A36C', 1: '#5B21B6', 2: '#D97706', 3: '#DC2626' };
    const getMarkerIcon = (segmentId) => {
        const color = segmentColors[segmentId] || '#1F2937';
        const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.25));"><path fill="${color}" stroke="#FFF" stroke-width="1.5" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;
        return L.divIcon({ html: svgIcon, className: '', iconSize: [36, 36], iconAnchor: [18, 36], popupAnchor: [0, -36] });
    };

    return (
        <div className="w-full h-screen bg-slate-100 flex flex-col">
            <header className="flex-shrink-0 h-24 p-4 md:p-6 flex flex-col justify-center border-b border-slate-200">
                <h1 className="text-3xl font-black text-slate-800">
                    Darkstore <span className="bg-walzo-lime px-2 py-1 rounded-sm">Opportunity Explorer</span>
                </h1>
                <p className="text-slate-500 mt-1.5">AI-Powered Location Intelligence for Walzo</p>
            </header>

            <main className="flex-grow p-4 md:p-6 grid lg:grid-cols-[400px_1fr] gap-4 min-h-0">
                <div className="lg:col-span-1 flex flex-col gap-4 min-h-0">
                    <MapControls 
                        radiusKm={searchRadiusKm}
                        onRadiusChange={setSearchRadiusKm} 
                        onSearchModeChange={handleSearchModeChange}
                        isActivelySearching={isActivelySearching}
                        onNewSearchClick={handleNewSearchClick}
                    />
                    <div className="flex-grow rounded-lg overflow-hidden shadow-md border border-slate-200">
                        <LocationPanel location={selectedLocation} />
                    </div>
                </div>

                <div className="lg:col-span-1 rounded-lg overflow-hidden shadow-md min-h-screen">
                    <MapContainer 
                        center={[22.9734, 78.6569]} 
                        zoom={5} 
                        className="w-full h-full"
                        style={{cursor: isActivelySearching ? 'crosshair' : 'default'}}
                        scrollWheelZoom={false} 
                    >
                        <MapResizer />
                        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" attribution='© CARTO' />
                        
                        {isActivelySearching && (
                          <ClickInterceptor radiusKm={searchRadiusKm} onRadiusSelect={handleRadiusSelect} />
                        )}
                        
                        {searchCircle && (
                            <Circle center={searchCircle.center} radius={searchCircle.radius} pathOptions={{ color: '#5B21B6', fillColor: '#5B21B6', fillOpacity: 0.2, weight: 2 }} interactive={false} />
                        )}

                        {visibleMarkers.map(loc => (
                            <Marker 
                                key={loc.City} 
                                position={[loc.Latitude, loc.Longitude]}
                                icon={getMarkerIcon(loc.Market_Segment_ID)}
                                // THE FIX: Markers are clickable ONLY when not actively searching
                                eventHandlers={isActivelySearching ? null : { click: () => setSelectedLocation(loc) }}
                            >
                                <Popup>{loc.City} - {loc.Market_Segment_Name}</Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </main>
        </div>
    );
};

export default AdminPage;