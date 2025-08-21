import React, { useState } from 'react';
import { Search, Filter, Plus, Heart, MessageCircle, Eye, ShoppingBag } from 'lucide-react';
import CreateBoardPost from './CreateBoardPost';
import './Board.css';

const Board = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [currentView, setCurrentView] = useState('main');
  const [posts, setPosts] = useState([
    {
      id: 2,
      category: 'study',
      title: '数学の勉強会メンバー募集',
      content: '線形代数が苦手な人で一緒に勉強しませんか？毎週土曜日の午後、図書館で開催予定です。',
      author: '田中',
      time: '1時間前',
      replies: 8,
      views: 67,
      price: null,
      images: 0
    },
    {
      id: 3,
      category: 'club',
      title: '写真部 新入部員大募集！',
      content: '写真が好きな方、カメラに興味がある方大歓迎！初心者でも大丈夫です。機材の貸し出しもあります📸',
      author: '写真部部長',
      time: '2時間前',
      replies: 12,
      views: 89,
      price: null,
      images: 3
    },
    {
      id: 5,
      category: 'study',
      title: 'TOEIC対策 一緒にやりませんか？',
      content: '来月のTOEICに向けて勉強仲間を探しています。目標スコア700点以上の方、お声かけください！',
      author: '匿名',
      time: '4時間前',
      replies: 6,
      views: 78,
      price: null,
      images: 0
    }
  ]);

  const categories = [
    { id: 'all', name: '전체' },
    { id: 'general', name: '자유게시판' },
    { id: 'academic', name: '학업' },
    { id: 'club', name: '동아리' },
    { id: 'dating', name: '소개팅' },
    { id: 'question', name: '질문' },
    { id: 'info', name: '정보' }
  ];

  const handleCreatePost = (newPost) => {
    setPosts(prev => [newPost, ...prev]);
  };

  const handleBackToMain = () => {
    setCurrentView('main');
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.views - a.views;
      case 'replies':
        return b.replies - a.replies;
      case 'latest':
      default:
        return new Date(b.time) - new Date(a.time);
    }
  });

  if (currentView === 'create') {
    return (
      <CreateBoardPost 
        onBack={handleBackToMain}
        onCreatePost={handleCreatePost}
      />
    );
  }

  return (
    <div className="board">
      <header className="board-header">
        <h1>게시판</h1>
        <div className="header-subtitle">자유로운 소통 공간</div>
      </header>

      <div className="search-section">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="投稿を検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-container">
          <button 
            className="filter-button"
            onClick={() => setShowSortMenu(!showSortMenu)}
          >
            <Filter size={20} />
          </button>
          {showSortMenu && (
            <div className="sort-menu">
              <button 
                className={`sort-option ${sortBy === 'latest' ? 'active' : ''}`}
                onClick={() => {setSortBy('latest'); setShowSortMenu(false);}}
              >
                최신순
              </button>
              <button 
                className={`sort-option ${sortBy === 'popular' ? 'active' : ''}`}
                onClick={() => {setSortBy('popular'); setShowSortMenu(false);}}
              >
                인기순
              </button>
              <button 
                className={`sort-option ${sortBy === 'replies' ? 'active' : ''}`}
                onClick={() => {setSortBy('replies'); setShowSortMenu(false);}}
              >
                댓글순
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="category-tabs">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      <div className="posts-list">
        {filteredPosts.map((post) => (
          <div 
            key={post.id} 
            className="board-post"
            onClick={() => {
              // 게시물 상세보기로 이동
              alert(`"${post.title}" 게시물 상세보기 (구현 예정)`);
            }}
            style={{ cursor: 'pointer' }}
          >
            <div className="post-header">
              <div className="category-badge">
                {categories.find(cat => cat.id === post.category)?.name}
              </div>
              {post.price && (
                <div className="price-tag">{post.price}</div>
              )}
            </div>
            
            <h3 className="post-title">{post.title}</h3>
            <p className="post-preview">{post.content}</p>
            
            <div className="post-meta">
              <div className="author-time">
                <span className="author">{post.author}</span>
                <span className="time">{post.time}</span>
              </div>
              <div className="post-stats">
                <span className="stat">👁 {post.views}</span>
                <span className="stat">💬 {post.replies}</span>
                {post.images > 0 && (
                  <span className="stat">📷 {post.images}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        className="fab"
        onClick={() => setCurrentView('create')}
      >
        <Plus size={24} />
      </button>
    </div>
  );
};

export default Board;
