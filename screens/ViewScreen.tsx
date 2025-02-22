import React, { useState } from "react";
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App'; 

const App = () => {
  const [activeTab, setActiveTab] = useState("Date Ideas");

type ViewScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'View'>;
};

  const dateIdeas = [
    { id: 1, location: "Date location", date: "2/22/2025" },
    { id: 2, location: "Date location", date: "2/22/2025" },
    { id: 3, location: "Date location", date: "2/22/2025" },
    { id: 4, location: "Date location", date: "2/22/2025" },
  ];

  return (
    <div className="flex flex-col h-screen bg-purple-300">
      {/* Header */}
      <div className="bg-purple-100 p-5 text-center">
        <h1 className="text-3xl font-bold text-purple-800">p1us 💜</h1>
        <h2 className="text-2xl font-semibold text-purple-900">View Menu</h2>
      </div>

      {/* Tabs */}
      <div className="flex bg-purple-400 p-2">
        <button
          className={`flex-1 py-2 rounded-t-lg ${
            activeTab === "Date Ideas" ? "bg-purple-500 text-white" : "bg-white"
          }`}
          onClick={() => setActiveTab("Date Ideas")}
        >
          Date Ideas
        </button>
        <button
          className={`flex-1 py-2 rounded-t-lg ${
            activeTab === "Matches" ? "bg-purple-500 text-white" : "bg-white"
          }`}
          onClick={() => setActiveTab("Matches")}
        >
          Matches
        </button>
      </div>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-4 bg-purple-400">
        {activeTab === "Date Ideas" &&
          dateIdeas.map((date) => (
            <div
              key={date.id}
              className="bg-purple-100 p-4 rounded-lg flex items-center mb-4"
            >
              <div className="w-12 h-12 bg-purple-700 rounded-full mr-4"></div>
              <div>
                <h3 className="text-purple-800 font-semibold">{date.location}</h3>
                <p className="text-purple-700">Selected: {date.date}</p>
              </div>
            </div>
          ))}
        <button className="w-full bg-white text-purple-800 py-2 rounded-lg mt-2">
          Choose More
        </button>
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-around bg-purple-800 text-white py-4">
        <button>
          {/* Home Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9L12 2l9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </button>
        <button>
          {/* Eye Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </button>
        <button>
          {/* User Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default App;
