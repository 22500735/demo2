import React from 'react';
import { Home, Calendar, MessageSquare, MapPin } from 'lucide-react';
import './BottomNavigation.css';

const BottomNavigation = ({ currentTab, setCurrentTab }) => {
  const navItems = [
    { id: 'main', icon: Home, label: 'ホーム' },
    { id: 'timetable', icon: Calendar, label: '時間割' },
    { id: 'board', icon: MessageSquare, label: '掲示板' },
    { id: 'map', icon: MapPin, label: 'マップ' }
  ];

  return (
    <nav className="bottom-navigation">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            className={`nav-item ${currentTab === item.id ? 'active' : ''}`}
            onClick={() => setCurrentTab(item.id)}
          >
            <Icon size={24} />
            <span className="nav-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;
