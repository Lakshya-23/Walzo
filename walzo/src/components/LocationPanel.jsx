import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { MapPin } from 'lucide-react';

const StatCard = ({ title, value }) => (
  <div className="bg-slate-100 border border-slate-200 p-4 rounded-lg text-center">
    <p className="text-sm text-slate-500">{title}</p>
    <p className="text-2xl font-bold text-slate-800">{value}</p>
  </div>
);

const LocationPanel = ({ location }) => {
  if (!location) {
    return (
      <div className="flex flex-col justify-center items-center h-full text-center text-slate-500 p-6 bg-white">
        <MapPin size={48} className="mb-4 text-slate-400" />
        <p className="text-lg font-semibold text-slate-700">Select a location on the map</p>
        <p className="text-sm">Click a marker to view its detailed intelligence report.</p>
      </div>
    );
  }

  const categorySalesData = [
      { name: 'Living Room Furniture', sold: location.Sofas_Sold },
      { name: 'Dining Room Furniture', sold: location.DiningTables_Sold },
      { name: 'Home Office Furniture', sold: location.HomeOffice_Sold },
      { name: 'Kids’ Furniture', sold: location.KidsFurniture_Sold },
  ];
  const competitorRevenueData = [
    { name: 'IKEA', value: location.IKEA_Revenue_USD_M },
    { name: 'Godrej', value: location.Godrej_Revenue_USD_M },
    { name: 'Pepperfry', value: location.Pepperfry_Revenue_USD_M },
  ];
  const COLORS = ['#00A36C', '#5B21B6', '#D97706'];

  return (
    <div className="h-full w-full bg-white p-6 overflow-y-auto text-slate-800">
        <div className="mb-6">
            <p className="text-sm font-bold text-walzo-lime uppercase tracking-wider">{location.Market_Segment_Name}</p>
            <h2 className="text-3xl font-black">{location.City}</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
            <StatCard title="Population" value={location.Population.toLocaleString()} />
            <StatCard title="Market Size" value={`$${location.Market_Size_USD_Millions.toFixed(2)}M`} />
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="font-bold mb-2 text-slate-700">Category Sales (Units)</h3>
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={categorySalesData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" stroke="#64748B" width={60} style={{ fontSize: '12px' }} axisLine={false} tickLine={false}/>
                    <Tooltip cursor={{fill: '#F1F5F9'}} contentStyle={{backgroundColor: 'white', borderRadius: '8px', border: '1px solid #E2E8F0'}} />
                    <Bar dataKey="sold" fill="#00A36C" radius={[0, 8, 8, 0]} />
                </BarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h3 className="font-bold mb-2 text-slate-700">Competitor Revenue Share (USD M)</h3>
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie data={competitorRevenueData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} fill="#8884d8" paddingAngle={5}>
                        {competitorRevenueData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip contentStyle={{backgroundColor: 'white', borderRadius: '8p_x', border: '1px solid #E2E8F0'}} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
    </div>
  );
};

export default LocationPanel;