import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainFeed from './components/MainFeed';
import RecommendedFeed from './components/RecommendedFeed';
import Timetable from './components/Timetable';
import Marketplace from './components/Marketplace';
import Map from './components/Map';
import MyPage from './components/MyPage';

import BottomNavigation from './components/BottomNavigation';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('main');

  const renderContent = () => {
    switch (activeTab) {
      case 'main':
        return <MainFeed />;
      case 'timetable':
        return <Timetable />;
      case 'recommended':
        return <RecommendedFeed />;
      case 'marketplace':
        return <Marketplace />;
      case 'map':
        return <Map />;
      case 'mypage':
        return <MyPage />;
      default:
        return <MainFeed />;
    }
  };

  return (
    <div className="App">
      <div className="app-content">
        {renderContent()}
      </div>
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
      />
    </div>
  );
}

export default App;
