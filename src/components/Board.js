import React, { useState } from 'react';
import { ArrowLeft, Search, Plus, Bookmark, ThumbsUp, MessageCircle, Eye, MoreHorizontal, X, List, Edit3, Users, TrendingUp } from 'lucide-react';
import CreatePost from './CreatePost';
import ClubDetail from './ClubDetail';
import './Board.css';

const Board = () => {
  const [currentView, setCurrentView] = useState('main'); // 'main', 'createPost', 'club', 'clubDetail'
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [selectedClub, setSelectedClub] = useState(null);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('latest');
  const [followedClubs, setFollowedClubs] = useState(['프로그래밍동아리', '독서동아리']);

  // 게시판 데이터
  const boards = [
    { id: 1, name: '자유게시판', description: '자유롭게 소통하는 공간', icon: '💬', posts: 1234, members: 5678 },
    { id: 2, name: '학업게시판', description: '학업 관련 정보 공유', icon: '📚', posts: 567, members: 2345 },
    { id: 3, name: '취업게시판', description: '취업 정보와 경험 공유', icon: '💼', posts: 890, members: 3456 },
    { id: 4, name: '연애게시판', description: '연애 고민과 이야기', icon: '💕', posts: 456, members: 1789 },
    { id: 5, name: '동아리게시판', description: '동아리 활동과 모집', icon: '🎭', posts: 234, members: 987, isClub: true },
    { id: 6, name: '장터게시판', description: '중고거래와 나눔', icon: '🛒', posts: 678, members: 2134 }
  ];

  // 동아리 데이터
  const clubs = [
    {
      id: 1,
      name: '프로그래밍동아리',
      description: '개발과 코딩을 사랑하는 사람들',
      category: '학술',
      members: 156,
      posts: 89,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=100&h=100&fit=crop&crop=center',
      isFollowed: true,
      tags: ['개발', 'IT', '프로그래밍']
    },
    {
      id: 2,
      name: '독서동아리',
      description: '책을 통해 세상을 보는 모임',
      category: '문화',
      members: 89,
      posts: 145,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=100&fit=crop&crop=center',
      isFollowed: true,
      tags: ['독서', '토론', '문학']
    },
    {
      id: 3,
      name: '사진동아리',
      description: '렌즈로 담는 아름다운 순간들',
      category: '예술',
      members: 234,
      posts: 567,
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=100&h=100&fit=crop&crop=center',
      isFollowed: false,
      tags: ['사진', '촬영', '예술']
    },
    {
      id: 4,
      name: '음악동아리',
      description: '음악으로 하나되는 우리',
      category: '예술',
      members: 178,
      posts: 234,
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop&crop=center',
      isFollowed: false,
      tags: ['음악', '공연', '밴드']
    }
  ];

  // 게시물 데이터
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: '새학기 스터디 그룹 모집합니다!',
      content: '알고리즘 스터디 함께 하실 분들 구해요. 매주 화, 목 저녁에 만나서 문제 풀이하고 토론해요.',
      author: '코딩마스터',
      board: '학업게시판',
      createdAt: '2024-01-15T10:30:00',
      likes: 23,
      comments: 8,
      views: 156,
      isLiked: false,
      isBookmarked: false,
      tags: ['스터디', '알고리즘', '프로그래밍']
    },
    {
      id: 2,
      title: '중고 맥북 판매합니다',
      content: 'MacBook Pro 13인치 2021년 모델입니다. 상태 양호하고 보호필름, 케이스 포함해서 드려요.',
      author: '애플러버',
      board: '장터게시판',
      createdAt: '2024-01-15T09:15:00',
      likes: 45,
      comments: 12,
      views: 289,
      isLiked: true,
      isBookmarked: true,
      tags: ['중고거래', '맥북', '노트북']
    },
    {
      id: 3,
      title: '프로그래밍동아리 정기모임 안내',
      content: '이번 주 토요일 오후 2시에 정기모임이 있습니다. 새로운 프로젝트 아이디어도 함께 논의해요!',
      author: '동아리회장',
      board: '동아리게시판',
      club: '프로그래밍동아리',
      createdAt: '2024-01-15T08:45:00',
      likes: 67,
      comments: 15,
      views: 234,
      isLiked: false,
      isBookmarked: false,
      tags: ['정기모임', '프로젝트']
    }
  ]);

  const handleBoardClick = (board) => {
    if (board.isClub) {
      setCurrentView('club');
    } else {
      setSelectedBoard(board);
      setCurrentView('board');
    }
  };

  const handleClubClick = (club) => {
    setSelectedClub(club);
    setCurrentView('clubDetail');
  };

  const handleFollow = (clubId) => {
    setFollowedClubs(prev => {
      const clubName = clubs.find(c => c.id === clubId)?.name;
      if (clubName) {
        return prev.includes(clubName) 
          ? prev.filter(name => name !== clubName)
          : [...prev, clubName];
      }
      return prev;
    });
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleBookmark = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  };

  const handleCreatePost = (newPost) => {
    const post = {
      ...newPost,
      id: Date.now(),
      author: '사용자',
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      views: 0,
      isLiked: false,
      isBookmarked: false,
      board: selectedBoard?.name || selectedClub?.name || '자유게시판'
    };
    setPosts(prevPosts => [post, ...prevPosts]);
    setCurrentView('main');
  };

  const filteredPosts = posts.filter(post => {
    if (selectedBoard && post.board !== selectedBoard.name) return false;
    if (selectedClub && post.club !== selectedClub.name) return false;
    if (searchQuery && !post.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !post.content.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    return `${diffDays}일 전`;
  };

  if (currentView === 'createPost') {
    return (
      <CreatePost 
        onBack={() => setCurrentView('main')}
        board={selectedBoard}
        club={selectedClub}
        onCreatePost={handleCreatePost}
      />
    );
  }

  // 동아리 목록 뷰
  if (currentView === 'club') {
    return (
      <div className="board-container">
        <div className="board-header">
          <div className="header-content">
            <div className="header-top-row">
              <button className="back-button" onClick={() => setCurrentView('main')}>
                <ArrowLeft size={20} />
              </button>
              <h1>동아리</h1>
              <button className="search-toggle" onClick={() => setSearchQuery('')}>
                <Search size={20} />
              </button>
            </div>
          </div>
          
          <div className="search-container">
            <input
              type="text"
              placeholder="동아리 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="content">
          <div className="clubs-grid">
            {clubs.filter(club => 
              club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              club.description.toLowerCase().includes(searchQuery.toLowerCase())
            ).map(club => (
              <div key={club.id} className="club-card" onClick={() => handleClubClick(club)}>
                <div className="club-image">
                  <img src={club.image} alt={club.name} />
                </div>
                <div className="club-info">
                  <div className="club-header">
                    <h3 className="club-name">{club.name}</h3>
                    <button 
                      className={`follow-button ${followedClubs.includes(club.name) ? 'following' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFollow(club.id);
                      }}
                    >
                      {followedClubs.includes(club.name) ? '팔로잉' : '팔로우'}
                    </button>
                  </div>
                  <p className="club-description">{club.description}</p>
                  <div className="club-tags">
                    {club.tags.map(tag => (
                      <span key={tag} className="tag">#{tag}</span>
                    ))}
                  </div>
                  <div className="club-stats">
                    <span><Users size={14} /> {club.members}</span>
                    <span><Edit3 size={14} /> {club.posts}</span>
                    <span className="category">{club.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 동아리 상세 뷰
  if (currentView === 'clubDetail' && selectedClub) {
    return (
      <ClubDetail 
        club={selectedClub}
        onBack={() => setCurrentView('club')}
      />
    );
  }

  // Temporary backup of old clubDetail view
  if (currentView === 'oldClubDetail' && selectedClub) {
    return (
      <div className="board-container">
        <div className="board-header">
          <div className="header-content">
            <button className="back-button" onClick={() => setCurrentView('club')}>
              <ArrowLeft size={20} />
            </button>
            <h1>{selectedClub.name}</h1>
            <button className="write-button" onClick={() => setCurrentView('createPost')}>
              <Plus size={16} />
              글쓰기
            </button>
          </div>
        </div>

        <div className="content">
          <div className="club-detail-header">
            <div className="club-detail-info">
              <img src={selectedClub.image} alt={selectedClub.name} className="club-detail-image" />
              <div className="club-detail-text">
                <h2>{selectedClub.name}</h2>
                <p>{selectedClub.description}</p>
                <div className="club-detail-stats">
                  <span><Users size={16} /> 멤버 {selectedClub.members}</span>
                  <span><Edit3 size={16} /> 게시물 {selectedClub.posts}</span>
                </div>
              </div>
            </div>
            <button 
              className={`follow-button large ${followedClubs.includes(selectedClub.name) ? 'following' : ''}`}
              onClick={() => handleFollow(selectedClub.id)}
            >
              {followedClubs.includes(selectedClub.name) ? '팔로잉' : '팔로우'}
            </button>
          </div>

          <div className="posts-section">
            <h3>게시물</h3>
            <div className="posts-list">
              {filteredPosts.map(post => (
                <div key={post.id} className="post-card">
                  <div className="post-header">
                    <div className="post-author">
                      <div className="author-avatar">{post.author.charAt(0)}</div>
                      <div className="author-info">
                        <span className="author-name">{post.author}</span>
                        <span className="post-time">{formatDate(post.createdAt)}</span>
                      </div>
                    </div>
                    <button className="more-button">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                  
                  <div className="post-content">
                    <h4 className="post-title">{post.title}</h4>
                    <p className="post-text">{post.content}</p>
                    {post.tags && (
                      <div className="post-tags">
                        {post.tags.map(tag => (
                          <span key={tag} className="tag">#{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="post-actions">
                    <button 
                      className={`action-button ${post.isLiked ? 'liked' : ''}`}
                      onClick={() => handleLike(post.id)}
                    >
                      <ThumbsUp size={16} />
                      <span>{post.likes}</span>
                    </button>
                    <button className="action-button">
                      <MessageCircle size={16} />
                      <span>{post.comments}</span>
                    </button>
                    <button className="action-button">
                      <Eye size={16} />
                      <span>{post.views}</span>
                    </button>
                    <button 
                      className={`action-button ${post.isBookmarked ? 'bookmarked' : ''}`}
                      onClick={() => handleBookmark(post.id)}
                    >
                      <Bookmark size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 개별 게시판 뷰
  if (currentView === 'board' && selectedBoard) {
    return (
      <div className="board-container">
        <div className="board-header">
          <div className="header-content">
            <div className="header-top-row">
              <button className="back-button" onClick={() => setCurrentView('main')}>
                <ArrowLeft size={20} />
              </button>
              <h1>{selectedBoard.name}</h1>
              <div className="header-spacer"></div>
            </div>
            <div className="header-actions">
              <button className="write-button" onClick={() => setCurrentView('createPost')}>
                <Plus size={16} />
                글쓰기
              </button>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="posts-list">
            {filteredPosts.map(post => (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <div className="post-author">
                    <div className="author-avatar">{post.author.charAt(0)}</div>
                    <div className="author-info">
                      <span className="author-name">{post.author}</span>
                      <span className="post-time">{formatDate(post.createdAt)}</span>
                    </div>
                  </div>
                  <button className="more-button">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
                
                <div className="post-content">
                  <h4 className="post-title">{post.title}</h4>
                  <p className="post-text">{post.content}</p>
                  {post.tags && (
                    <div className="post-tags">
                      {post.tags.map(tag => (
                        <span key={tag} className="tag">#{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="post-actions">
                  <button 
                    className={`action-button ${post.isLiked ? 'liked' : ''}`}
                    onClick={() => handleLike(post.id)}
                  >
                    <ThumbsUp size={16} />
                    <span>{post.likes}</span>
                  </button>
                  <button className="action-button">
                    <MessageCircle size={16} />
                    <span>{post.comments}</span>
                  </button>
                  <button className="action-button">
                    <Eye size={16} />
                    <span>{post.views}</span>
                  </button>
                  <button 
                    className={`action-button ${post.isBookmarked ? 'bookmarked' : ''}`}
                    onClick={() => handleBookmark(post.id)}
                  >
                    <Bookmark size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 메인 게시판 목록 뷰
  return (
    <div className="board-container">
      <div className="board-header">
        <div className="header-content">
          <h1>게시판</h1>
          <div className="header-actions">
            <button className="search-toggle">
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="boards-grid">
          {boards.map(board => (
            <div key={board.id} className="board-card" onClick={() => handleBoardClick(board)}>
              <div className="board-icon">{board.icon}</div>
              <div className="board-info">
                <h3 className="board-name">{board.name}</h3>
                <p className="board-description">{board.description}</p>
                <div className="board-stats">
                  <span>게시물 {board.posts.toLocaleString()}</span>
                  <span>멤버 {board.members.toLocaleString()}</span>
                </div>
              </div>
              {board.isClub && (
                <div className="board-badge">
                  <Users size={14} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="popular-posts">
          <h3>인기 게시물</h3>
          <div className="posts-preview">
            {posts.slice(0, 3).map(post => (
              <div key={post.id} className="post-preview">
                <h4>{post.title}</h4>
                <div className="post-preview-stats">
                  <span>{post.board}</span>
                  <span>👍 {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;