import React, { useState, useEffect } from 'react';
import { 
  MapPin, Search, Navigation, Coffee, Book, ShoppingBag, Home, X, 
  Clock, Star, Phone, Calendar, Users, Car, MapIcon, Bike, Plus, 
  Minus, RotateCcw, Compass
} from 'lucide-react';
import './Map.css';

const Map = ({ darkMode = false }) => {
  console.log('Map component rendering', { darkMode });
  
  // State Management
  const [isRouteMode, setIsRouteMode] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [mapZoom, setMapZoom] = useState(1);
  const [mapCenter, setMapCenter] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({ x: 250, y: 200 });
  const [showLocationDetails, setShowLocationDetails] = useState(false);

  // Enhanced Location Data
  const locations = [
    {
      id: 1,
      name: '중앙도서관',
      category: 'library',
      distance: '도보 3분',
      rating: 4.5,
      description: '24시간 이용 가능한 대학 도서관',
      tags: ['스터디룸', '24시간', '조용'],
      color: '#4facfe',
      coordinates: { lat: 37.5665, lng: 126.9780, x: 450, y: 150 },
      hours: '24시간 운영',
      phone: '02-1234-5679',
      amenities: ['와이파이', '복사기', '스터디룸', '컴퓨터실'],
      images: [
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center'
      ],
      reviews: [
        { id: 1, author: '학생A', rating: 5, comment: '조용하고 시설이 좋아요', date: '2024-01-15' },
        { id: 2, author: '학생B', rating: 4, comment: '24시간 이용 가능해서 편해요', date: '2024-01-14' }
      ],
      canReserve: true,
      reservationType: 'study_room'
    },
    {
      id: 2,
      name: '학생식당',
      category: 'restaurant',
      distance: '도보 5분',
      rating: 4.2,
      description: '저렴하고 맛있는 학생 전용 식당',
      tags: ['한식', '저렴', '학생할인'],
      color: '#ff6b6b',
      coordinates: { lat: 37.5655, lng: 126.9770, x: 300, y: 200 },
      hours: '11:00 - 20:00',
      phone: '02-1234-5678',
      amenities: ['카드결제', '현금결제', '포장가능'],
      images: [
        'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=200&fit=crop&crop=center'
      ],
      reviews: [
        { id: 1, author: '학생C', rating: 4, comment: '가성비 좋아요', date: '2024-01-15' }
      ],
      canReserve: false
    },
    {
      id: 3,
      name: '카페 라떼',
      category: 'cafe',
      distance: '도보 2분',
      rating: 4.7,
      description: '아늑한 분위기의 교내 카페',
      tags: ['커피', '디저트', '스터디'],
      color: '#2ecc71',
      coordinates: { lat: 37.5675, lng: 126.9785, x: 200, y: 300 },
      hours: '07:00 - 22:00',
      phone: '02-1234-5680',
      amenities: ['와이파이', '콘센트', '조용한환경'],
      images: [
        'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&h=200&fit=crop&crop=center'
      ],
      reviews: [],
      canReserve: true,
      reservationType: 'table'
    },
    {
      id: 4,
      name: '체육관',
      category: 'sports',
      distance: '도보 8분',
      rating: 4.3,
      description: '각종 운동 시설을 갖춘 체육관',
      tags: ['헬스', '농구', '배드민턴'],
      color: '#9b59b6',
      coordinates: { lat: 37.5645, lng: 126.9790, x: 500, y: 250 },
      hours: '06:00 - 22:00',
      phone: '02-1234-5682',
      amenities: ['샤워실', '락커', '운동기구'],
      images: [
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center'
      ],
      reviews: [],
      canReserve: true,
      reservationType: 'facility'
    },
    {
      id: 5,
      name: '대학서점',
      category: 'store',
      distance: '도보 7분',
      rating: 4.0,
      description: '교재와 문구류를 판매하는 서점',
      tags: ['교재', '문구', '복사'],
      color: '#f39c12',
      coordinates: { lat: 37.5660, lng: 126.9775, x: 350, y: 350 },
      hours: '09:00 - 18:00',
      phone: '02-1234-5681',
      amenities: ['카드결제', '배송서비스'],
      images: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center'
      ],
      reviews: [],
      canReserve: false
    }
  ];

  const categories = [
    { id: 'all', name: '전체', icon: <MapIcon size={20} />, count: locations.length },
    { id: 'library', name: '도서관', icon: <Book size={20} />, count: 1 },
    { id: 'restaurant', name: '식당', icon: <Coffee size={20} />, count: 1 },
    { id: 'cafe', name: '카페', icon: <Coffee size={20} />, count: 1 },
    { id: 'sports', name: '체육시설', icon: <Home size={20} />, count: 1 },
    { id: 'store', name: '상점', icon: <ShoppingBag size={20} />, count: 1 }
  ];

  // Filtered locations based on search and category
  const filteredLocations = locations.filter(location => {
    const matchesCategory = activeCategory === 'all' || location.category === activeCategory;
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  console.log('Filtered locations:', filteredLocations.length, filteredLocations);

  // Event Handlers
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowLocationDetails(true);
  };

  const handleStartNavigation = (location) => {
    setSelectedLocation(location);
    setIsRouteMode(true);
    alert(`${location.name}으로 길찾기를 시작합니다.`);
  };

  const handleReservation = () => {
    if (selectedLocation && selectedLocation.canReserve) {
      setShowReservationModal(true);
    }
  };

  const handleZoomIn = () => {
    setMapZoom(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setMapZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleResetView = () => {
    setMapZoom(1);
    setMapCenter({ x: 0, y: 0 });
  };

  // Get current location (simulated)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd convert GPS coordinates to map coordinates
          setCurrentPosition({ x: 250, y: 200 });
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }
  }, []);

  return (
    <div className={`map-container ${darkMode ? 'dark' : ''}`}>
      
      {/* Header */}
      <div className="map-header">
        <div className="header-top">
          <h1 className="title">캠퍼스 맵</h1>
          <div className="header-controls">
            <button 
              className={`route-toggle ${isRouteMode ? 'active' : ''}`}
              onClick={() => setIsRouteMode(!isRouteMode)}
            >
              <Navigation size={16} />
              {isRouteMode ? '맵보기' : '길찾기'}
            </button>
            <button className="reset-view" onClick={handleResetView}>
              <Compass size={16} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="장소, 건물, 시설 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button 
              className="clear-search"
              onClick={() => setSearchQuery('')}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-filter ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.icon}
              <span>{category.name}</span>
              <span className="category-count">{category.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="map-content">
        
        {/* Interactive Map View */}
        <div className={`map-view ${isRouteMode ? 'route-mode' : ''}`}>
          <div className="map-background">
            <div 
              className="campus-map"
              style={{ 
                transform: `scale(${mapZoom}) translate(${mapCenter.x}px, ${mapCenter.y}px)` 
              }}
            >
              
              {/* Campus Buildings */}
              <div className="building" style={{top: '10%', left: '20%'}}>
                공학관
              </div>
              <div className="building" style={{top: '30%', left: '60%'}}>
                인문관
              </div>
              <div className="building" style={{top: '60%', left: '30%'}}>
                도서관
              </div>
              <div className="building" style={{top: '80%', left: '70%'}}>
                체육관
              </div>

              {/* Current Position */}
              <div 
                className="current-position"
                style={{
                  left: `${(currentPosition.x / 600) * 100}%`,
                  top: `${(currentPosition.y / 400) * 100}%`
                }}
              >
                <div className="position-dot"></div>
                <div className="position-pulse"></div>
              </div>

              {/* Location Markers */}
              {filteredLocations.map(location => {
                console.log('Rendering marker for:', location.name, location.coordinates);
                return (
                  <div
                    key={location.id}
                    className={`place-marker ${selectedLocation?.id === location.id ? 'selected' : ''}`}
                    style={{
                      left: `${(location.coordinates.x / 600) * 100}%`,
                      top: `${(location.coordinates.y / 400) * 100}%`,
                      '--marker-color': location.color
                    }}
                    onClick={() => handleLocationSelect(location)}
                  >
                  <div className="marker-icon">
                    {location.category === 'library' && <Book size={16} />}
                    {location.category === 'restaurant' && <Coffee size={16} />}
                    {location.category === 'cafe' && <Coffee size={16} />}
                    {location.category === 'sports' && <Users size={16} />}
                    {location.category === 'store' && <ShoppingBag size={16} />}
                  </div>
                  <div className="marker-label">{location.name}</div>
                  <div className="marker-distance">{location.distance}</div>
                </div>
                );
              })}

              {/* Route Path (when route is active) */}
              {selectedRoute && (
                <div className="route-path">
                  <svg className="route-svg" width="100%" height="100%">
                    <path
                      d={`M ${currentPosition.x} ${currentPosition.y} Q 350 250 ${selectedLocation?.coordinates.x || 450} ${selectedLocation?.coordinates.y || 150}`}
                      stroke="url(#routeGradient)"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray="10,5"
                      className="animated-route"
                    />
                    <defs>
                      <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6adca4" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Map Controls */}
          <div className="map-controls">
            <button className="zoom-control" onClick={handleZoomIn}>
              <Plus size={16} />
            </button>
            <button className="zoom-control" onClick={handleZoomOut}>
              <Minus size={16} />
            </button>
            <button className="zoom-control" onClick={handleResetView}>
              <RotateCcw size={16} />
            </button>
          </div>

          {/* Map Legend */}
          <div className="map-legend">
            <div className="legend-item">
              <div className="legend-icon current"></div>
              <span>현재 위치</span>
            </div>
            <div className="legend-item">
              <div className="legend-icon marker"></div>
              <span>주요 시설</span>
            </div>
            {selectedRoute && (
              <div className="legend-item">
                <div className="legend-icon route"></div>
                <span>추천 경로</span>
              </div>
            )}
          </div>
        </div>

        {/* Location List */}
        <div className="sidebar">
          <div className="location-list">
              <div className="list-header">
                <h3>주변 장소</h3>
                <div className="list-stats">
                  {filteredLocations.length}개 장소
                </div>
              </div>
              
              <div className="locations">
                {filteredLocations.map(location => (
                  <div 
                    key={location.id} 
                    className={`location-card ${selectedLocation?.id === location.id ? 'selected' : ''}`}
                    onClick={() => handleLocationSelect(location)}
                  >
                    <div className="location-image">
                      <img src={location.images[0]} alt={location.name} />
                      <div className="location-category">
                        {location.category === 'library' && <Book size={14} />}
                        {location.category === 'restaurant' && <Coffee size={14} />}
                        {location.category === 'cafe' && <Coffee size={14} />}
                        {location.category === 'sports' && <Users size={14} />}
                        {location.category === 'store' && <ShoppingBag size={14} />}
                      </div>
                    </div>
                    
                    <div className="location-info">
                      <div className="location-header">
                        <h4>{location.name}</h4>
                        <div className="location-rating">
                          <Star size={12} fill="#ffd700" />
                          {location.rating}
                        </div>
                      </div>
                      
                      <p className="location-description">{location.description}</p>
                      
                      <div className="location-details">
                        <span className="location-distance">{location.distance}</span>
                        <span className="location-hours">
                          <Clock size={12} />
                          {location.hours}
                        </span>
                      </div>
                      
                      <div className="location-tags">
                        {location.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="tag">#{tag}</span>
                        ))}
                      </div>
                      
                      <div className="location-actions">
                        <button 
                          className="action-btn primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartNavigation(location);
                          }}
                        >
                          <Navigation size={14} />
                          길찾기
                        </button>
                        {location.canReserve && (
                          <button 
                            className="action-btn secondary"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedLocation(location);
                              handleReservation();
                            }}
                          >
                            <Calendar size={14} />
                            예약
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </div>

      {/* 하단 정보 섹션 */}
      <div className="bottom-info-section">
        {/* 인기 장소 */}
        <div className="popular-places">
          <h3>🔥 인기 장소</h3>
          <div className="popular-grid">
            {locations
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 4)
              .map(place => (
                <div 
                  key={place.id} 
                  className="popular-card"
                  onClick={() => handleLocationSelect(place)}
                >
                  <div className="popular-image">
                    <img src={place.images[0]} alt={place.name} />
                    <div className="rating-badge">
                      <Star size={12} fill="#ffd700" />
                      {place.rating}
                    </div>
                  </div>
                  <div className="popular-info">
                    <h4>{place.name}</h4>
                    <p>{place.distance}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* 실시간 정보 */}
        <div className="realtime-info">
          <h3>📍 실시간 정보</h3>
          <div className="info-cards">
            <div className="info-card">
              <div className="info-icon">🚶</div>
              <div className="info-content">
                <div className="info-title">평균 도보시간</div>
                <div className="info-value">5분</div>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">👥</div>
              <div className="info-content">
                <div className="info-title">현재 이용자</div>
                <div className="info-value">234명</div>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">🌡️</div>
              <div className="info-content">
                <div className="info-title">현재 날씨</div>
                <div className="info-value">22°C</div>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">🕐</div>
              <div className="info-content">
                <div className="info-title">운영 중인 시설</div>
                <div className="info-value">12개</div>
              </div>
            </div>
          </div>
        </div>

        {/* 빠른 액션 */}
        <div className="quick-actions-section">
          <h3>⚡ 빠른 액션</h3>
          <div className="quick-buttons">
            <button 
              className="quick-btn"
              onClick={() => {
                const library = locations.find(l => l.category === 'library');
                if (library) handleLocationSelect(library);
              }}
            >
              <Book size={20} />
              <span>스터디룸 예약</span>
            </button>
            <button 
              className="quick-btn"
              onClick={() => {
                const cafe = locations.find(l => l.category === 'cafe');
                if (cafe) handleStartNavigation(cafe);
              }}
            >
              <Coffee size={20} />
              <span>가까운 카페</span>
            </button>
            <button 
              className="quick-btn"
              onClick={() => {
                const restaurant = locations.find(l => l.category === 'restaurant');
                if (restaurant) handleStartNavigation(restaurant);
              }}
            >
              <Users size={20} />
              <span>학생식당</span>
            </button>
            <button 
              className="quick-btn"
              onClick={() => {
                alert('교통 정보를 확인 중입니다...');
              }}
            >
              <Car size={20} />
              <span>교통 정보</span>
            </button>
          </div>
        </div>

        {/* 공지사항 & 이벤트 */}
        <div className="announcements">
          <h3>📢 공지사항 & 이벤트</h3>
          <div className="announcement-list">
            <div className="announcement-item">
              <div className="announcement-badge new">NEW</div>
              <div className="announcement-content">
                <h4>중앙도서관 야간 개방 연장</h4>
                <p>시험기간 동안 24시간 운영합니다</p>
                <span className="announcement-date">2024.01.15</span>
              </div>
            </div>
            <div className="announcement-item">
              <div className="announcement-badge event">EVENT</div>
              <div className="announcement-content">
                <h4>카페 라떼 할인 이벤트</h4>
                <p>학생증 제시 시 20% 할인</p>
                <span className="announcement-date">2024.01.10 ~ 2024.01.31</span>
              </div>
            </div>
            <div className="announcement-item">
              <div className="announcement-badge maintenance">공지</div>
              <div className="announcement-content">
                <h4>체육관 시설 정기점검</h4>
                <p>매주 월요일 오전 9시-12시 이용 불가</p>
                <span className="announcement-date">정기</span>
              </div>
            </div>
          </div>
        </div>

        {/* 이용 통계 */}
        <div className="usage-stats">
          <h3>📊 이용 통계</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-chart">
                <div className="chart-bar" style={{height: '80%'}}></div>
                <div className="chart-bar" style={{height: '60%'}}></div>
                <div className="chart-bar" style={{height: '90%'}}></div>
                <div className="chart-bar" style={{height: '70%'}}></div>
                <div className="chart-bar" style={{height: '85%'}}></div>
              </div>
              <div className="stat-info">
                <h4>주간 이용률</h4>
                <p>이번 주 평균 76%</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-number">156</div>
              <div className="stat-info">
                <h4>오늘 방문자</h4>
                <p>어제 대비 +12%</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-number">89%</div>
              <div className="stat-info">
                <h4>시설 이용률</h4>
                <p>피크 시간 12-14시</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Details Modal */}
      {showLocationDetails && selectedLocation && (
        <div className="modal-overlay" onClick={() => setShowLocationDetails(false)}>
          <div className="location-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedLocation.name}</h2>
              <button onClick={() => setShowLocationDetails(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="modal-content">
              <div className="detail-images">
                {selectedLocation.images.map((image, index) => (
                  <img key={index} src={image} alt={selectedLocation.name} />
                ))}
              </div>
              
              <div className="detail-info">
                <div className="info-row">
                  <Clock size={16} />
                  <span>{selectedLocation.hours}</span>
                </div>
                <div className="info-row">
                  <Phone size={16} />
                  <span>{selectedLocation.phone}</span>
                </div>
                <div className="info-row">
                  <Star size={16} />
                  <span>{selectedLocation.rating} / 5.0</span>
                </div>
                <div className="info-row">
                  <MapPin size={16} />
                  <span>{selectedLocation.distance}</span>
                </div>
              </div>
              
              <div className="amenities">
                <h4>편의시설</h4>
                <div className="amenity-list">
                  {selectedLocation.amenities.map(amenity => (
                    <span key={amenity} className="amenity">{amenity}</span>
                  ))}
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  className="modal-action-btn primary"
                  onClick={() => {
                    setShowLocationDetails(false);
                    handleStartNavigation(selectedLocation);
                  }}
                >
                  <Navigation size={16} />
                  길찾기
                </button>
                {selectedLocation.canReserve && (
                  <button 
                    className="modal-action-btn secondary"
                    onClick={() => {
                      setShowLocationDetails(false);
                      handleReservation();
                    }}
                  >
                    <Calendar size={16} />
                    예약하기
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 예약 모달 */}
      {showReservationModal && selectedLocation && (
        <div className="modal-overlay" onClick={() => setShowReservationModal(false)}>
          <div className="location-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedLocation.name} 예약</h2>
              <button onClick={() => setShowReservationModal(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="modal-content">
              <div className="reservation-form">
                <div className="form-group">
                  <label>예약 날짜</label>
                  <input type="date" />
                </div>
                
                <div className="form-group">
                  <label>예약 시간</label>
                  <input type="time" />
                </div>
                
                <div className="form-group">
                  <label>인원 수</label>
                  <select>
                    <option value={1}>1명</option>
                    <option value={2}>2명</option>
                    <option value={3}>3명</option>
                    <option value={4}>4명</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>예약자명</label>
                  <input type="text" placeholder="이름을 입력하세요" />
                </div>
                
                <div className="form-group">
                  <label>연락처</label>
                  <input type="tel" placeholder="전화번호를 입력하세요" />
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  className="modal-action-btn secondary"
                  onClick={() => setShowReservationModal(false)}
                >
                  취소
                </button>
                <button 
                  className="modal-action-btn primary"
                  onClick={() => {
                    alert('예약이 완료되었습니다!');
                    setShowReservationModal(false);
                  }}
                >
                  예약 완료
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;