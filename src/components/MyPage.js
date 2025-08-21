import React, { useState } from 'react';
import { Heart, Bookmark, MessageSquare, MessageCircle, User, Settings, Bell, HelpCircle, LogOut, Trophy, Star, Calendar, BookOpen, Users, ShoppingBag, MapPin, Phone, Mail, Edit, Camera, Upload } from 'lucide-react';
import './MyPage.css';

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('liked');
  const [showSettings, setShowSettings] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/80x80?text=김민수');

  const userInfo = {
    name: '김대학생',
    major: '컴퓨터공학과',
    year: '3학년',
    gpa: '3.85',
    credits: '98',
    joinDate: '2022년 3월',
    circles: [
      { name: '프로그래밍동아리CODE', role: '부회장', joinDate: '2022년 3월', status: '활동중' },
      { name: '맛집탐방동아리', role: '일반회원', joinDate: '2022년 9월', status: '활동중' },
      { name: '도서관스터디모임', role: '스터디장', joinDate: '2023년 3월', status: '활동중' }
    ]
  };

  const likedPosts = [
    {
      id: 1,
      title: '중간고사 스터디 모집합니다!',
      category: '스터디',
      timeAgo: '2시간 전',
      likes: 23,
      comments: 8
    },
    {
      id: 2,
      title: '학식 추천 메뉴 있나요?',
      category: '음식',
      timeAgo: '1일 전',
      likes: 45,
      comments: 12
    },
    {
      id: 3,
      title: '동아리 신입생 모집!',
      category: '동아리',
      timeAgo: '3일 전',
      likes: 67,
      comments: 15
    }
  ];

  const savedItems = [
    {
      id: 1,
      title: 'iPhone 13 Pro 128GB',
      price: '850,000원',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop',
      timeAgo: '1일 전'
    },
    {
      id: 2,
      title: '미적분학 교재 (새책)',
      price: '25,000원',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=100&h=100&fit=crop',
      timeAgo: '2일 전'
    }
  ];

  const myPosts = [
    {
      id: 1,
      title: '컴공과 과제 도움 드립니다',
      category: '스터디',
      timeAgo: '5일 전',
      likes: 34,
      comments: 7,
      views: 234
    },
    {
      id: 2,
      title: '중고 노트북 판매합니다',
      category: '중고거래',
      timeAgo: '1주 전',
      likes: 12,
      comments: 3,
      views: 156
    }
  ];

  const achievements = [
    { icon: '🎓', title: '우수 학생', description: 'GPA 3.5 이상 달성' },
    { icon: '💬', title: '활발한 소통', description: '댓글 100개 작성' },
    { icon: '❤️', title: '인기 게시물', description: '좋아요 50개 받기' },
    { icon: '📚', title: '스터디 왕', description: '스터디 10회 참여' }
  ];

  const menuItems = [
    { icon: Bell, title: '알림 설정', subtitle: '푸시 알림, 이메일 설정' },
    { icon: Settings, title: '계정 설정', subtitle: '프로필, 개인정보 관리' },
    { icon: HelpCircle, title: '고객센터', subtitle: '문의하기, FAQ' },
    { icon: LogOut, title: '로그아웃', subtitle: '안전하게 로그아웃' }
  ];

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mypage">
      <div className="profile-section">
        <div className="profile-header">
          <div className="avatar-container">
            <img src={profileImage} alt="프로필" className="profile-avatar" />
            <button 
              className="change-avatar-btn"
              onClick={() => document.getElementById('profile-image-input').click()}
            >
              <Camera size={16} />
            </button>
            <input
              id="profile-image-input"
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              style={{ display: 'none' }}
            />
          </div>
          <div className="profile-info">
            <h2 className="profile-name">{userInfo.name}</h2>
            <p className="profile-details">{userInfo.major} • {userInfo.year}</p>
            <p className="profile-stats">GPA: {userInfo.gpa} • 이수학점: {userInfo.credits}</p>
          </div>
          <button 
            className="edit-profile-btn"
            onClick={() => setShowProfileEdit(true)}
          >
            <Edit size={16} />
          </button>
        </div>
      </div>

      <div className="achievements-section">
        <h3>달성 배지</h3>
        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <div key={index} className="achievement-card">
              <div className="achievement-icon">{achievement.icon}</div>
              <div className="achievement-info">
                <div className="achievement-title">{achievement.title}</div>
                <div className="achievement-description">{achievement.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="activity-section">
        <div className="activity-tabs">
          <button 
            className={`activity-tab ${activeTab === 'liked' ? 'active' : ''}`}
            onClick={() => setActiveTab('liked')}
          >
            <Heart size={16} />
            <span>좋아요</span>
          </button>
          <button 
            className={`activity-tab ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            <Bookmark size={16} />
            <span>저장됨</span>
          </button>
          <button 
            className={`activity-tab ${activeTab === 'myposts' ? 'active' : ''}`}
            onClick={() => setActiveTab('myposts')}
          >
            <MessageSquare size={16} />
            <span>내 게시물</span>
          </button>
          <button 
            className={`activity-tab ${activeTab === 'circles' ? 'active' : ''}`}
            onClick={() => setActiveTab('circles')}
          >
            <Users size={16} />
            <span>내 서클</span>
          </button>
        </div>

        <div className="activity-content">
          {activeTab === 'liked' && (
            <div className="liked-posts">
              {likedPosts.map(post => (
                <div key={post.id} className="activity-item">
                  <div className="item-content">
                    <div className="item-title">{post.title}</div>
                    <div className="item-meta">
                      <span className="item-category">{post.category}</span>
                      <span>•</span>
                      <span className="item-time">{post.timeAgo}</span>
                    </div>
                  </div>
                  <div className="item-stats">
                    <div className="stat">
                      <Heart size={12} />
                      <span>{post.likes}</span>
                    </div>
                    <div className="stat">
                      <MessageCircle size={12} />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="saved-items">
              {savedItems.map(item => (
                <div key={item.id} className="saved-item">
                  <img src={item.image} alt={item.title} className="saved-item-image" />
                  <div className="saved-item-info">
                    <div className="saved-item-title">{item.title}</div>
                    <div className="saved-item-price">{item.price}</div>
                    <div className="saved-item-time">{item.timeAgo}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'myposts' && (
            <div className="my-posts">
              {myPosts.map(post => (
                <div key={post.id} className="activity-item">
                  <div className="item-content">
                    <div className="item-title">{post.title}</div>
                    <div className="item-meta">
                      <span className="item-category">{post.category}</span>
                      <span>•</span>
                      <span className="item-time">{post.timeAgo}</span>
                    </div>
                  </div>
                  <div className="item-stats">
                    <div className="stat">
                      <Heart size={12} />
                      <span>{post.likes}</span>
                    </div>
                    <div className="stat">
                      <MessageSquare size={12} />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'circles' && (
            <div className="my-circles">
              {userInfo.circles.map((circle, index) => (
                <div key={index} className="circle-card">
                  <div className="circle-header">
                    <div className="circle-icon">🔵</div>
                    <div className="circle-info">
                      <div className="circle-name">{circle.name}</div>
                      <div className="circle-role">{circle.role}</div>
                    </div>
                    <div className="circle-status">
                      <span className={`status-badge ${circle.status === '활동중' ? 'active' : 'inactive'}`}>
                        {circle.status}
                      </span>
                    </div>
                  </div>
                  <div className="circle-details">
                    <div className="circle-join-date">
                      <Calendar size={12} />
                      <span>가입: {circle.joinDate}</span>
                    </div>
                  </div>
                  <div className="circle-actions">
                    <button className="circle-action-btn">
                      <MessageSquare size={14} />
                      <span>게시판</span>
                    </button>
                    <button className="circle-action-btn">
                      <Users size={14} />
                      <span>멤버</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="menu-section">
        <h3>설정</h3>
        <div className="menu-list">
          {menuItems.map((item, index) => (
            <div key={index} className="menu-item">
              <div className="menu-icon">
                <item.icon size={20} />
              </div>
              <div className="menu-content">
                <div className="menu-title">{item.title}</div>
                <div className="menu-subtitle">{item.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
