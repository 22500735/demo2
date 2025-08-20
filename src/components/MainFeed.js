import React, { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, Eye, EyeOff } from 'lucide-react';
import './MainFeed.css';

const MainFeed = () => {
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
      board: 'サークル・部活'
    }
  ]);

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
      
      <div className="posts-container">
        {posts.map((post) => (
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
              <button className="more-button">
                <MoreHorizontal size={20} />
              </button>
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
