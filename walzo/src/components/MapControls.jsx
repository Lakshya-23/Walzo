import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react'; 

const MapControls = ({ radiusKm, onRadiusChange, onSearchModeChange, isActivelySearching, onNewSearchClick }) => {
  const [searchMode, setSearchMode] = useState('nationwide');

  const handleModeChange = (mode) => {
    setSearchMode(mode);
    onSearchModeChange(mode);
  };

  const handleRadiusInputChange = (e) => {
    onRadiusChange(parseFloat(e.target.value));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-slate-200">
      <div className="flex bg-slate-100 rounded-lg p-1 mb-4">
        <button 
          onClick={() => handleModeChange('nationwide')}
          className={`w-1/2 py-2 text-sm px-2 mr-2 font-bold rounded-md transition-colors ${searchMode === 'nationwide' ? 'bg-walzo-lime text-slate-900 shadow' : 'text-slate-600 hover:bg-slate-200'}`}
        >
          Nationwide Top 5
        </button>
        <button 
          onClick={() => handleModeChange('radius')}
          className={`w-1/2 py-2 px-2 text-sm font-bold rounded-md transition-colors ${searchMode === 'radius' ? 'bg-walzo-lime text-slate-900 shadow' : 'text-slate-600 hover:bg-slate-200'}`}
        >
          Radius Search
        </button>
      </div>

      {searchMode === 'radius' && (
        <div className="space-y-3">
          <label htmlFor="radiusInput" className="block text-sm font-medium text-slate-700">
            Search Radius (km)
          </label>
          <input 
            id="radiusInput"
            type="number" 
            value={radiusKm} 
            onChange={handleRadiusInputChange} 
            className="bg-slate-100 text-slate-800 p-2 rounded-md w-full text-sm border border-slate-300 focus:ring-2 focus:ring-walzo-lime focus:border-transparent outline-none"
          />
          
          {false ? (
             <p className="text-xs text-slate-500 text-center animate-pulse">Hover and click on the map to select an area.</p>
          ) : (
            <Button onClick={onNewSearchClick} className="w-full bg-slate-800 text-black font-bold hover:bg-slate-700 flex items-center gap-2 active:bg-slate-700">
              <Search size={16} />
              Perform New Radius Search
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default MapControls;