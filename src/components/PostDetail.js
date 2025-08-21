import React, { useState } from 'react';
import { ArrowLeft, Heart, MessageCircle, Share, Bookmark, Send, MoreHorizontal } from 'lucide-react';
import './PostDetail.css';

const PostDetail = ({ post, onBack, onUpdatePost }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: '김민수',
      content: '정말 유용한 정보네요! 감사합니다 👍',
      time: '1시간 전',
      likes: 5,
      liked: false
    },
    {
      id: 2,
      author: '익명',
      content: '저도 같은 생각이에요. 도움이 많이 됐어요!',
      time: '2시간 전',
      likes: 3,
      liked: true
    },
    {
      id: 3,
      author: '박지영',
      content: '혹시 더 자세한 내용 알 수 있을까요?',
      time: '3시간 전',
      likes: 1,
      liked: false
    }
  ]);

  const handleLike = () => {
    onUpdatePost(post.id, {
      ...post,
      liked: !post.liked,
      likes: post.liked ? post.likes - 1 : post.likes + 1
    });
  };

  const handleSave = () => {
    onUpdatePost(post.id, {
      ...post,
      saved: !post.saved
    });
  };

  const handleShare = async () => {
    onUpdatePost(post.id, {
      ...post,
      shares: post.shares + 1
    });
    
    if (navigator.share) {
      try {
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

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: '나',
        content: newComment,
        time: '방금 전',
        likes: 0,
        liked: false
      };
      setComments([comment, ...comments]);
      setNewComment('');
      
      // 게시물 댓글 수 증가
      onUpdatePost(post.id, {
        ...post,
        comments: post.comments + 1
      });
    }
  };

  const handleCommentLike = (commentId) => {
    setComments(comments.map(comment =>
      comment.id === commentId
        ? {
            ...comment,
            liked: !comment.liked,
            likes: comment.liked ? comment.likes - 1 : comment.likes + 1
          }
        : comment
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
    <div className="post-detail">
      <div className="post-detail-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={24} />
        </button>
        <h1>게시물</h1>
        <button className="more-button">
          <MoreHorizontal size={24} />
        </button>
      </div>

      <div className="post-detail-content">
        <div className="post-detail-card">
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
                  <span className="post-time">{post.time}</span>
                  <span className="post-board">{post.board}</span>
                </div>
              </div>
            </div>
            <div className="post-category">{post.category}</div>
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
              onClick={handleLike}
            >
              <Heart size={20} fill={post.liked ? '#ff6b6b' : 'none'} />
              <span>{post.likes}</span>
            </button>
            
            <button className="action-button">
              <MessageCircle size={20} />
              <span>{post.comments}</span>
            </button>
            
            <button 
              className={`action-button ${post.saved ? 'saved' : ''}`}
              onClick={handleSave}
            >
              <Bookmark size={20} fill={post.saved ? '#4facfe' : 'none'} />
            </button>
            
            <button className="action-button" onClick={handleShare}>
              <Share size={20} />
              <span>{post.shares}</span>
            </button>
          </div>
        </div>

        <div className="comments-section">
          <h3>댓글 {comments.length}개</h3>
          
          <form className="comment-form" onSubmit={handleCommentSubmit}>
            <input
              type="text"
              placeholder="댓글을 입력하세요..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="comment-input"
            />
            <button type="submit" className="comment-submit">
              <Send size={20} />
            </button>
          </form>

          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-header">
                  <div className="comment-author">
                    <div className="comment-avatar">
                      {comment.author.charAt(0)}
                    </div>
                    <span className="comment-author-name">{comment.author}</span>
                    <span className="comment-time">{comment.time}</span>
                  </div>
                  <button 
                    className={`comment-like ${comment.liked ? 'liked' : ''}`}
                    onClick={() => handleCommentLike(comment.id)}
                  >
                    <Heart size={14} fill={comment.liked ? '#ff6b6b' : 'none'} />
                    <span>{comment.likes}</span>
                  </button>
                </div>
                <div className="comment-content">
                  {comment.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
