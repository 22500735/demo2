import React, { useState } from 'react';
import { ArrowLeft, Camera, MapPin, Hash, Users, X } from 'lucide-react';
import './CreatePost.css';

const CreatePost = ({ onBack, onCreatePost }) => {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('일상');
  const [board, setBoard] = useState('자유게시판');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [images, setImages] = useState([]);
  const [circles, setCircles] = useState([]);

  const categories = ['학업', '일상', '동아리', '취업', '연애', '기타'];
  const boards = ['자유게시판', '학업게시판', '동아리게시판', '취업게시판', '연애게시판', '기타게시판'];
  const availableCircles = ['프로그래밍동아리CODE', '맛집탐방동아리', '도서관스터디모임', '테니스동아리', '사진동아리'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }

    const newPost = {
      id: Date.now(),
      author: isAnonymous ? '익명' : '나',
      isAnonymous,
      time: '방금 전',
      content: content.trim(),
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
      saved: false,
      category,
      board,
      images: images,
      circles: circles
    };

    onCreatePost(newPost);
    onBack();
  };

  const handleImageAdd = () => {
    // 실제 구현에서는 파일 선택 다이얼로그를 열어야 함
    const imageUrl = `https://via.placeholder.com/400x300?text=새+이미지+${images.length + 1}`;
    setImages([...images, imageUrl]);
  };

  const handleImageRemove = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleCircleToggle = (circle) => {
    if (circles.includes(circle)) {
      setCircles(circles.filter(c => c !== circle));
    } else {
      setCircles([...circles, circle]);
    }
  };

  return (
    <div className="create-post">
      <div className="create-post-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={24} />
        </button>
        <h1>새 게시물</h1>
        <button 
          className="submit-button" 
          onClick={handleSubmit}
          disabled={!content.trim()}
        >
          게시
        </button>
      </div>

      <div className="create-post-content">
        <form onSubmit={handleSubmit}>
          {/* 카테고리 선택 */}
          <div className="form-section">
            <label className="form-label">카테고리</label>
            <div className="category-grid">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`category-chip ${category === cat ? 'active' : ''}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 게시판 선택 */}
          <div className="form-section">
            <label className="form-label">게시판</label>
            <select 
              value={board} 
              onChange={(e) => setBoard(e.target.value)}
              className="board-select"
            >
              {boards.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* 익명 설정 */}
          <div className="form-section">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
              />
              <span className="checkbox-text">익명으로 게시</span>
            </label>
          </div>

          {/* 내용 입력 */}
          <div className="form-section">
            <label className="form-label">내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="무슨 일이 일어나고 있나요?"
              className="content-textarea"
              rows={8}
            />
            <div className="character-count">
              {content.length}/1000
            </div>
          </div>

          {/* 이미지 첨부 */}
          <div className="form-section">
            <label className="form-label">이미지</label>
            <div className="image-section">
              <button
                type="button"
                className="add-image-button"
                onClick={handleImageAdd}
              >
                <Camera size={20} />
                이미지 추가
              </button>
              
              {images.length > 0 && (
                <div className="image-preview-grid">
                  {images.map((image, index) => (
                    <div key={index} className="image-preview">
                      <img src={image} alt={`미리보기 ${index + 1}`} />
                      <button
                        type="button"
                        className="remove-image"
                        onClick={() => handleImageRemove(index)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 서클 태그 */}
          <div className="form-section">
            <label className="form-label">
              <Users size={16} />
              서클 태그
            </label>
            <div className="circles-grid">
              {availableCircles.map((circle) => (
                <button
                  key={circle}
                  type="button"
                  className={`circle-chip ${circles.includes(circle) ? 'active' : ''}`}
                  onClick={() => handleCircleToggle(circle)}
                >
                  {circle}
                </button>
              ))}
            </div>
          </div>

          {/* 추가 기능 버튼들 */}
          <div className="form-section">
            <div className="additional-features">
              <button type="button" className="feature-button">
                <MapPin size={18} />
                위치 추가
              </button>
              <button type="button" className="feature-button">
                <Hash size={18} />
                해시태그
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
