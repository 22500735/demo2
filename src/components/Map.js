import React, { useState } from 'react';
import { MapPin, Navigation, Search, Star, Clock, Phone } from 'lucide-react';
import './Map.css';

const Map = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'すべて', color: '#667eea' },
    { id: 'restaurant', name: 'レストラン', color: '#ff6b6b' },
    { id: 'cafe', name: 'カフェ', color: '#4ecdc4' },
    { id: 'library', name: '図書館', color: '#45b7d1' },
    { id: 'convenience', name: 'コンビニ', color: '#96ceb4' },
    { id: 'hospital', name: '病院', color: '#feca57' }
  ];

  const locations = [
    {
      id: 1,
      name: '大学食堂',
      category: 'restaurant',
      distance: '50m',
      rating: 4.2,
      description: '学生に人気の食堂。定食が安くて美味しい',
      hours: '11:00-20:00',
      phone: '03-1234-5678',
      popular: true
    },
    {
      id: 2,
      name: 'スターバックス 大学店',
      category: 'cafe',
      distance: '120m',
      rating: 4.5,
      description: 'WiFi完備、勉強スペースあり',
      hours: '7:00-22:00',
      phone: '03-2345-6789',
      popular: true
    },
    {
      id: 3,
      name: '中央図書館',
      category: 'library',
      distance: '200m',
      rating: 4.8,
      description: '24時間利用可能な自習室完備',
      hours: '24時間',
      phone: '03-3456-7890',
      popular: false
    },
    {
      id: 4,
      name: 'ファミリーマート 大学前店',
      category: 'convenience',
      distance: '80m',
      rating: 4.1,
      description: 'ATM、コピー機完備',
      hours: '24時間',
      phone: '03-4567-8901',
      popular: false
    },
    {
      id: 5,
      name: 'ラーメン横丁',
      category: 'restaurant',
      distance: '300m',
      rating: 4.6,
      description: '深夜まで営業の人気ラーメン店',
      hours: '18:00-3:00',
      phone: '03-5678-9012',
      popular: true
    },
    {
      id: 6,
      name: '大学病院',
      category: 'hospital',
      distance: '500m',
      rating: 4.3,
      description: '学生割引あり、内科・外科対応',
      hours: '9:00-17:00',
      phone: '03-6789-0123',
      popular: false
    }
  ];

  const filteredLocations = locations.filter(location => {
    const matchesCategory = selectedCategory === 'all' || location.category === selectedCategory;
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category) => {
    return categories.find(cat => cat.id === category)?.color || '#667eea';
  };

  return (
    <div className="map">
      <header className="map-header">
        <h1>キャンパスマップ</h1>
        <div className="header-subtitle">周辺施設案内</div>
      </header>

      <div className="map-container">
        <div className="map-placeholder">
          <div className="map-center">
            <div className="university-marker">
              <MapPin size={32} color="#667eea" />
              <span>大学</span>
            </div>
          </div>
          
          {filteredLocations.map((location, index) => (
            <div
              key={location.id}
              className="location-marker"
              style={{
                left: `${20 + (index * 15) % 60}%`,
                top: `${30 + (index * 20) % 40}%`,
                backgroundColor: getCategoryColor(location.category)
              }}
            >
              <MapPin size={20} color="white" />
            </div>
          ))}
        </div>
      </div>

      <div className="search-section">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="場所を検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="location-button">
          <Navigation size={20} />
        </button>
      </div>

      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-chip ${selectedCategory === category.id ? 'active' : ''}`}
            style={{
              backgroundColor: selectedCategory === category.id ? category.color : 'transparent',
              borderColor: category.color,
              color: selectedCategory === category.id ? 'white' : category.color
            }}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="locations-list">
        {filteredLocations.map((location) => (
          <div key={location.id} className="location-card">
            <div className="location-header">
              <div className="location-info">
                <h3 className="location-name">
                  {location.name}
                  {location.popular && (
                    <span className="popular-badge">人気</span>
                  )}
                </h3>
                <div className="location-meta">
                  <span className="distance">{location.distance}</span>
                  <div className="rating">
                    <Star size={14} fill="#ffd700" color="#ffd700" />
                    <span>{location.rating}</span>
                  </div>
                </div>
              </div>
              <div
                className="category-indicator"
                style={{ backgroundColor: getCategoryColor(location.category) }}
              ></div>
            </div>
            
            <p className="location-description">{location.description}</p>
            
            <div className="location-details">
              <div className="detail-item">
                <Clock size={14} />
                <span>{location.hours}</span>
              </div>
              <div className="detail-item">
                <Phone size={14} />
                <span>{location.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Map;
