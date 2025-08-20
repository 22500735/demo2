import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainFeed from './components/MainFeed';
import Timetable from './components/Timetable';
import Board from './components/Board';
import Map from './components/Map';
import BottomNavigation from './components/BottomNavigation';

function App() {
  const [currentTab, setCurrentTab] = useState('main');

  const renderCurrentTab = () => {
    switch (currentTab) {
      case 'main':
        return <MainFeed />;
      case 'timetable':
        return <Timetable />;
      case 'board':
        return <Board />;
      case 'map':
        return <Map />;
      default:
        return <MainFeed />;
    }
  };

  return (
    <div className="App">
      <div className="app-container">
        <main className="main-content">
          {renderCurrentTab()}
        </main>
        <BottomNavigation currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </div>
    </div>
  );
}

export default App;
