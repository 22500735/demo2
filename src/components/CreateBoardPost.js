import React, { useState } from 'react';
import { ArrowLeft, Image, X } from 'lucide-react';
import './CreateBoardPost.css';

const CreateBoardPost = ({ onBack, onCreatePost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [images, setImages] = useState([]);

  const categories = [
    { id: 'general', name: '자유게시판' },
    { id: 'academic', name: '학업' },
    { id: 'club', name: '동아리' },
    { id: 'dating', name: '소개팅' },
    { id: 'question', name: '질문' },
    { id: 'info', name: '정보' }
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages(prev => [...prev, event.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    
    if (!content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }

    const newPost = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      category,
      author: isAnonymous ? '익명' : '나',
      time: '방금 전',
      views: 0,
      replies: 0,
      images: images.length,
      isAnonymous
    };

    onCreatePost(newPost);
    alert('게시물이 작성되었습니다!');
    onBack();
  };

  return (
    <div className="create-board-post">
      <div className="create-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          <span>뒤로가기</span>
        </button>
        <h1>게시물 작성</h1>
        <button 
          className="submit-button"
          onClick={handleSubmit}
          disabled={!title.trim() || !content.trim()}
        >
          작성
        </button>
      </div>

      <form className="create-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <label>카테고리</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="form-section">
          <label>제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            className="title-input"
            maxLength={100}
          />
          <div className="char-count">{title.length}/100</div>
        </div>

        <div className="form-section">
          <label>내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            className="content-textarea"
            rows={10}
            maxLength={2000}
          />
          <div className="char-count">{content.length}/2000</div>
        </div>

        <div className="form-section">
          <label>이미지 첨부</label>
          <div className="image-upload-section">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="image-input"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="image-upload-button">
              <Image size={20} />
              <span>이미지 추가 ({images.length}/5)</span>
            </label>
          </div>
          
          {images.length > 0 && (
            <div className="image-preview">
              {images.map((image, index) => (
                <div key={index} className="preview-item">
                  <img src={image} alt={`미리보기 ${index + 1}`} />
                  <button 
                    type="button"
                    className="remove-image"
                    onClick={() => removeImage(index)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-section">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
            />
            <span>익명으로 작성</span>
          </label>
        </div>
      </form>
    </div>
  );
};

export default CreateBoardPost;
