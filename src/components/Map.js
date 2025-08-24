import React, { useState } from 'react';
import { MapPin, Search, Navigation, Coffee, Book, ShoppingBag, Home, X, Clock, Star, Phone, Calendar, Users, Car, MapIcon } from 'lucide-react';
import './Map.css';

const Map = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showRouteModal, setShowRouteModal] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [routeMode, setRouteMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState('내 위치');
  const [destination, setDestination] = useState('');
  const [routeType, setRouteType] = useState('walking'); // 'walking', 'driving', 'transit'
  const [showRouteGuidance, setShowRouteGuidance] = useState(false);

  // 예약 정보
  const [reservationData, setReservationData] = useState({
    date: '',
    time: '',
    people: 1,
    name: '',
    phone: '',
    notes: ''
  });

  // 장소 데이터
  const places = [
    {
      id: 1,
      name: '학생식당',
      category: 'restaurant',
      description: '저렴하고 맛있는 학생 전용 식당',
      icon: '🍽️',
      rating: 4.2,
      reviews: 156,
      hours: '11:00 - 20:00',
      phone: '02-1234-5678',
      location: { x: 300, y: 200 },
      tags: ['식당', '학생할인', '저렴'],
      images: ['https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=200&fit=crop&crop=center'],
      amenities: ['와이파이', '카드결제', '포장가능'],
      canReserve: false,
      distance: '도보 5분'
    },
    {
      id: 2,
      name: '중앙도서관',
      category: 'library',
      description: '24시간 이용 가능한 대학 도서관',
      icon: '📚',
      rating: 4.5,
      reviews: 89,
      hours: '24시간',
      phone: '02-1234-5679',
      location: { x: 450, y: 150 },
      tags: ['도서관', '24시간', '조용'],
      images: ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop&crop=center'],
      amenities: ['와이파이', '복사기', '스터디룸'],
      canReserve: true,
      reservationType: 'study_room',
      distance: '도보 3분'
    },
    {
      id: 3,
      name: '카페 라떼',
      category: 'cafe',
      description: '아늑한 분위기의 교내 카페',
      icon: '☕',
      rating: 4.7,
      reviews: 234,
      hours: '07:00 - 22:00',
      phone: '02-1234-5680',
      location: { x: 200, y: 300 },
      tags: ['카페', '와이파이', '스터디'],
      images: ['https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&h=200&fit=crop&crop=center'],
      amenities: ['와이파이', '콘센트', '조용한환경'],
      canReserve: true,
      reservationType: 'table',
      distance: '도보 2분'
    },
    {
      id: 4,
      name: '대학서점',
      category: 'store',
      description: '교재와 문구류를 판매하는 서점',
      icon: '📖',
      rating: 4.0,
      reviews: 67,
      hours: '09:00 - 18:00',
      phone: '02-1234-5681',
      location: { x: 350, y: 350 },
      tags: ['서점', '교재', '문구'],
      images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center'],
      amenities: ['카드결제', '배송서비스'],
      canReserve: false,
      distance: '도보 7분'
    },
    {
      id: 5,
      name: '체육관',
      category: 'sports',
      description: '각종 운동 시설을 갖춘 체육관',
      icon: '🏃',
      rating: 4.3,
      reviews: 123,
      hours: '06:00 - 22:00',
      phone: '02-1234-5682',
      location: { x: 500, y: 250 },
      tags: ['체육관', '운동', '헬스'],
      images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center'],
      amenities: ['샤워실', '락커', '운동기구'],
      canReserve: true,
      reservationType: 'facility',
      distance: '도보 8분'
    }
  ];

  const categories = [
    { id: 'all', name: '전체', icon: <MapIcon size={20} /> },
    { id: 'restaurant', name: '식당', icon: <Coffee size={20} /> },
    { id: 'library', name: '도서관', icon: <Book size={20} /> },
    { id: 'cafe', name: '카페', icon: <Coffee size={20} /> },
    { id: 'store', name: '상점', icon: <ShoppingBag size={20} /> },
    { id: 'sports', name: '체육시설', icon: <Home size={20} /> }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPlaces = places.filter(place => {
    const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory;
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         place.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
  };

  const handleReservation = () => {
    if (selectedPlace && selectedPlace.canReserve) {
      setShowReservationModal(true);
    }
  };

  const handleRouteSearch = () => {
    if (selectedPlace) {
      setDestination(selectedPlace.name);
      setShowRouteModal(true);
    }
  };

  const startNavigation = () => {
    setShowRouteModal(false);
    setShowRouteGuidance(true);
    setRouteMode(true);
  };

  const submitReservation = () => {
    // 예약 처리 로직
    alert(`${selectedPlace.name} 예약이 완료되었습니다!`);
    setShowReservationModal(false);
    setReservationData({
      date: '',
      time: '',
      people: 1,
      name: '',
      phone: '',
      notes: ''
    });
  };

  return (
    <div className="map-container">
      {/* 헤더 */}
      <div className="map-header">
        <div className="header-top">
          <h1 className="title">캠퍼스 맵</h1>
          <button 
            className={`route-toggle ${routeMode ? 'active' : ''}`}
            onClick={() => setRouteMode(!routeMode)}
          >
            <Navigation size={16} />
            길찾기
          </button>
        </div>

        {/* 검색 바 */}
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="장소, 건물 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {/* 카테고리 필터 */}
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-filter ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 맵 영역 */}
      <div className="map-content">
        <div className="map-view">
          <div className="map-background">
            {/* 가상 맵 배경 */}
            <div className="campus-map">
              <div className="building" style={{top: '10%', left: '20%'}}>공학관</div>
              <div className="building" style={{top: '30%', left: '60%'}}>인문관</div>
              <div className="building" style={{top: '60%', left: '30%'}}>도서관</div>
              <div className="building" style={{top: '80%', left: '70%'}}>체육관</div>
              
              {/* 장소 마커들 */}
              {filteredPlaces.map(place => (
                <div
                  key={place.id}
                  className={`place-marker ${selectedPlace?.id === place.id ? 'selected' : ''}`}
                  style={{
                    left: `${(place.location.x / 600) * 100}%`,
                    top: `${(place.location.y / 400) * 100}%`
                  }}
                  onClick={() => handlePlaceClick(place)}
                >
                  <div className="marker-icon">{place.icon}</div>
                  <div className="marker-label">{place.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 장소 목록 */}
        <div className="places-list">
          <h3>주변 장소</h3>
          {filteredPlaces.map(place => (
            <div 
              key={place.id} 
              className={`place-item ${selectedPlace?.id === place.id ? 'selected' : ''}`}
              onClick={() => handlePlaceClick(place)}
            >
              <div className="place-icon">{place.icon}</div>
              <div className="place-info">
                <h4>{place.name}</h4>
                <p>{place.description}</p>
                <div className="place-meta">
                  <span className="rating">
                    <Star size={12} /> {place.rating}
                  </span>
                  <span className="distance">{place.distance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 선택된 장소 상세 정보 */}
      {selectedPlace && (
        <div className="place-detail-panel">
          <div className="detail-header">
            <div className="detail-title">
              <span className="detail-icon">{selectedPlace.icon}</span>
              <div>
                <h3>{selectedPlace.name}</h3>
                <p>{selectedPlace.description}</p>
              </div>
            </div>
            <button className="close-detail" onClick={() => setSelectedPlace(null)}>
              <X size={20} />
            </button>
          </div>

          <div className="detail-content">
            <div className="detail-image">
              <img src={selectedPlace.images[0]} alt={selectedPlace.name} />
            </div>

            <div className="detail-info">
              <div className="info-row">
                <Clock size={16} />
                <span>{selectedPlace.hours}</span>
              </div>
              <div className="info-row">
                <Phone size={16} />
                <span>{selectedPlace.phone}</span>
              </div>
              <div className="info-row">
                <Star size={16} />
                <span>{selectedPlace.rating} ({selectedPlace.reviews}개 리뷰)</span>
              </div>
            </div>

            <div className="amenities">
              <h4>편의시설</h4>
              <div className="amenity-tags">
                {selectedPlace.amenities.map(amenity => (
                  <span key={amenity} className="amenity-tag">{amenity}</span>
                ))}
              </div>
            </div>

            <div className="action-buttons">
              <button className="route-button" onClick={handleRouteSearch}>
                <Navigation size={16} />
                길찾기
              </button>
              {selectedPlace.canReserve && (
                <button className="reserve-button" onClick={handleReservation}>
                  <Calendar size={16} />
                  예약하기
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 길찾기 모달 */}
      {showRouteModal && (
        <div className="modal-overlay" onClick={() => setShowRouteModal(false)}>
          <div className="route-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>길찾기</h3>
              <button onClick={() => setShowRouteModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="route-inputs">
              <div className="input-group">
                <label>출발지</label>
                <input
                  type="text"
                  value={currentLocation}
                  onChange={(e) => setCurrentLocation(e.target.value)}
                  placeholder="출발지를 입력하세요"
                />
              </div>
              
              <div className="input-group">
                <label>도착지</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="도착지를 입력하세요"
                />
              </div>
            </div>

            <div className="route-options">
              <button 
                className={`route-option ${routeType === 'walking' ? 'active' : ''}`}
                onClick={() => setRouteType('walking')}
              >
                🚶 도보 (5분)
              </button>
              <button 
                className={`route-option ${routeType === 'driving' ? 'active' : ''}`}
                onClick={() => setRouteType('driving')}
              >
                <Car size={16} /> 자동차 (2분)
              </button>
            </div>

            <button className="start-navigation" onClick={startNavigation}>
              길안내 시작
            </button>
          </div>
        </div>
      )}

      {/* 예약 모달 */}
      {showReservationModal && selectedPlace && (
        <div className="modal-overlay" onClick={() => setShowReservationModal(false)}>
          <div className="reservation-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedPlace.name} 예약</h3>
              <button onClick={() => setShowReservationModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="reservation-form">
              <div className="form-group">
                <label>예약 날짜</label>
                <input
                  type="date"
                  value={reservationData.date}
                  onChange={(e) => setReservationData({...reservationData, date: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label>예약 시간</label>
                <input
                  type="time"
                  value={reservationData.time}
                  onChange={(e) => setReservationData({...reservationData, time: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label>인원 수</label>
                <select
                  value={reservationData.people}
                  onChange={(e) => setReservationData({...reservationData, people: e.target.value})}
                >
                  <option value={1}>1명</option>
                  <option value={2}>2명</option>
                  <option value={3}>3명</option>
                  <option value={4}>4명</option>
                  <option value={5}>5명 이상</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>예약자명</label>
                <input
                  type="text"
                  value={reservationData.name}
                  onChange={(e) => setReservationData({...reservationData, name: e.target.value})}
                  placeholder="이름을 입력하세요"
                />
              </div>
              
              <div className="form-group">
                <label>연락처</label>
                <input
                  type="tel"
                  value={reservationData.phone}
                  onChange={(e) => setReservationData({...reservationData, phone: e.target.value})}
                  placeholder="전화번호를 입력하세요"
                />
              </div>
              
              <div className="form-group">
                <label>요청사항</label>
                <textarea
                  value={reservationData.notes}
                  onChange={(e) => setReservationData({...reservationData, notes: e.target.value})}
                  placeholder="추가 요청사항이 있으시면 입력해주세요"
                  rows="3"
                />
              </div>
            </div>

            <button className="submit-reservation" onClick={submitReservation}>
              예약 완료
            </button>
          </div>
        </div>
      )}

      {/* 길안내 가이던스 */}
      {showRouteGuidance && (
        <div className="route-guidance">
          <div className="guidance-header">
            <div className="route-info">
              <span className="route-distance">350m</span>
              <span className="route-time">도보 5분</span>
            </div>
            <button onClick={() => setShowRouteGuidance(false)}>
              <X size={20} />
            </button>
          </div>
          
          <div className="guidance-step">
            <div className="step-icon">➡️</div>
            <div className="step-text">
              <div className="step-direction">직진 후 우회전</div>
              <div className="step-distance">100m 후</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;