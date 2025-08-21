import React, { useState } from 'react';
import { Heart, MessageCircle, Share, Bookmark, EyeOff, Filter, X, Plus, Search, UserPlus, UserCheck, Camera } from 'lucide-react';
import './MainFeed.css';

const MainFeed = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filterType, setFilterType] = useState('all'); // all, liked, saved, following
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);
  const [followedUsers, setFollowedUsers] = useState(['김민수']);
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: '익명',
      isAnonymous: true,
      time: '2시간 전',
      content: '오늘 중간고사 어땠어요? 저는 완전 망한 것 같아요 ㅠㅠ\n특히 미적분학이 너무 어려웠어요...',
      likes: 23,
      comments: 8,
      shares: 2,
      liked: false,
      saved: false,
      category: '학업',
      board: '학업게시판',
      images: [],
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
      images: ['https://via.placeholder.com/300x200?text=CODE동아리'],
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

  const handleSave = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, saved: !post.saved }
        : post
    ));
  };

  const filteredPosts = posts.filter(post => {
    // Search filter
    if (searchQuery && !post.content.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !post.author.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Type filter
    if (filterType === 'liked') return post.liked;
    if (filterType === 'saved') return post.saved;
    if (filterType === 'following') return followedUsers.includes(post.author);
    return true; // 'all'
  });

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
              onClick={() => setActiveSlide(index)}
            >
              {slide.title}
            </button>
          ))}
        </div>
        <div className="slide-content">
          {slideContent[activeSlide].title === '인기 댓글' && (
            <div className="popular-comments">
              {slideContent[activeSlide].items.map((comment, index) => (
                <div key={index} className="comment-item">
                  <div className="comment-text">{comment.text}</div>
                  <div className="comment-meta">
                    <span className="comment-author">{comment.author}</span>
                    <span className="comment-likes">❤️ {comment.likes}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {slideContent[activeSlide].title === '트렌딩 해시태그' && (
            <div className="trending-hashtags">
              {slideContent[activeSlide].items.map((tag, index) => (
                <div key={index} className="hashtag-item">
                  <span className="hashtag">{tag.text}</span>
                  <span className="hashtag-count">{tag.count}개 게시물</span>
                </div>
              ))}
            </div>
          )}
          {slideContent[activeSlide].title === '활발한 서클' && (
            <div className="active-circles">
              {slideContent[activeSlide].items.map((circle, index) => (
                <div key={index} className="circle-item">
                  <div className="circle-name">{circle.name}</div>
                  <div className="circle-info">
                    <span className="circle-members">{circle.members}명</span>
                    <span className="circle-activity">{circle.activity}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="categories">
        {categories.map((category) => {
          const isActive = category === '전체';
          return (
            <button
              key={category}
              className={`category-button ${isActive ? 'active' : ''}`}
            >
              {category}
            </button>
          );
        })}
      </div>
      
      <div className="posts-container">
        {filteredPosts.map((post) => (
          <div key={post.id} className="post-card">
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
                onClick={() => handleLike(post.id)}
              >
                <Heart size={18} fill={post.liked ? '#ff6b6b' : 'none'} />
                <span>{post.likes}</span>
              </button>
              
              <button className="action-button">
                <MessageCircle size={18} />
                <span>{post.comments}</span>
              </button>
              
              <button 
                className={`action-button ${post.saved ? 'saved' : ''}`}
                onClick={() => handleSave(post.id)}
              >
                <Bookmark size={18} fill={post.saved ? '#4facfe' : 'none'} />
              </button>
              
              <button className="action-button">
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

      <button className="floating-add-button">
        <Plus size={24} />
      </button>
    </div>
  );
};

export default MainFeed;
