import React, { useState } from 'react';
import { Heart, MessageCircle, Share, Bookmark, EyeOff, X, Plus, Search, UserPlus, UserCheck, MoreVertical, Bell, BellOff } from 'lucide-react';
import PostDetail from './PostDetail';
import CreatePost from './CreatePost';
import './RecommendedFeed.css';

const RecommendedFeed = () => {
  const [currentView, setCurrentView] = useState('main');
  const [selectedPost, setSelectedPost] = useState(null);
  const [followedUsers, setFollowedUsers] = useState(['김민수', '이서준', '박지영']);
  const [subscribedChannels, setSubscribedChannels] = useState(['프로그래밍동아리CODE', '맛집탐방동아리', '도서관스터디모임']);
  const [notifications, setNotifications] = useState({});

  // 팔로우한 사용자들의 게시물 (유튜브 구독 스타일)
  const [followedPosts, setFollowedPosts] = useState([
    {
      id: 1,
      author: '김민수',
      isAnonymous: false,
      time: '30분 전',
      content: '오늘 학식이 정말 맛있네요! 🍚\n모든 분들께 추천드려요~',
      likes: 24,
      comments: 8,
      shares: 2,
      liked: false,
      saved: false,
      category: '일상',
      board: '자유게시판',
      images: ['https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=200&fit=crop&crop=center'],
      isNew: true
    },
    {
      id: 2,
      author: '이서준',
      isAnonymous: false,
      time: '1시간 전',
      content: '취업 면접 팁 공유드려요! 💼\n준비하면서 느낀 점들을 정리해봤습니다.\n\n1. 자기소개는 간결하고 명확하게\n2. 회사에 대한 충분한 조사\n3. 질문 리스트 미리 준비',
      likes: 89,
      comments: 34,
      shares: 21,
      liked: true,
      saved: true,
      category: '취업',
      board: '취업게시판',
      images: ['https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=250&fit=crop&crop=center'],
      isNew: true
    },
    {
      id: 3,
      author: '박지영',
      isAnonymous: false,
      time: '2시간 전',
      content: '도서관에서 열심히 공부 중입니다 📚\n시험 기간이라 정말 바쁘네요.\n모두 화이팅해요!',
      likes: 45,
      comments: 12,
      shares: 3,
      liked: false,
      saved: false,
      category: '학업',
      board: '학업게시판',
      images: [],
      isNew: false
    }
  ]);

  // 추천 채널/동아리
  const [recommendedChannels, setRecommendedChannels] = useState([
    {
      id: 1,
      name: '테니스동아리',
      members: 156,
      description: '매주 토요일 테니스 활동',
      image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=100&h=100&fit=crop&crop=center',
      recentPosts: 12,
      category: '스포츠'
    },
    {
      id: 2,
      name: '사진동아리',
      members: 203,
      description: '캠퍼스 곳곳을 담아요',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=100&h=100&fit=crop&crop=center',
      recentPosts: 8,
      category: '예술'
    },
    {
      id: 3,
      name: '창업동아리',
      members: 89,
      description: '함께 꿈을 키워나가요',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&h=100&fit=crop&crop=center',
      recentPosts: 15,
      category: '창업'
    }
  ]);

  const formatContent = (content) => {
    return content.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const handleFollow = (username) => {
    setFollowedUsers(prev => 
      prev.includes(username) 
        ? prev.filter(user => user !== username)
        : [...prev, username]
    );
  };

  const handleSubscribe = (channelName) => {
    setSubscribedChannels(prev => 
      prev.includes(channelName) 
        ? prev.filter(channel => channel !== channelName)
        : [...prev, channelName]
    );
  };

  const handleNotification = (username) => {
    setNotifications(prev => ({
      ...prev,
      [username]: !prev[username]
    }));
  };

  const handleLike = (postId) => {
    setFollowedPosts(posts => posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleShare = async (postId) => {
    setFollowedPosts(posts => posts.map(post => 
      post.id === postId 
        ? { ...post, shares: post.shares + 1 }
        : post
    ));
    
    if (navigator.share) {
      try {
        const post = followedPosts.find(p => p.id === postId);
        await navigator.share({
          title: '게시물 공유',
          text: post.content,
          url: window.location.href
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          navigator.clipboard.writeText(window.location.href);
          alert('링크가 클립보드에 복사되었습니다!');
        }
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('링크가 클립보드에 복사되었습니다!');
    }
  };

  const handlePostClick = (postId) => {
    const post = followedPosts.find(p => p.id === postId);
    setSelectedPost(post);
    setCurrentView('postDetail');
  };

  const handleBackToMain = () => {
    setCurrentView('main');
    setSelectedPost(null);
  };

  const handleUpdatePost = (postId, updatedPost) => {
    setFollowedPosts(posts => posts.map(post => 
      post.id === postId ? updatedPost : post
    ));
    setSelectedPost(updatedPost);
  };

  if (currentView === 'postDetail' && selectedPost) {
    return (
      <PostDetail 
        post={selectedPost}
        onBack={handleBackToMain}
        onUpdatePost={handleUpdatePost}
      />
    );
  }

  return (
    <div className="recommended-feed">
      {/* 고정된 헤더 */}
      <div className="recommended-header">
        <div className="header">
          <div className="header-content">
            <h1>구독</h1>
            <p className="header-subtitle">팔로우한 사용자들의 최신 소식</p>
          </div>
        </div>
      </div>

      {/* 스크롤 가능한 컨텐츠 영역 */}
      <div className="scrollable-content">
        
        {/* 팔로우한 사용자 목록 */}
        <div className="following-users-section">
          <h3 className="section-title">팔로우 중인 사용자</h3>
          <div className="following-users">
            {followedUsers.map((username, index) => (
              <div key={index} className="following-user-card">
                <div className="user-avatar">
                  <div className="avatar-text">{username.charAt(0)}</div>
                </div>
                <div className="user-info">
                  <div className="username">{username}</div>
                  <div className="user-status">활동 중</div>
                </div>
                <div className="user-actions">
                  <button 
                    className={`notification-button ${notifications[username] ? 'active' : ''}`}
                    onClick={() => handleNotification(username)}
                  >
                    {notifications[username] ? <Bell size={16} /> : <BellOff size={16} />}
                  </button>
                  <button 
                    className="unfollow-button"
                    onClick={() => handleFollow(username)}
                  >
                    팔로잉
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 최신 게시물 */}
        <div className="posts-section">
          <h3 className="section-title">최신 게시물</h3>
          <div className="posts-container">
            {followedPosts.map((post) => (
              <div key={post.id} className="post-card" onClick={() => handlePostClick(post.id)}>
                {post.isNew && <div className="new-badge">NEW</div>}
                
                <div className="post-header">
                  <div className="author-info">
                    <div className="avatar">
                      <div className="avatar-text">
                        {post.author.charAt(0)}
                      </div>
                    </div>
                    <div className="author-details">
                      <div className="author-name">{post.author}</div>
                      <div className="post-meta">
                        <span className="board-tag">{post.board}</span>
                        <span className="post-time">{post.time}</span>
                      </div>
                    </div>
                  </div>
                  <button className="more-button">
                    <MoreVertical size={16} />
                  </button>
                </div>
                
                <div className="post-content">
                  {formatContent(post.content)}
                </div>

                {post.images && post.images.length > 0 && (
                  <div className="post-images">
                    {post.images.map((image, imgIndex) => (
                      <img 
                        key={imgIndex} 
                        src={image} 
                        alt="게시물 이미지" 
                        className="post-image"
                      />
                    ))}
                  </div>
                )}
                
                <div className="post-actions">
                  <button 
                    className={`action-button ${post.liked ? 'liked' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(post.id);
                    }}
                  >
                    <Heart size={18} fill={post.liked ? '#ff6b6b' : 'none'} />
                    <span>{post.likes}</span>
                  </button>
                  
                  <button 
                    className="action-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePostClick(post.id);
                    }}
                  >
                    <MessageCircle size={18} />
                    <span>{post.comments}</span>
                  </button>
                  
                  <button 
                    className={`action-button ${post.saved ? 'saved' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      // 저장 기능 구현
                    }}
                  >
                    <Bookmark size={18} fill={post.saved ? '#4facfe' : 'none'} />
                  </button>
                  
                  <button 
                    className="action-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(post.id);
                    }}
                  >
                    <Share size={18} />
                    <span>{post.shares}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 추천 채널 */}
        <div className="recommended-channels-section">
          <h3 className="section-title">추천 동아리</h3>
          <div className="recommended-channels">
            {recommendedChannels.map((channel) => (
              <div key={channel.id} className="channel-card">
                <div className="channel-image">
                  <img src={channel.image} alt={channel.name} />
                </div>
                <div className="channel-info">
                  <div className="channel-name">{channel.name}</div>
                  <div className="channel-description">{channel.description}</div>
                  <div className="channel-stats">
                    <span className="members">{channel.members}명</span>
                    <span className="recent-posts">최근 {channel.recentPosts}개 게시물</span>
                  </div>
                </div>
                <button 
                  className={`subscribe-button ${subscribedChannels.includes(channel.name) ? 'subscribed' : ''}`}
                  onClick={() => handleSubscribe(channel.name)}
                >
                  {subscribedChannels.includes(channel.name) ? '구독중' : '구독'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedFeed;
