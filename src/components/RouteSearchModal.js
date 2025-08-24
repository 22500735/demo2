import React, { useState } from 'react';
import { X, Navigation, Clock, MapPin, Car, Bike, Users } from 'lucide-react';
import './RouteSearchModal.css';

const RouteSearchModal = ({ 
  isOpen, 
  onClose, 
  destination, 
  darkMode = false, 
  onStartGuidance 
}) => {
  const [startLocation, setStartLocation] = useState('내 현재 위치');
  const [endLocation, setEndLocation] = useState(destination?.name || '');
  const [selectedTransport, setSelectedTransport] = useState('walking');
  const [selectedRoute, setSelectedRoute] = useState(null);

  const transportModes = [
    {
      id: 'walking',
      name: '도보',
      icon: <Users size={20} />,
      time: '5분',
      distance: '350m',
      description: '가장 빠른 경로'
    },
    {
      id: 'bike',
      name: '자전거',
      icon: <Bike size={20} />,
      time: '2분',
      distance: '450m',
      description: '자전거 도로 이용'
    },
    {
      id: 'car',
      name: '자동차',
      icon: <Car size={20} />,
      time: '3분',
      distance: '600m',
      description: '주차장 경유'
    }
  ];

  const routeOptions = [
    {
      id: 'fastest',
      name: '가장 빠른 경로',
      time: '5분',
      distance: '350m',
      description: '실시간 교통상황 반영',
      steps: [
        { instruction: '남쪽으로 50m 직진', distance: '50m', duration: '1분' },
        { instruction: '우회전하여 공학관 방향', distance: '150m', duration: '2분' },
        { instruction: '좌회전하여 목적지 도착', distance: '150m', duration: '2분' }
      ]
    },
    {
      id: 'shortest',
      name: '최단 거리',
      time: '6분',
      distance: '320m',
      description: '거리 최적화 경로',
      steps: [
        { instruction: '동쪽으로 100m 직진', distance: '100m', duration: '1분 30초' },
        { instruction: '계단 이용하여 상층부', distance: '120m', duration: '2분 30초' },
        { instruction: '직진하여 목적지 도착', distance: '100m', duration: '2분' }
      ]
    },
    {
      id: 'accessible',
      name: '접근성 경로',
      time: '7분',
      distance: '400m',
      description: '엘리베이터 및 경사로 이용',
      steps: [
        { instruction: '서쪽으로 80m 직진', distance: '80m', duration: '1분 30초' },
        { instruction: '엘리베이터 이용하여 2층', distance: '160m', duration: '3분' },
        { instruction: '우회전하여 목적지 도착', distance: '160m', duration: '2분 30초' }
      ]
    }
  ];

  const handleStartNavigation = () => {
    if (selectedRoute) {
      const routeData = {
        id: `route_${Date.now()}`,
        start: { name: startLocation },
        end: { name: endLocation },
        transportMode: selectedTransport,
        ...selectedRoute
      };
      onStartGuidance(routeData);
    }
  };

  const handleSwapLocations = () => {
    const temp = startLocation;
    setStartLocation(endLocation);
    setEndLocation(temp);
  };

  if (!isOpen) return null;

  return (
    <div className={`route-modal-overlay ${darkMode ? 'dark' : ''}`} onClick={onClose}>
      <div className={`route-search-modal ${darkMode ? 'dark' : ''}`} onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="route-modal-header">
          <div className="header-content">
            <Navigation size={24} />
            <h2>길찾기</h2>
          </div>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Location Inputs */}
        <div className="location-inputs">
          <div className="input-group">
            <div className="input-icon start">
              <div className="location-dot"></div>
            </div>
            <input
              type="text"
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
              placeholder="출발지를 입력하세요"
              className="location-input"
            />
          </div>

          <button className="swap-button" onClick={handleSwapLocations}>
            ⇅
          </button>

          <div className="input-group">
            <div className="input-icon end">
              <MapPin size={16} />
            </div>
            <input
              type="text"
              value={endLocation}
              onChange={(e) => setEndLocation(e.target.value)}
              placeholder="도착지를 입력하세요"
              className="location-input"
            />
          </div>
        </div>

        {/* Transport Mode Selection */}
        <div className="transport-section">
          <h3>교통수단</h3>
          <div className="transport-modes">
            {transportModes.map((mode) => (
              <button
                key={mode.id}
                className={`transport-mode ${selectedTransport === mode.id ? 'active' : ''}`}
                onClick={() => setSelectedTransport(mode.id)}
              >
                <div className="mode-icon">{mode.icon}</div>
                <div className="mode-info">
                  <div className="mode-name">{mode.name}</div>
                  <div className="mode-time">{mode.time}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Route Options */}
        <div className="route-options-section">
          <h3>경로 옵션</h3>
          <div className="route-options">
            {routeOptions.map((route) => (
              <div
                key={route.id}
                className={`route-option ${selectedRoute?.id === route.id ? 'selected' : ''}`}
                onClick={() => setSelectedRoute(route)}
              >
                <div className="route-header">
                  <div className="route-name">{route.name}</div>
                  <div className="route-time">
                    <Clock size={14} />
                    {route.time}
                  </div>
                </div>
                <div className="route-details">
                  <span className="route-distance">{route.distance}</span>
                  <span className="route-description">{route.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Route Steps Preview */}
        {selectedRoute && (
          <div className="route-preview">
            <h3>경로 미리보기</h3>
            <div className="route-steps">
              {selectedRoute.steps.map((step, index) => (
                <div key={index} className="route-step">
                  <div className="step-number">{index + 1}</div>
                  <div className="step-content">
                    <div className="step-instruction">{step.instruction}</div>
                    <div className="step-details">
                      {step.distance} • {step.duration}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="modal-actions">
          <button className="cancel-button" onClick={onClose}>
            취소
          </button>
          <button 
            className="start-navigation-button"
            onClick={handleStartNavigation}
            disabled={!selectedRoute}
          >
            <Navigation size={16} />
            길안내 시작
          </button>
        </div>
      </div>
    </div>
  );
};

export default RouteSearchModal;
