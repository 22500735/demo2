import React, { useState } from 'react';
import { Heart, Bookmark, MessageSquare, MessageCircle, User, Settings, Bell, HelpCircle, LogOut, Trophy, Star, Calendar, BookOpen, Users, ShoppingBag, MapPin, Phone, Mail, Edit, Camera, Upload, ArrowLeft } from 'lucide-react';
import PostDetail from './PostDetail';
import ClubDetail from './ClubDetail';
import './MyPage.css';

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('liked');
  const [showSettings, setShowSettings] = useState(false);

  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/80x80?text=김민수');
  const [currentView, setCurrentView] = useState('main'); // main, postDetail, settings, accountSettings, notificationSettings, helpCenter, clubDetail
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedClub, setSelectedClub] = useState(null);
  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    commentNotifications: true,
    likeNotifications: true,
    followNotifications: true,
    marketplaceNotifications: false
  });
  const [accountSettings, setAccountSettings] = useState({
    name: '김대학생',
    email: 'student@university.ac.jp',
    phone: '010-1234-5678',
    major: '컴퓨터공학과',
    year: '3학년',
    privacy: 'public' // public, friends, private
  });

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

  const handlePostClick = (post) => {
    // 게시물 데이터를 PostDetail 형식으로 변환
    const postDetailData = {
      id: post.id,
      content: post.title,
      author: '김대학생',
      time: post.timeAgo,
      likes: post.likes || 0,
      comments: post.comments || 0,
      shares: 0,
      category: post.category || '일반',
      images: []
    };
    setSelectedPost(postDetailData);
    setCurrentView('postDetail');
  };

  const handleBackToMain = () => {
    setCurrentView('main');
    setSelectedPost(null);
    setSelectedClub(null);
  };

  const handleClubClick = (circleName) => {
    // 동아리 데이터를 ClubDetail 형식으로 변환
    const clubData = {
      id: Math.random(),
      name: circleName,
      description: `${circleName}에서 다양한 활동을 진행하고 있습니다.`,
      category: '동아리',
      members: Math.floor(Math.random() * 200) + 50,
      posts: Math.floor(Math.random() * 100) + 20,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=100&h=100&fit=crop&crop=center',
      isFollowed: true,
      tags: ['활동', '모임', '친목']
    };
    setSelectedClub(clubData);
    setCurrentView('clubDetail');
  };

  const handleSettingsClick = (settingType) => {
    if (settingType === '로그아웃') {
      if (window.confirm('정말 로그아웃하시겠습니까?')) {
        alert('로그아웃되었습니다.');
        // 실제로는 여기서 로그아웃 로직 실행
      }
    } else if (settingType === '계정 설정') {
      setCurrentView('accountSettings');
    } else if (settingType === '알림 설정') {
      setCurrentView('notificationSettings');
    } else if (settingType === '고객센터') {
      setCurrentView('helpCenter');
    }
  };

  const handleNotificationChange = (key, value) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleAccountSettingsChange = (key, value) => {
    setAccountSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveAccountSettings = () => {
    // 입력 검증
    if (!accountSettings.name.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }
    
    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(accountSettings.email)) {
      alert('올바른 이메일 형식을 입력해주세요.');
      return;
    }
    
    // 전화번호 형식 검증 (숫자와 하이픈만 허용)
    const phoneRegex = /^[0-9-]+$/;
    if (!phoneRegex.test(accountSettings.phone)) {
      alert('올바른 전화번호 형식을 입력해주세요. (숫자와 하이픈만 사용)');
      return;
    }
    
    // 이름 검증 (한글, 영문, 숫자만 허용)
    const nameRegex = /^[가-힣a-zA-Z0-9\s]+$/;
    if (!nameRegex.test(accountSettings.name)) {
      alert('이름은 한글, 영문, 숫자만 입력 가능합니다.');
      return;
    }
    
    // 전공 검증
    if (!accountSettings.major) {
      alert('전공을 선택해주세요.');
      return;
    }
    
    // 프로필 정보 업데이트 (실제로는 서버에 저장)
    // setUserProfile(prev => ({
    //   ...prev,
    //   name: accountSettings.name,
    //   email: accountSettings.email,
    //   phone: accountSettings.phone,
    //   major: accountSettings.major,
    //   year: accountSettings.year
    // }));
    
    alert('계정 설정이 저장되었습니다.');
    setCurrentView('main');
  };

  const handleUpdatePost = (postId, updatedPost) => {
    setSelectedPost(updatedPost);
  };



  // 게시물 상세보기 뷰
  if (currentView === 'postDetail' && selectedPost) {
    return (
      <PostDetail 
        post={selectedPost}
        onBack={handleBackToMain}
        onUpdatePost={handleUpdatePost}
      />
    );
  }

  // 동아리 상세보기 뷰
  if (currentView === 'clubDetail' && selectedClub) {
    return (
      <ClubDetail 
        club={selectedClub}
        onBack={handleBackToMain}
      />
    );
  }

  // 계정 설정 뷰
  if (currentView === 'accountSettings') {
    return (
      <div className="mypage">
        <div className="settings-header">
          <button className="back-button" onClick={handleBackToMain}>
            <ArrowLeft size={20} />
            <span>뒤로가기</span>
          </button>
          <h1>계정 설정</h1>
        </div>

        <div className="settings-content">
          <div className="settings-section">
            <h3>기본 정보</h3>
            <div className="settings-form">
              <div className="form-group">
                <label>이름</label>
                <input 
                  type="text" 
                  value={accountSettings.name}
                  onChange={(e) => handleAccountSettingsChange('name', e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>이메일</label>
                <input 
                  type="email" 
                  value={accountSettings.email}
                  onChange={(e) => handleAccountSettingsChange('email', e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>전화번호</label>
                <input 
                  type="tel" 
                  value={accountSettings.phone}
                  onChange={(e) => handleAccountSettingsChange('phone', e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>전공</label>
                <select 
                  value={accountSettings.major}
                  onChange={(e) => handleAccountSettingsChange('major', e.target.value)}
                  className="form-select"
                >
                  <option value="">전공을 선택하세요</option>
                  <option value="컴퓨터공학과">컴퓨터공학과</option>
                  <option value="전자공학과">전자공학과</option>
                  <option value="기계공학과">기계공학과</option>
                  <option value="화학공학과">화학공학과</option>
                  <option value="건축학과">건축학과</option>
                  <option value="경영학과">경영학과</option>
                  <option value="경제학과">경제학과</option>
                  <option value="심리학과">심리학과</option>
                  <option value="영어영문학과">영어영문학과</option>
                  <option value="국어국문학과">국어국문학과</option>
                  <option value="수학과">수학과</option>
                  <option value="물리학과">물리학과</option>
                  <option value="화학과">화학과</option>
                  <option value="생물학과">생물학과</option>
                  <option value="의학과">의학과</option>
                  <option value="간호학과">간호학과</option>
                  <option value="약학과">약학과</option>
                  <option value="법학과">법학과</option>
                  <option value="교육학과">교육학과</option>
                  <option value="기타">기타</option>
                </select>
              </div>
              <div className="form-group">
                <label>학년</label>
                <select 
                  value={accountSettings.year}
                  onChange={(e) => handleAccountSettingsChange('year', e.target.value)}
                  className="form-select"
                >
                  <option value="1학년">1학년</option>
                  <option value="2학년">2학년</option>
                  <option value="3학년">3학년</option>
                  <option value="4학년">4학년</option>
                  <option value="대학원생">대학원생</option>
                </select>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h3>프라이버시</h3>
            <div className="privacy-options">
              <label className="radio-option">
                <input 
                  type="radio" 
                  name="privacy" 
                  value="public"
                  checked={accountSettings.privacy === 'public'}
                  onChange={(e) => handleAccountSettingsChange('privacy', e.target.value)}
                />
                <span>전체 공개</span>
                <small>모든 사용자가 내 프로필을 볼 수 있습니다</small>
              </label>
              <label className="radio-option">
                <input 
                  type="radio" 
                  name="privacy" 
                  value="friends"
                  checked={accountSettings.privacy === 'friends'}
                  onChange={(e) => handleAccountSettingsChange('privacy', e.target.value)}
                />
                <span>친구만</span>
                <small>팔로우하는 사용자만 내 프로필을 볼 수 있습니다</small>
              </label>
              <label className="radio-option">
                <input 
                  type="radio" 
                  name="privacy" 
                  value="private"
                  checked={accountSettings.privacy === 'private'}
                  onChange={(e) => handleAccountSettingsChange('privacy', e.target.value)}
                />
                <span>비공개</span>
                <small>나만 내 프로필을 볼 수 있습니다</small>
              </label>
            </div>
          </div>

          <div className="settings-actions">
            <button className="save-button" onClick={handleSaveAccountSettings}>
              저장하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 알림 설정 뷰
  if (currentView === 'notificationSettings') {
    return (
      <div className="mypage">
        <div className="settings-header">
          <button className="back-button" onClick={handleBackToMain}>
            <ArrowLeft size={20} />
            <span>뒤로가기</span>
          </button>
          <h1>알림 설정</h1>
        </div>

        <div className="settings-content">
          <div className="settings-section">
            <h3>푸시 알림</h3>
            <div className="notification-options">
              <div className="notification-item">
                <div className="notification-info">
                  <span>푸시 알림</span>
                  <small>앱 알림을 받습니다</small>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox"
                    checked={notificationSettings.pushNotifications}
                    onChange={(e) => handleNotificationChange('pushNotifications', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="notification-item">
                <div className="notification-info">
                  <span>이메일 알림</span>
                  <small>이메일로 알림을 받습니다</small>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox"
                    checked={notificationSettings.emailNotifications}
                    onChange={(e) => handleNotificationChange('emailNotifications', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h3>활동 알림</h3>
            <div className="notification-options">
              <div className="notification-item">
                <div className="notification-info">
                  <span>댓글 알림</span>
                  <small>내 게시물에 댓글이 달릴 때</small>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox"
                    checked={notificationSettings.commentNotifications}
                    onChange={(e) => handleNotificationChange('commentNotifications', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="notification-item">
                <div className="notification-info">
                  <span>좋아요 알림</span>
                  <small>내 게시물에 좋아요가 눌릴 때</small>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox"
                    checked={notificationSettings.likeNotifications}
                    onChange={(e) => handleNotificationChange('likeNotifications', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="notification-item">
                <div className="notification-info">
                  <span>팔로우 알림</span>
                  <small>새로운 팔로워가 생길 때</small>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox"
                    checked={notificationSettings.followNotifications}
                    onChange={(e) => handleNotificationChange('followNotifications', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="notification-item">
                <div className="notification-info">
                  <span>중고거래 알림</span>
                  <small>관심 상품에 대한 알림</small>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox"
                    checked={notificationSettings.marketplaceNotifications}
                    onChange={(e) => handleNotificationChange('marketplaceNotifications', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 고객센터 뷰
  if (currentView === 'helpCenter') {
    return (
      <div className="mypage">
        <div className="settings-header">
          <button className="back-button" onClick={handleBackToMain}>
            <ArrowLeft size={20} />
            <span>뒤로가기</span>
          </button>
          <h1>고객센터</h1>
        </div>

        <div className="settings-content">
          <div className="help-section">
            <h3>자주 묻는 질문</h3>
            <div className="faq-list">
              <div className="faq-item">
                <div className="faq-question">
                  <HelpCircle size={16} />
                  <span>계정을 삭제하고 싶어요</span>
                </div>
                <div className="faq-answer">
                  설정 &gt; 계정 설정에서 계정 삭제를 요청할 수 있습니다.
                </div>
              </div>
              <div className="faq-item">
                <div className="faq-question">
                  <HelpCircle size={16} />
                  <span>비밀번호를 잊어버렸어요</span>
                </div>
                <div className="faq-answer">
                  로그인 화면에서 '비밀번호 찾기'를 클릭하세요.
                </div>
              </div>
              <div className="faq-item">
                <div className="faq-question">
                  <HelpCircle size={16} />
                  <span>부적절한 게시물을 신고하고 싶어요</span>
                </div>
                <div className="faq-answer">
                  게시물 우측 상단의 메뉴에서 '신고하기'를 선택하세요.
                </div>
              </div>
            </div>
          </div>

          <div className="help-section">
            <h3>문의하기</h3>
            <div className="contact-options">
              <div className="contact-item">
                <Mail size={20} />
                <div className="contact-info">
                  <span>이메일 문의</span>
                  <small>support@university-app.com</small>
                </div>
              </div>
              <div className="contact-item">
                <Phone size={20} />
                <div className="contact-info">
                  <span>전화 문의</span>
                  <small>02-1234-5678 (평일 9시-18시)</small>
                </div>
              </div>
            </div>
          </div>

          <div className="help-section">
            <h3>앱 정보</h3>
            <div className="app-info">
              <div className="info-item">
                <span>버전</span>
                <span>1.2.3</span>
              </div>
              <div className="info-item">
                <span>최근 업데이트</span>
                <span>2024년 3월 15일</span>
              </div>
              <div className="info-item">
                <span>개발자</span>
                <span>University App Team</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mypage">
      <div className="profile-section">
        <div className="profile-header">
          <div className="profile-left">
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
          </div>
          <button 
            className="edit-profile-btn"
            onClick={() => setCurrentView('accountSettings')}
          >
            <Edit size={16} />
            <span>계정 설정</span>
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
                <div 
                  key={post.id} 
                  className="activity-item clickable"
                  onClick={() => handlePostClick(post)}
                >
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

          {activeTab === 'saved' && (
            <div className="saved-items">
              {savedItems.map(item => (
                <div 
                  key={item.id} 
                  className="saved-item clickable"
                  onClick={() => handlePostClick({
                    id: item.id,
                    title: item.title,
                    category: '중고거래',
                    timeAgo: item.timeAgo,
                    likes: 0,
                    comments: 0
                  })}
                >
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
                <div 
                  key={post.id} 
                  className="activity-item clickable"
                  onClick={() => handlePostClick(post)}
                >
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
                      <div 
                        className="circle-name clickable" 
                        onClick={() => handleClubClick(circle.name)}
                      >
                        {circle.name}
                      </div>
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
            <div 
              key={index} 
              className="menu-item clickable"
              onClick={() => handleSettingsClick(item.title)}
            >
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
