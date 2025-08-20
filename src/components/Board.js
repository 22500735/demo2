import React, { useState } from 'react';
import { Search, Filter, Plus, TrendingUp, ShoppingBag, BookOpen, Users } from 'lucide-react';
import './Board.css';

const Board = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'すべて', icon: BookOpen },
    { id: 'marketplace', name: '中古取引', icon: ShoppingBag },
    { id: 'study', name: '学習', icon: BookOpen },
    { id: 'club', name: 'サークル', icon: Users },
    { id: 'trending', name: '人気', icon: TrendingUp }
  ];

  const boardPosts = [
    {
      id: 1,
      category: 'marketplace',
      title: '教科書売ります - 経済学入門',
      content: '春学期で使った経済学の教科書を売ります。書き込みはほとんどありません。定価3,200円→2,000円',
      author: '匿名',
      time: '30分前',
      replies: 3,
      views: 45,
      price: '¥2,000',
      images: 1
    },
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
      id: 4,
      category: 'marketplace',
      title: 'MacBook Air 売ります',
      content: '2022年モデル、M2チップ搭載。使用期間1年、傷なし美品です。箱・付属品完備。',
      author: '匿名',
      time: '3時間前',
      replies: 15,
      views: 156,
      price: '¥95,000',
      images: 4
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
  ];

  const filteredPosts = boardPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="board">
      <header className="board-header">
        <h1>掲示板・中古取引</h1>
        <div className="header-subtitle">みんなの情報交換</div>
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
        <button className="filter-button">
          <Filter size={20} />
        </button>
      </div>

      <div className="category-tabs">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <Icon size={16} />
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>

      <div className="posts-list">
        {filteredPosts.map((post) => (
          <div key={post.id} className="board-post">
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

      <button className="fab">
        <Plus size={24} />
      </button>
    </div>
  );
};

export default Board;
