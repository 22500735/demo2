import React, { useState } from 'react';
import { Heart, MessageCircle, Share, Bookmark, EyeOff, Filter, X, Plus, Search, UserPlus, UserCheck, Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import PostDetail from './PostDetail';
import CreatePost from './CreatePost';
import './MainFeed.css';

const MainFeed = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filterType, setFilterType] = useState('all'); // all, liked, saved, following
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [cardOffset, setCardOffset] = useState(0);
  const [followedUsers, setFollowedUsers] = useState(['김민수']);
  const [currentView, setCurrentView] = useState('main'); // main, postDetail, createPost
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([
    {
      id: 4,
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
      images: ['https://via.placeholder.com/400x250?text=이력서+템플릿', 'https://via.placeholder.com/400x300?text=면접+팁'],
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
      images: ['https://via.placeholder.com/300x200?text=학식메뉴'],
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
      images: ['https://via.placeholder.com/400x300?text=해커톤+포스터', 'https://via.placeholder.com/400x200?text=상금+안내'],
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
      images: ['https://via.placeholder.com/300x200?text=데이트장소'],
      circles: []
    },
    {
      id: 6,
      author: '匿名',
      isAnonymous: true,
      time: '1時間前',
      content: 'iPhone 13 Pro売ります！\n使用期間8ヶ月、傷なし美品です。\n定価12万→8万円で譲ります📱',
      likes: 34,
      comments: 18,
      shares: 4,
      liked: false,
      category: 'marketplace',
      board: '中古取引',
      price: '¥80,000'
    },
    {
      id: 7,
      author: '山田一郎',
      isAnonymous: false,
      time: '3時間前',
      content: '新宿のおすすめカフェ見つけた！☕️\n勉強スペースも広くてWiFi完備\n"Blue Bottle Coffee"めっちゃいい感じ✨',
      likes: 78,
      comments: 22,
      shares: 15,
      liked: true,
      category: 'location',
      board: '場所・お店'
    },
    {
      id: 8,
      author: '匿名',
      isAnonymous: true,
      time: '5時間前',
      content: 'テニスサークル新入部員募集中🎾\n初心者大歓迎！毎週土日に活動してます\n興味ある方はDMください〜',
      likes: 92,
      comments: 31,
      shares: 8,
      liked: false,
      category: 'club',
      board: 'サークル・部活'
    },
    {
      id: 9,
      author: '鈴木美咲',
      isAnonymous: false,
      time: '7時間前',
      content: 'TOEIC900点取れた！🎉\n3ヶ月間毎日2時間勉強した甲斐があった\n勉強法知りたい人いたら教えます📚',
      likes: 234,
      comments: 67,
      shares: 45,
      liked: true,
      category: 'study',
      board: '授業・学習'
    },
    {
      id: 10,
      author: '匿名',
      isAnonymous: true,
      time: '9時間前',
      content: '渋谷駅近くでバイト募集してる店知りませんか？\n週3〜4日、夕方から働ける所探してます💼\n情報お待ちしてます！',
      likes: 45,
      comments: 23,
      shares: 6,
      liked: false,
      category: 'job',
      board: 'バイト・就活'
    }
  ]);

  const categories = ['전체', '학업', '일상', '동아리', '취업', '연애', '기타'];

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

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleShare = async (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, shares: post.shares + 1 }
        : post
    ));
    
    // 실제 공유 기능
    if (navigator.share) {
      try {
        const post = posts.find(p => p.id === postId);
        await navigator.share({
          title: '게시물 공유',
          text: post.content,
          url: window.location.href
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          // 공유가 취소된 경우가 아닌 다른 오류일 때만 클립보드로 대체
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

  const toggleLikePost = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post
    ));
  };

  const toggleSavePost = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, saved: !post.saved } : post
    ));
  };

  // 드래그/터치 이벤트 핸들러
  const handleStart = (e) => {
    setIsDragging(true);
    const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    setStartX(clientX);
    setCurrentX(clientX);
  };

  const handleMove = (e) => {
    if (!isDragging) return;
    
    const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    setCurrentX(clientX);
    const diff = clientX - startX;
    setCardOffset(diff);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    const diff = currentX - startX;
    const threshold = 50; // 최소 드래그 거리
    
    if (Math.abs(diff) > threshold) {
      const maxIndex = slideContent[activeSlide].items.length - 1;
      
      if (diff > 0) {
        // 오른쪽으로 드래그 - 이전 카드
        setActiveCardIndex(activeCardIndex > 0 ? activeCardIndex - 1 : maxIndex);
      } else {
        // 왼쪽으로 드래그 - 다음 카드
        setActiveCardIndex(activeCardIndex < maxIndex ? activeCardIndex + 1 : 0);
      }
    }
    
    setCardOffset(0);
    setStartX(0);
    setCurrentX(0);
  };

  const filteredPosts = posts.filter(post => {
    // Search filter
    if (searchQuery && !post.content.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !post.author.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (selectedCategory !== '전체' && post.category !== selectedCategory) {
      return false;
    }
    
    // Type filter
    if (filterType === 'liked') return post.liked;
    if (filterType === 'saved') return post.saved;
    if (filterType === 'following') return followedUsers.includes(post.author);
    return true; // 'all'
  });

  // 현재 뷰에 따라 다른 컴포넌트 렌더링
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
    <div className="main-feed">
      <div className="header">
        <button 
          className="filter-menu-button"
          onClick={() => setShowFilterMenu(true)}
        >
          <Filter size={20} />
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

      {/* 가로 슬라이드 컨텐츠 */}
      <div className="slide-container">
        <div className="slide-header">
          {slideContent.map((slide, index) => (
            <button
              key={slide.id}
              className={`slide-tab ${activeSlide === index ? 'active' : ''}`}
              onClick={() => {
                setActiveSlide(index);
                setActiveCardIndex(0);
              }}
            >
              {slide.title}
            </button>
          ))}
        </div>
        <div className="slide-content">
          <div className="cards-scroll-container">
            {slideContent[activeSlide].title === '인기 댓글' && (
              <div className="cards-scroll">
                {slideContent[activeSlide].items.map((item, index) => (
                  <div key={index} className="comment-card">
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
                {slideContent[activeSlide].items.map((item, index) => (
                  <div key={index} className="hashtag-card">
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
                {slideContent[activeSlide].items.map((item, index) => (
                  <div key={index} className="circle-card">
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

      <div className="categories">
        {categories.map((category) => {
          const isActive = category === selectedCategory;
          return (
            <button
              key={category}
              className={`category-button ${isActive ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          );
        })}
      </div>
      
      <div className="posts-container">
        {filteredPosts.map((post) => (
          <div key={post.id} className="post-card" onClick={() => handlePostClick(post.id)}>
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
                  </div>
                  <div className="post-meta">
                    <span className="post-time">{post.time}</span>
                    <span className="post-board">{post.board}</span>
                    {post.circles && post.circles.length > 0 && (
                      <span className="post-circles">🔵 {post.circles[0]}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="post-header-actions">
                {!post.isAnonymous && (
                  <button 
                    className={`follow-button ${followedUsers.includes(post.author) ? 'following' : ''}`}
                    onClick={() => handleFollow(post.author)}
                  >
                    {followedUsers.includes(post.author) ? (
                      <UserCheck size={16} />
                    ) : (
                      <UserPlus size={16} />
                    )}
                  </button>
                )}
                <div className="post-category">{post.category}</div>
              </div>
            </div>
            
            <div className="post-content">
              {formatContent(post.content)}
            </div>

            {post.images && post.images.length > 0 && (
              <div className="post-images">
                {post.images.map((image, index) => (
                  <img key={index} src={image} alt="게시물 이미지" className="post-image" />
                ))}
              </div>
            )}
            
            <div className="post-actions">
              <button 
                className={`action-button ${post.liked ? 'liked' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLikePost(post.id);
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
                  toggleSavePost(post.id);
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

      {showFilterMenu && (
        <div className="filter-menu-overlay" onClick={() => setShowFilterMenu(false)}>
          <div className="filter-menu" onClick={(e) => e.stopPropagation()}>
            <div className="filter-menu-header">
              <h3>필터</h3>
              <button 
                className="close-button"
                onClick={() => setShowFilterMenu(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="filter-options">
              <button 
                className={`filter-option ${filterType === 'all' ? 'active' : ''}`}
                onClick={() => {
                  setFilterType('all');
                  setShowFilterMenu(false);
                }}
              >
                <div className="filter-icon">📋</div>
                <div className="filter-info">
                  <div className="filter-title">전체 게시물</div>
                  <div className="filter-subtitle">모든 게시물 보기</div>
                </div>
              </button>
              <button 
                className={`filter-option ${filterType === 'liked' ? 'active' : ''}`}
                onClick={() => {
                  setFilterType('liked');
                  setShowFilterMenu(false);
                }}
              >
                <div className="filter-icon">❤️</div>
                <div className="filter-info">
                  <div className="filter-title">좋아요한 게시물</div>
                  <div className="filter-subtitle">내가 좋아요한 글들</div>
                </div>
              </button>
              <button 
                className={`filter-option ${filterType === 'saved' ? 'active' : ''}`}
                onClick={() => {
                  setFilterType('saved');
                  setShowFilterMenu(false);
                }}
              >
                <div className="filter-icon">🔖</div>
                <div className="filter-info">
                  <div className="filter-title">저장한 게시물</div>
                  <div className="filter-subtitle">나중에 볼 글들</div>
                </div>
              </button>
              <button 
                className={`filter-option ${filterType === 'following' ? 'active' : ''}`}
                onClick={() => {
                  setFilterType('following');
                  setShowFilterMenu(false);
                }}
              >
                <div className="filter-icon">👥</div>
                <div className="filter-info">
                  <div className="filter-title">팔로잉 게시물</div>
                  <div className="filter-subtitle">팔로우한 사용자 글들</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <button className="floating-add-button" onClick={handleAddPost}>
        <Plus size={24} />
      </button>
    </div>
  );
};

export default MainFeed;
