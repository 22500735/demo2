import React, { useState } from 'react';
import { ArrowLeft, Image, X, MapPin, DollarSign } from 'lucide-react';
import './CreateMarketplaceItem.css';

const CreateMarketplaceItem = ({ onBack, onCreateItem }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('electronics');
  const [condition, setCondition] = useState('excellent');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState([]);
  const [isNegotiable, setIsNegotiable] = useState(false);

  const categories = [
    { id: 'electronics', name: '전자제품' },
    { id: 'books', name: '도서' },
    { id: 'clothing', name: '의류' },
    { id: 'furniture', name: '가구' },
    { id: 'sports', name: '스포츠' },
    { id: 'beauty', name: '뷰티' },
    { id: 'etc', name: '기타' }
  ];

  const conditions = [
    { id: 'new', name: '새상품' },
    { id: 'excellent', name: '최상' },
    { id: 'good', name: '상' },
    { id: 'fair', name: '중' },
    { id: 'poor', name: '하' }
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
      alert('상품명을 입력해주세요.');
      return;
    }
    
    if (!description.trim()) {
      alert('상품 설명을 입력해주세요.');
      return;
    }

    if (!price.trim()) {
      alert('가격을 입력해주세요.');
      return;
    }

    const priceValue = parseInt(price.replace(/,/g, ''));
    if (priceValue <= 0) {
      alert('가격은 0원보다 커야 합니다.');
      return;
    }

    if (!location.trim()) {
      alert('거래 지역을 입력해주세요.');
      return;
    }

    const newItem = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      price: parseInt(price.replace(/,/g, '')),
      category,
      condition,
      location: location.trim(),
      images: images.length,
      seller: '나',
      time: '방금 전',
      likes: 0,
      views: 0,
      isNegotiable,
      status: 'available'
    };

    onCreateItem(newItem);
    alert('상품이 등록되었습니다!');
    onBack();
  };

  const formatPrice = (value) => {
    const number = value.replace(/[^0-9]/g, '');
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handlePriceChange = (e) => {
    const formatted = formatPrice(e.target.value);
    setPrice(formatted);
  };

  return (
    <div className="create-marketplace-item">
      <div className="create-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          <span>뒤로가기</span>
        </button>
        <h1>상품 등록</h1>
        <button 
          className="submit-button"
          onClick={handleSubmit}
          disabled={!title.trim() || !description.trim() || !price.trim() || !location.trim()}
        >
          등록
        </button>
      </div>

      <form className="create-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <label>상품 이미지</label>
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
              <span>이미지 추가 ({images.length}/10)</span>
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
          <label>상품명</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="상품명을 입력하세요"
            className="title-input"
            maxLength={50}
          />
          <div className="char-count">{title.length}/50</div>
        </div>

        <div className="form-section">
          <label>상품 설명</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="상품에 대해 자세히 설명해주세요"
            className="description-textarea"
            rows={6}
            maxLength={1000}
          />
          <div className="char-count">{description.length}/1000</div>
        </div>

        <div className="form-section">
          <label>가격</label>
          <div className="price-input-container">
            <DollarSign size={20} className="price-icon" />
            <input
              type="text"
              value={price}
              onChange={handlePriceChange}
              placeholder="0"
              className="price-input"
            />
            <span className="currency">원</span>
          </div>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={isNegotiable}
              onChange={(e) => setIsNegotiable(e.target.checked)}
            />
            <span>가격 제안받기</span>
          </label>
        </div>

        <div className="form-section">
          <label>상품 상태</label>
          <div className="condition-options">
            {conditions.map(cond => (
              <button
                key={cond.id}
                type="button"
                className={`condition-option ${condition === cond.id ? 'active' : ''}`}
                onClick={() => setCondition(cond.id)}
              >
                {cond.name}
              </button>
            ))}
          </div>
        </div>

        <div className="form-section">
          <label>거래 지역</label>
          <div className="location-input-container">
            <MapPin size={20} className="location-icon" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="예: 서울시 강남구"
              className="location-input"
              maxLength={30}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateMarketplaceItem;
