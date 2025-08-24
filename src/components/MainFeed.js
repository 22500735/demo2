import React, { useState } from 'react';
import { Heart, MessageCircle, Share, Bookmark, EyeOff, User, X, Plus, Search, UserPlus, UserCheck, ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import PostDetail from './PostDetail';
import CreatePost from './CreatePost';
import './MainFeed.css';

const MainFeed = () => {


  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);
  const [followedUsers, setFollowedUsers] = useState(['김민수']);
  const [currentView, setCurrentView] = useState('main');
  const [selectedPost, setSelectedPost] = useState(null);
  const [imageIndices, setImageIndices] = useState({});
  const [activeTab, setActiveTab] = useState('recommended'); // 'recommended' or 'following'
  const [showSidebar, setShowSidebar] = useState(false);
  const [sharingPosts, setSharingPosts] = useState(new Set());

  // 모든 게시물을 합친 데이터
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: '이서준',
      isAnonymous: false,
      time: '6시간 전',
      content: '취업 준비하시는 분들! 이력서 첨삭 도와드려요 📝\n대기업 합격 경험 있어서 노하우 공유하고 싶어요\n댓글로 연락주세요~',
      likes: 89,
      comments: 34,
      shares: 21,
      liked: true,
      saved: false,
      category: '취업',
      board: '취업게시판',
      images: ['https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=400&fit=crop&crop=center', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center'],
      circles: []
    },
    {
      id: 2,
      author: '김민수',
      isAnonymous: false,
      time: '3시간 전',
      content: '학식 메뉴 추천해주세요! 오늘 뭐가 맛있나요?',
      likes: 15,
      comments: 12,
      shares: 1,
      liked: true,
      saved: false,
      category: '일상',
      board: '자유게시판',
      images: ['https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=400&fit=crop&crop=center'],
      circles: ['맛집탐방동아리']
    },
    {
      id: 3,
      author: '익명',
      isAnonymous: true,
      time: '5시간 전',
      content: '동아리 신입생 모집합니다!\n프로그래밍 동아리 CODE에서 함께할 신입생을 찾고 있어요.\n관심 있으신 분은 댓글 남겨주세요!',
      likes: 42,
      comments: 18,
      shares: 7,
      liked: false,
      saved: true,
      category: '동아리',
      board: '동아리게시판',
      images: ['https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=400&fit=crop&crop=center', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop&crop=center'],
      circles: ['프로그래밍동아리CODE']
    },
    {
      id: 4,
      author: '박지영',
      isAnonymous: false,
      time: '1일 전',
      content: '도서관 자리 있나요? 시험기간이라 너무 붐비네요 😭',
      likes: 31,
      comments: 6,
      shares: 0,
      liked: true,
      saved: true,
      category: '학업',
      board: '학업게시판',
      images: [],
      circles: ['도서관스터디모임']
    },
    {
      id: 5,
      author: '이수진',
      isAnonymous: false,
      time: '6시간 전',
      content: '오늘 데이트 어디가 좋을까요? 추천해주세요! 💕',
      likes: 28,
      comments: 15,
      shares: 3,
      liked: false,
      saved: false,
      category: '연애',
      board: '연애게시판',
      images: ['https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400&h=400&fit=crop&crop=center'],
      circles: []
    },
    {
      id: 6,
      author: '익명',
      isAnonymous: true,
      time: '2시간 전',
      content: 'iPhone 13 Pro 팝니다!\n사용기간 8개월, 긁힘 없이 깨끗합니다.\n정가 120만원→80만원으로 내려갑니다📱',
      likes: 34,
      comments: 18,
      shares: 4,
      liked: false,
      category: '마켓플레이스',
      board: '중고거래',
      images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center'],
      price: '80만원'
    },
    {
      id: 7,
      author: '김철수',
      isAnonymous: false,
      time: '4시간 전',
      content: '강남역 근처 맛집 발견했어요! ☕️\n공부공간도 넓고 WiFi 완비\n"Blue Bottle Coffee" 정말 좋아요✨',
      likes: 78,
      comments: 22,
      shares: 15,
      liked: true,
      category: '장소추천',
      board: '장소·맛집',
      images: ['https://images.unsplash.com/photo-1501339847302-ac426a4a7cce?w=400&h=400&fit=crop&crop=center']
    },
    {
      id: 8,
      author: '익명',
      isAnonymous: true,
      time: '1시간 전',
      content: '테니스 동아리 신입부원 모집중🎾\n초보자 대환영! 매주 토요일에 활동해요\n관심 있으시면 DM 주세요~',
      likes: 92,
      comments: 31,
      shares: 8,
      liked: false,
      category: '동아리',
      board: '동아리게시판',
      images: ['https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=400&fit=crop&crop=center']
    }
  ]);



  // 슬라이드 컨텐츠 (게시물 중간에 배치)
  const slideContent = [
    {
      id: 1,
      title: '인기 댓글',
      items: [
        { text: '시험 화이팅! 다들 잘 볼 거야 💪', likes: 45, author: '익명' },
        { text: '학식 짜장면 진짜 맛있어요!', likes: 32, author: '김민수' },
        { text: '동아리 활동 정말 재밌어요~', likes: 28, author: '익명' }
      ]
    },
    {
      id: 2,
      title: '트렌딩 해시태그',
      items: [
        { text: '#중간고사', count: 156 },
        { text: '#학식추천', count: 89 },
        { text: '#동아리모집', count: 67 }
      ]
    },
    {
      id: 3,
      title: '활발한 서클',
      items: [
        { name: '프로그래밍동아리CODE', members: 234, activity: '매우활발' },
        { name: '맛집탐방동아리', members: 189, activity: '활발' },
        { name: '도서관스터디모임', members: 156, activity: '활발' }
      ]
    }
  ];

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

  // 탭에 따른 게시물 필터링
  const getFilteredPosts = () => {
    let filtered = posts;
    
    // 탭에 따른 필터링
    if (activeTab === 'following') {
      filtered = filtered.filter(post => followedUsers.includes(post.author));
    }
    
    // 검색어 필터링
    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  // 사이드바 토글
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // 스와이프 이벤트 처리
  const handleTouchStart = (e) => {
    const touchStartX = e.touches[0].clientX;
    
    // 화면 왼쪽 끝에서 스와이프 시작
    if (touchStartX < 50) {
      let touchEndX = 0;
      
      const handleTouchEnd = (endEvent) => {
        touchEndX = endEvent.changedTouches[0].clientX;
        if (touchEndX - touchStartX > 50) { // 오른쪽으로 스와이프
          setShowSidebar(true);
        }
        document.removeEventListener('touchend', handleTouchEnd);
      };
      
      document.addEventListener('touchend', handleTouchEnd);
    }
  };

  // 탭 스와이프 이벤트 처리
  const handleTabTouchStart = (e) => {
    const touchStartX = e.touches[0].clientX;
    let touchEndX = 0;
    
    const handleTouchEnd = (endEvent) => {
      touchEndX = endEvent.changedTouches[0].clientX;
      const swipeDistance = touchStartX - touchEndX;
      
      if (Math.abs(swipeDistance) > 50) {
        if (swipeDistance > 0) {
          // 왼쪽으로 스와이프 -> 팔로우 중 탭으로
          setActiveTab('following');
        } else {
          // 오른쪽으로 스와이프 -> 추천 탭으로
          setActiveTab('recommended');
        }
      }
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchend', handleTouchEnd);
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleShare = async (postId) => {
    // 이미 공유 중인 게시물인지 확인
    if (sharingPosts.has(postId)) {
      return;
    }
    
    // 공유 중 상태로 설정
    setSharingPosts(prev => new Set([...prev, postId]));
    
    // 공유 카운트 증가
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, shares: post.shares + 1 }
        : post
    ));
    
    try {
      if (navigator.share) {
        const post = posts.find(p => p.id === postId);
        await navigator.share({
          title: '게시물 공유',
          text: post.content,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('링크가 클립보드에 복사되었습니다!');
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        await navigator.clipboard.writeText(window.location.href);
        alert('링크가 클립보드에 복사되었습니다!');
      }
    } finally {
      // 공유 완료 후 0.5초 뒤에 상태 해제 (중복 클릭 방지)
      setTimeout(() => {
        setSharingPosts(prev => {
          const newSet = new Set(prev);
          newSet.delete(postId);
          return newSet;
        });
      }, 500);
    }
  };

  const handlePostClick = (postId) => {
    const post = posts.find(p => p.id === postId);
    setSelectedPost(post);
    setCurrentView('postDetail');
  };

  const handleAddPost = () => {
    setCurrentView('createPost');
  };

  const handleBackToMain = () => {
    setCurrentView('main');
    setSelectedPost(null);
  };

  const handleCreatePost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleUpdatePost = (postId, updatedPost) => {
    setPosts(posts.map(post => 
      post.id === postId ? updatedPost : post
    ));
    setSelectedPost(updatedPost);
  };

  // 인스타그램 스타일 이미지 스크롤 함수
  const scrollToImage = (postId, imageIndex) => {
    const container = document.getElementById(`images-${postId}`);
    if (container) {
      const scrollPosition = imageIndex * container.clientWidth;
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      setImageIndices(prev => ({ ...prev, [postId]: imageIndex }));
    }
  };

  // 스크롤 이벤트로 현재 이미지 인덱스 업데이트
  const handleImageScroll = (postId) => {
    const container = document.getElementById(`images-${postId}`);
    if (container) {
      const scrollLeft = container.scrollLeft;
      const imageWidth = container.clientWidth;
      const currentIndex = Math.round(scrollLeft / imageWidth);
      setImageIndices(prev => ({ ...prev, [postId]: currentIndex }));
    }
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

  if (currentView === 'createPost') {
    return (
      <CreatePost 
        onBack={handleBackToMain}
        onCreatePost={handleCreatePost}
      />
    );
  }

  return (
    <div className="main-feed" onTouchStart={handleTouchStart}>
      {/* 고정된 헤더 */}
      <div className="fixed-header">
        <div className="header">
          <button 
            className="profile-button"
            onClick={toggleSidebar}
          >
            <Menu size={20} />
          </button>
          <div className="header-content">
            <h1>홈</h1>
          </div>
          <button 
            className="search-button"
            onClick={() => setShowSearch(!showSearch)}
          >
            <Search size={20} />
          </button>
        </div>

        {showSearch && (
          <div className="search-bar">
            <input
              type="text"
              placeholder="게시물, 사용자 검색..."
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
        )}

        {/* 탭 바 */}
        <div className="tab-bar" onTouchStart={handleTabTouchStart}>
          <button 
            className={`tab-button ${activeTab === 'recommended' ? 'active' : ''}`}
            onClick={() => setActiveTab('recommended')}
          >
            추천
          </button>
          <button 
            className={`tab-button ${activeTab === 'following' ? 'active' : ''}`}
            onClick={() => setActiveTab('following')}
          >
            팔로우 중
          </button>
          <div className="tab-indicator" style={{ transform: `translateX(${activeTab === 'following' ? '100%' : '0%'})` }}></div>
        </div>


      </div>

      {/* 스크롤 가능한 컨텐츠 영역 */}
      <div className="scrollable-content">
        {/* 게시물 목록 */}
        <div className="posts-container">
          {getFilteredPosts().map((post, index) => (
            <React.Fragment key={post.id}>
              <div className="post-card" onClick={() => handlePostClick(post.id)}>
                <div className="post-header">
                  <div className="author-info">
                    <div className="avatar">
                      {post.isAnonymous ? (
                        <EyeOff size={16} />
                      ) : (
                        <div className="avatar-text">
                          {post.author.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="author-details">
                      <div className="author-name">
                        {post.isAnonymous ? '익명' : post.author}
                        {post.isAnonymous && <span className="anonymous-badge">익명</span>}
                      </div>
                      <div className="post-meta">
                        <span className="board-tag">{post.board}</span>
                        <span className="post-time">{post.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="post-header-right">
                    {post.price && <span className="price-tag">{post.price}</span>}
                    <div className="post-header-actions">
                      {!post.isAnonymous && (
                        <button 
                          className={`follow-button ${followedUsers.includes(post.author) ? 'following' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFollow(post.author);
                          }}
                        >
                          {followedUsers.includes(post.author) ? (
                            <UserCheck size={16} />
                          ) : (
                            <UserPlus size={16} />
                          )}
                        </button>
                      )}

                    </div>
                  </div>
                </div>
                
                <div className="post-content">
                  {formatContent(post.content)}
                </div>

                {post.images && post.images.length > 0 && (
                  <div className="post-images-slider">
                    <div 
                      className="images-container" 
                      id={`images-${post.id}`}
                      onScroll={() => handleImageScroll(post.id)}
                    >
                      {post.images.map((image, imgIndex) => (
                        <img 
                          key={imgIndex} 
                          src={image} 
                          alt="게시물 이미지" 
                          className="post-image"
                        />
                      ))}
                    </div>
                    {post.images.length > 1 && (
                      <div className="image-indicators">
                        {post.images.map((_, imgIndex) => {
                          const currentIndex = imageIndices[post.id] || 0;
                          return (
                            <div 
                              key={imgIndex} 
                              className={`image-indicator ${imgIndex === currentIndex ? 'active' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                scrollToImage(post.id, imgIndex);
                              }}
                            />
                          );
                        })}
                      </div>
                    )}
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

              {/* 3번째와 6번째 게시물 후에 슬라이드 컨텐츠 삽입 */}
              {(index === 2 || index === 5) && (
                <div className="slide-container">
                  <div className="slide-header">
                    {slideContent.map((slide, slideIndex) => (
                      <button
                        key={slide.id}
                        className={`slide-tab ${activeSlide === slideIndex ? 'active' : ''}`}
                        onClick={() => setActiveSlide(slideIndex)}
                      >
                        {slide.title}
                      </button>
                    ))}
                  </div>
                  <div className="slide-content">
                    <div className="cards-scroll-container">
                      {slideContent[activeSlide].title === '인기 댓글' && (
                        <div className="cards-scroll">
                          {slideContent[activeSlide].items.map((item, cardIndex) => (
                            <div key={cardIndex} className="comment-card">
                              <div className="comment-text">{item.text}</div>
                              <div className="comment-meta">
                                <span className="comment-author">{item.author}</span>
                                <span className="comment-likes">❤️ {item.likes}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {slideContent[activeSlide].title === '트렌딩 해시태그' && (
                        <div className="cards-scroll">
                          {slideContent[activeSlide].items.map((item, cardIndex) => (
                            <div 
                              key={cardIndex} 
                              className="hashtag-card"
                              onClick={() => {
                                setSearchQuery(item.text.replace('#', ''));
                                setShowSearch(true);
                              }}
                            >
                              <div className="hashtag-main">
                                <span className="hashtag">{item.text}</span>
                              </div>
                              <div className="hashtag-info">
                                <span className="hashtag-count">{item.count}개 게시물</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {slideContent[activeSlide].title === '활발한 서클' && (
                        <div className="cards-scroll">
                          {slideContent[activeSlide].items.map((item, cardIndex) => (
                            <div key={cardIndex} className="circle-card">
                              <div className="circle-name">{item.name}</div>
                              <div className="circle-info">
                                <span className="circle-members">{item.members}명</span>
                                <span className="circle-activity">{item.activity}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>



      {/* 사이드바 */}
      <div className={`sidebar ${showSidebar ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>메뉴</h3>
          <button className="close-sidebar" onClick={toggleSidebar}>
            <X size={20} />
          </button>
        </div>
        <div className="sidebar-content">
          <div className="sidebar-section">
            <h4>서클 & 동아리</h4>
            <div className="sidebar-items">
              <button className="sidebar-item">
                <div className="sidebar-icon">🎭</div>
                <span>연극동아리</span>
              </button>
              <button className="sidebar-item">
                <div className="sidebar-icon">💻</div>
                <span>프로그래밍동아리</span>
              </button>
              <button className="sidebar-item">
                <div className="sidebar-icon">🎵</div>
                <span>밴드동아리</span>
              </button>
              <button className="sidebar-item">
                <div className="sidebar-icon">📚</div>
                <span>독서동아리</span>
              </button>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h4>기능</h4>
            <div className="sidebar-items">
              <button className="sidebar-item">
                <div className="sidebar-icon">📊</div>
                <span>통계</span>
              </button>
              <button className="sidebar-item">
                <div className="sidebar-icon">⚙️</div>
                <span>설정</span>
              </button>
              <button className="sidebar-item">
                <div className="sidebar-icon">🔔</div>
                <span>알림 설정</span>
              </button>
              <button className="sidebar-item">
                <div className="sidebar-icon">❓</div>
                <span>도움말</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 사이드바 오버레이 */}
      {showSidebar && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      {/* 플로팅 추가 버튼 */}
      <button className="floating-add-button" onClick={handleAddPost}>
        <Plus size={24} />
      </button>
    </div>
  );
};

export default MainFeed;
