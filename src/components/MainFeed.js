import React, { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, Eye, EyeOff, BookOpen, ShoppingBag, MapPin, Users, Coffee, Briefcase } from 'lucide-react';
import './MainFeed.css';

const MainFeed = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: '匿名',
      isAnonymous: true,
      time: '2時間前',
      content: '今日の授業、めちゃくちゃ難しかった😭\n数学の先生の説明が早すぎて全然ついていけない...',
      likes: 23,
      comments: 8,
      shares: 2,
      liked: false,
      category: 'study',
      board: '授業・学習'
    },
    {
      id: 2,
      author: '田中太郎',
      isAnonymous: false,
      time: '4時間前',
      content: '学食の新メニュー食べてみた！\nカレーうどんがめっちゃ美味しい🍜✨\nみんなも試してみて〜',
      likes: 45,
      comments: 12,
      shares: 5,
      liked: true,
      category: 'food',
      board: 'グルメ'
    },
    {
      id: 3,
      author: '匿名',
      isAnonymous: true,
      time: '6時間前',
      content: 'バイト先の先輩がすごく優しくて助かってる😊\n最初は不安だったけど、だんだん慣れてきた！\n新人の皆さん、頑張りましょう💪',
      likes: 67,
      comments: 15,
      shares: 3,
      liked: false,
      category: 'job',
      board: 'バイト・就活'
    },
    {
      id: 4,
      author: '匿名',
      isAnonymous: true,
      time: '8時間前',
      content: '図書館で勉強してたら、隣の人のタイピング音がうるさすぎる...\n集中できない😤\nマナーを守ってほしい',
      likes: 89,
      comments: 34,
      shares: 7,
      liked: true,
      category: 'campus',
      board: '大学生活'
    },
    {
      id: 5,
      author: '佐藤花子',
      isAnonymous: false,
      time: '10時間前',
      content: 'サークルの新歓イベント、すごく楽しかった！🎉\n新入生の皆さん、ぜひ遊びに来てください〜\n写真部でお待ちしてます📸',
      likes: 156,
      comments: 28,
      shares: 12,
      liked: false,
      category: 'club',
      board: 'サークル・部活'
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

  const categories = [
    { id: 'all', name: 'すべて', icon: BookOpen, color: '#667eea' },
    { id: 'study', name: '学習', icon: BookOpen, color: '#4facfe' },
    { id: 'food', name: 'グルメ', icon: Coffee, color: '#ff6b6b' },
    { id: 'job', name: 'バイト', icon: Briefcase, color: '#feca57' },
    { id: 'club', name: 'サークル', icon: Users, color: '#48cae4' },
    { id: 'marketplace', name: '中古取引', icon: ShoppingBag, color: '#2ecc71' },
    { id: 'location', name: '場所', icon: MapPin, color: '#9b59b6' },
    { id: 'campus', name: 'キャンパス', icon: BookOpen, color: '#e67e22' }
  ];

  const filteredPosts = posts.filter(post => 
    selectedCategory === 'all' || post.category === selectedCategory
  );

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked, 
            likes: post.liked ? post.likes - 1 : post.likes + 1 
          }
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

  return (
    <div className="main-feed">
      <header className="feed-header">
        <h1>キャンパスライフ</h1>
        <div className="header-subtitle">みんなの声</div>
      </header>

      <div className="category-filter">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              className={`category-chip ${selectedCategory === category.id ? 'active' : ''}`}
              style={{
                backgroundColor: selectedCategory === category.id ? category.color : 'transparent',
                borderColor: category.color,
                color: selectedCategory === category.id ? 'white' : category.color
              }}
              onClick={() => setSelectedCategory(category.id)}
            >
              <Icon size={14} />
              <span>{category.name}</span>
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
                    {post.author}
                    {post.isAnonymous && (
                      <span className="anonymous-badge">匿名</span>
                    )}
                  </div>
                  <div className="post-meta">
                    <span className="board-tag">{post.board}</span>
                    <span className="post-time">{post.time}</span>
                  </div>
                </div>
              </div>
              <div className="post-header-right">
                {post.price && (
                  <div className="price-tag">{post.price}</div>
                )}
                <button className="more-button">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>
            
            <div className="post-content">
              {formatContent(post.content)}
            </div>
            
            <div className="post-actions">
              <button 
                className={`action-button ${post.liked ? 'liked' : ''}`}
                onClick={() => handleLike(post.id)}
              >
                <Heart size={18} fill={post.liked ? '#e91e63' : 'none'} />
                <span>{post.likes}</span>
              </button>
              
              <button className="action-button">
                <MessageCircle size={18} />
                <span>{post.comments}</span>
              </button>
              
              <button className="action-button">
                <Share size={18} />
                <span>{post.shares}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainFeed;
