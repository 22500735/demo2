import React, { useState } from 'react';
import { ArrowLeft, Bell, BellOff, Users, Calendar, MessageCircle, ThumbsUp, Share, Eye, Hash, MapPin, Clock, User, Plus, Search, Filter } from 'lucide-react';
import './ClubDetail.css';

const ClubDetail = ({ club, onBack }) => {
  const [isSubscribed, setIsSubscribed] = useState(club?.isFollowed || false);
  const [notifications, setNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: '신입생 환영회 참석 안내',
      content: '안녕하세요! 프로그래밍동아리 신입생 환영회가 다음 주 금요일에 있습니다.\n\n날짜: 3월 15일 금요일\n시간: 오후 6시\n장소: 학생회관 2층 세미나실\n\n많은 참석 부탁드립니다!',
      author: '동아리회장',
      time: '2시간 전',
      likes: 23,
      comments: 8,
      views: 156,
      isOfficial: true,
      images: 1
    },
    {
      id: 2,
      title: '프로젝트 팀원 모집',
      content: '웹 개발 프로젝트를 진행할 팀원을 모집합니다.\n\n기술 스택:\n- React\n- Node.js\n- MongoDB\n\n관심 있으신 분은 댓글로 연락주세요!',
      author: '김개발',
      time: '1일 전',
      likes: 15,
      comments: 12,
      views: 89,
      isOfficial: false,
      images: 0
    },
    {
      id: 3,
      title: '코딩 테스트 스터디 모집',
      content: '알고리즘 문제 해결 능력 향상을 위한 스터디를 진행합니다.\n\n매주 토요일 오후 2시\n난이도: 초급~중급\n인원: 4-6명',
      author: '박알고',
      time: '3일 전',
      likes: 31,
      comments: 18,
      views: 234,
      isOfficial: false,
      images: 0
    }
  ]);

  const [members] = useState([
    {
      id: 1,
      name: '김회장',
      role: '회장',
      major: '컴퓨터공학과',
      year: '4학년',
      avatar: 'https://via.placeholder.com/40x40?text=김',
      joinDate: '2022-03-01',
      isOnline: true
    },
    {
      id: 2,
      name: '이부회장',
      role: '부회장',
      major: '소프트웨어학과',
      year: '3학년',
      avatar: 'https://via.placeholder.com/40x40?text=이',
      joinDate: '2022-03-01',
      isOnline: false
    },
    {
      id: 3,
      name: '박총무',
      role: '총무',
      major: '정보통신학과',
      year: '3학년',
      avatar: 'https://via.placeholder.com/40x40?text=박',
      joinDate: '2022-09-01',
      isOnline: true
    }
  ]);

  const [events] = useState([
    {
      id: 1,
      title: '신입생 환영회',
      date: '2024-03-15',
      time: '18:00',
      location: '학생회관 2층',
      type: 'official'
    },
    {
      id: 2,
      title: '해커톤 대회',
      date: '2024-03-22',
      time: '09:00',
      location: '공학관 컴퓨터실',
      type: 'activity'
    },
    {
      id: 3,
      title: '정기 모임',
      date: '2024-03-29',
      time: '19:00',
      location: '학과 세미나실',
      type: 'meeting'
    }
  ]);

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    if (!isSubscribed) {
      alert(`${club.name}을(를) 구독했습니다!`);
    }
  };

  const handleNotificationToggle = () => {
    if (!isSubscribed) {
      alert('구독 후 알림을 설정할 수 있습니다.');
      return;
    }
    setNotifications(!notifications);
  };

  const handleLike = (postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const formatContent = (content) => {
    return content.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  if (!club) {
    return (
      <div className="club-detail">
        <div className="club-detail-header">
          <button className="back-button" onClick={onBack}>
            <ArrowLeft size={20} />
            <span>뒤로가기</span>
          </button>
        </div>
        <div className="error-message">
          <p>동아리 정보를 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="club-detail">
      {/* 헤더 */}
      <div className="club-detail-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          <span>뒤로가기</span>
        </button>
      </div>

      {/* 동아리 정보 */}
      <div className="club-info-section">
        <div className="club-banner">
          <img 
            src={club.image || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=200&fit=crop'} 
            alt={club.name}
            className="club-banner-image"
          />
        </div>
        
        <div className="club-main-info">
          <div className="club-avatar">
            <img 
              src={club.image || 'https://via.placeholder.com/80x80?text=동아리'} 
              alt={club.name}
              className="club-avatar-image"
            />
          </div>
          
          <div className="club-details">
            <h1 className="club-name">{club.name}</h1>
            <p className="club-description">{club.description}</p>
            
            <div className="club-stats">
              <div className="stat-item">
                <Users size={16} />
                <span>{club.members}명</span>
              </div>
              <div className="stat-item">
                <MessageCircle size={16} />
                <span>{club.posts}개 게시물</span>
              </div>
              <div className="stat-item">
                <Hash size={16} />
                <span>{club.category}</span>
              </div>
            </div>

            {club.tags && (
              <div className="club-tags">
                {club.tags.map((tag, index) => (
                  <span key={index} className="tag">#{tag}</span>
                ))}
              </div>
            )}
          </div>
          
          <div className="club-actions">
            <button 
              className={`subscribe-btn ${isSubscribed ? 'subscribed' : ''}`}
              onClick={handleSubscribe}
            >
              {isSubscribed ? '구독중' : '구독하기'}
            </button>
            
            <button 
              className={`notification-btn ${notifications ? 'active' : ''} ${!isSubscribed ? 'disabled' : ''}`}
              onClick={handleNotificationToggle}
            >
              {notifications ? <Bell size={20} /> : <BellOff size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="club-tabs">
        <button 
          className={`tab-button ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          <MessageCircle size={16} />
          <span>게시물</span>
        </button>
        <button 
          className={`tab-button ${activeTab === 'members' ? 'active' : ''}`}
          onClick={() => setActiveTab('members')}
        >
          <Users size={16} />
          <span>멤버</span>
        </button>
        <button 
          className={`tab-button ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          <Calendar size={16} />
          <span>일정</span>
        </button>
      </div>

      {/* 탭 콘텐츠 */}
      <div className="club-content">
        {activeTab === 'posts' && (
          <div className="posts-section">
            <div className="posts-header">
              <h3>동아리 게시물</h3>
              <div className="posts-controls">
                <button className="filter-btn">
                  <Filter size={16} />
                  <span>최신순</span>
                </button>
                <button className="search-btn">
                  <Search size={16} />
                </button>
              </div>
            </div>
            
            <div className="posts-list">
              {posts.map(post => (
                <div key={post.id} className="post-card">
                  <div className="post-header">
                    <div className="post-author">
                      <div className="author-avatar">
                        <User size={16} />
                      </div>
                      <div className="author-info">
                        <span className="author-name">{post.author}</span>
                        {post.isOfficial && <span className="official-badge">공식</span>}
                        <span className="post-time">{post.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="post-content">
                    <h4 className="post-title">{post.title}</h4>
                    <p className="post-text">{formatContent(post.content)}</p>
                    {post.images > 0 && (
                      <div className="post-images">
                        <div className="image-placeholder">
                          📷 이미지 {post.images}개
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="post-actions">
                    <button 
                      className="action-btn like-btn"
                      onClick={() => handleLike(post.id)}
                    >
                      <ThumbsUp size={16} />
                      <span>{post.likes}</span>
                    </button>
                    <button className="action-btn comment-btn">
                      <MessageCircle size={16} />
                      <span>{post.comments}</span>
                    </button>
                    <button className="action-btn share-btn">
                      <Share size={16} />
                    </button>
                    <div className="post-views">
                      <Eye size={14} />
                      <span>{post.views}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="members-section">
            <div className="members-header">
              <h3>멤버 ({members.length}명)</h3>
            </div>
            
            <div className="members-list">
              {members.map(member => (
                <div key={member.id} className="member-card">
                  <div className="member-avatar">
                    <img src={member.avatar} alt={member.name} />
                    {member.isOnline && <div className="online-indicator"></div>}
                  </div>
                  
                  <div className="member-info">
                    <div className="member-name">{member.name}</div>
                    <div className="member-role">{member.role}</div>
                    <div className="member-details">
                      <span>{member.major}</span>
                      <span>•</span>
                      <span>{member.year}</span>
                    </div>
                    <div className="member-join-date">
                      가입일: {new Date(member.joinDate).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="member-actions">
                    <button className="message-btn">
                      <MessageCircle size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="events-section">
            <div className="events-header">
              <h3>동아리 일정</h3>
              <button className="add-event-btn">
                <Plus size={16} />
                <span>일정 추가</span>
              </button>
            </div>
            
            <div className="events-list">
              {events.map(event => (
                <div key={event.id} className="event-card">
                  <div className="event-type-indicator">
                    <div className={`type-dot ${event.type}`}></div>
                  </div>
                  
                  <div className="event-info">
                    <h4 className="event-title">{event.title}</h4>
                    <div className="event-details">
                      <div className="event-datetime">
                        <Calendar size={14} />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                        <Clock size={14} />
                        <span>{event.time}</span>
                      </div>
                      <div className="event-location">
                        <MapPin size={14} />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="event-actions">
                    <button className="interested-btn">관심</button>
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

export default ClubDetail;
