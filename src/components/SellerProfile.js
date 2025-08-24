import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, MessageCircle, Phone, Mail, Calendar, Shield, ThumbsUp, Heart, Eye, Clock, User } from 'lucide-react';
import './SellerProfile.css';

const SellerProfile = ({ seller, onBack }) => {
  const [activeTab, setActiveTab] = useState('items');
  
  // 가상의 판매자 상세 정보
  const sellerData = {
    name: seller?.name || '김학생',
    department: seller?.department || '컴퓨터공학과',
    year: '3학년',
    joinDate: '2023-03-15',
    avatar: 'https://via.placeholder.com/80x80?text=' + (seller?.name?.charAt(0) || '김'),
    rating: 4.7,
    reviewCount: 23,
    location: '신촌',
    responseTime: '보통 1시간 이내',
    completedDeals: 47,
    bio: '안전하고 깔끔한 거래를 지향합니다. 궁금한 점 있으시면 언제든 연락주세요!',
    trustScore: 95,
    badges: ['신속응답', '정확한 설명', '친절한 서비스'],
    isVerified: true
  };

  // 판매자의 다른 상품들
  const [sellerItems] = useState([
    {
      id: 101,
      title: 'iPhone 13 Pro 128GB',
      price: 850000,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
      condition: '상급',
      time: '2시간 전',
      likes: 15,
      views: 127,
      status: 'available'
    },
    {
      id: 102,
      title: '에어팟 프로 2세대',
      price: 180000,
      image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=300&h=300&fit=crop',
      condition: '최상',
      time: '1일 전',
      likes: 8,
      views: 89,
      status: 'sold'
    },
    {
      id: 103,
      title: '아이패드 에어 4세대',
      price: 450000,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop',
      condition: '상급',
      time: '3일 전',
      likes: 12,
      views: 156,
      status: 'available'
    }
  ]);

  // 판매자 리뷰
  const [reviews] = useState([
    {
      id: 1,
      reviewer: '이구매자',
      rating: 5,
      comment: '정말 깔끔하게 포장해서 보내주셨어요! 설명대로 완전 새것같아요.',
      item: 'iPhone 13 Pro',
      date: '2024-01-10',
      helpful: 8
    },
    {
      id: 2,
      reviewer: '박학생',
      rating: 5,
      comment: '빠른 응답과 친절한 설명 감사했습니다. 또 기회되면 거래하고 싶어요.',
      item: '맥북 프로',
      date: '2024-01-08',
      helpful: 5
    },
    {
      id: 3,
      reviewer: '최구매자',
      rating: 4,
      comment: '상품 상태 좋고 약속된 시간에 정확히 거래했습니다.',
      item: '에어팟',
      date: '2024-01-05',
      helpful: 3
    }
  ]);

  const formatPrice = (price) => {
    return price.toLocaleString() + '원';
  };

  const getStatusText = (status) => {
    return status === 'available' ? '판매중' : '판매완료';
  };

  const getStatusColor = (status) => {
    return status === 'available' ? '#10b981' : '#6b7280';
  };

  if (!seller) {
    return (
      <div className="seller-profile">
        <div className="seller-profile-header">
          <button className="back-button" onClick={onBack}>
            <ArrowLeft size={20} />
            <span>뒤로가기</span>
          </button>
        </div>
        <div className="error-message">
          <p>판매자 정보를 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="seller-profile">
      {/* 헤더 */}
      <div className="seller-profile-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          <span>뒤로가기</span>
        </button>
      </div>

      {/* 판매자 정보 */}
      <div className="seller-info-section">
        <div className="seller-main-info">
          <div className="seller-avatar">
            <img src={sellerData.avatar} alt={sellerData.name} />
            {sellerData.isVerified && (
              <div className="verified-badge">
                <Shield size={16} />
              </div>
            )}
          </div>
          
          <div className="seller-details">
            <div className="seller-name-section">
              <h1 className="seller-name">{sellerData.name}</h1>
              <div className="seller-rating">
                <Star size={16} fill="#ffc107" color="#ffc107" />
                <span className="rating-score">{sellerData.rating}</span>
                <span className="rating-count">({sellerData.reviewCount})</span>
              </div>
            </div>
            
            <div className="seller-basic-info">
              <div className="info-item">
                <User size={14} />
                <span>{sellerData.department} {sellerData.year}</span>
              </div>
              <div className="info-item">
                <MapPin size={14} />
                <span>{sellerData.location}</span>
              </div>
              <div className="info-item">
                <Calendar size={14} />
                <span>가입 {new Date(sellerData.joinDate).toLocaleDateString()}</span>
              </div>
            </div>

            {sellerData.bio && (
              <p className="seller-bio">{sellerData.bio}</p>
            )}

            <div className="trust-badges">
              {sellerData.badges.map((badge, index) => (
                <span key={index} className="trust-badge">{badge}</span>
              ))}
            </div>
          </div>
        </div>

        {/* 신뢰도 정보 */}
        <div className="trust-info">
          <div className="trust-score">
            <div className="trust-score-number">{sellerData.trustScore}</div>
            <div className="trust-score-label">신뢰도</div>
          </div>
          
          <div className="trust-stats">
            <div className="trust-stat">
              <div className="stat-number">{sellerData.completedDeals}</div>
              <div className="stat-label">완료거래</div>
            </div>
            <div className="trust-stat">
              <div className="stat-number">{sellerData.responseTime}</div>
              <div className="stat-label">응답시간</div>
            </div>
          </div>
        </div>

        {/* 연락 버튼 */}
        <div className="contact-actions">
          <button className="contact-btn primary">
            <MessageCircle size={18} />
            <span>채팅하기</span>
          </button>
          <button className="contact-btn secondary">
            <Phone size={18} />
            <span>전화하기</span>
          </button>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="seller-tabs">
        <button 
          className={`tab-button ${activeTab === 'items' ? 'active' : ''}`}
          onClick={() => setActiveTab('items')}
        >
          판매상품 ({sellerItems.length})
        </button>
        <button 
          className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          거래후기 ({reviews.length})
        </button>
      </div>

      {/* 탭 콘텐츠 */}
      <div className="seller-content">
        {activeTab === 'items' && (
          <div className="seller-items">
            <div className="items-grid">
              {sellerItems.map(item => (
                <div key={item.id} className="seller-item-card">
                  <div className="item-image">
                    <img src={item.image} alt={item.title} />
                    <div className="item-status-overlay">
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(item.status) }}
                      >
                        {getStatusText(item.status)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="item-info">
                    <div className="item-title">{item.title}</div>
                    <div className="item-price">{formatPrice(item.price)}</div>
                    <div className="item-meta">
                      <div className="item-condition">{item.condition}</div>
                      <div className="item-time">{item.time}</div>
                    </div>
                    <div className="item-stats">
                      <div className="stat">
                        <Heart size={12} />
                        <span>{item.likes}</span>
                      </div>
                      <div className="stat">
                        <Eye size={12} />
                        <span>{item.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="seller-reviews">
            <div className="reviews-summary">
              <div className="overall-rating">
                <div className="rating-large">
                  <Star size={24} fill="#ffc107" color="#ffc107" />
                  <span className="rating-number">{sellerData.rating}</span>
                </div>
                <div className="rating-breakdown">
                  <div>전체 {reviews.length}개 후기</div>
                  <div>평균 평점 {sellerData.rating}/5.0</div>
                </div>
              </div>
            </div>

            <div className="reviews-list">
              {reviews.map(review => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <div className="reviewer-avatar">
                        {review.reviewer.charAt(0)}
                      </div>
                      <div className="reviewer-details">
                        <div className="reviewer-name">{review.reviewer}</div>
                        <div className="review-item">구매상품: {review.item}</div>
                      </div>
                    </div>
                    <div className="review-meta">
                      <div className="review-rating">
                        {Array.from({length: 5}, (_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            fill={i < review.rating ? "#ffc107" : "none"} 
                            color="#ffc107" 
                          />
                        ))}
                      </div>
                      <div className="review-date">
                        {new Date(review.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="review-content">
                    <p>{review.comment}</p>
                  </div>
                  
                  <div className="review-actions">
                    <button className="helpful-btn">
                      <ThumbsUp size={14} />
                      <span>도움됨 {review.helpful}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerProfile;
