import React from 'react';
import { Home, Calendar, MessageSquare, ShoppingBag, MapPin, User } from 'lucide-react';
import './BottomNavigation.css';

const BottomNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'main', icon: Home, label: '홈' },
    { id: 'timetable', icon: Calendar, label: '시간표' },
    { id: 'board', icon: MessageSquare, label: '게시판' },
    { id: 'marketplace', icon: ShoppingBag, label: '마켓' },
    { id: 'map', icon: MapPin, label: '지도' },
    { id: 'mypage', icon: User, label: '마이페이지' },
  ];

  return (
    <nav className="bottom-navigation">
      {tabs.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => onTabChange(item.id)}
          >
            <Icon size={20} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;
