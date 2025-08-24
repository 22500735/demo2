import React, { useState } from 'react';
import { Search, Filter, Plus, Heart, MapPin, Eye, MessageCircle, Clock, X, User } from 'lucide-react';
import CreateMarketplaceItem from './CreateMarketplaceItem';
import SellerProfile from './SellerProfile';
import './Marketplace.css';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [likedItems, setLikedItems] = useState(new Set());
  const [currentView, setCurrentView] = useState('main'); // 'main', 'wishlist', 'create', 'sellerProfile'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [items, setItems] = useState([
    {
      id: 1,
      title: 'iPhone 13 Pro 128GB',
      price: 850000,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
      category: 'electronics',
      location: '신촌',
      time: '2시간 전',
      likes: 15,
      comments: 3,
      views: 127,
      condition: '상급',
      seller: '김학생',
      department: '컴퓨터공학과',
      description: '작년에 구입한 아이폰입니다. 케이스 끼고 사용해서 상태 좋아요!',
      status: 'available'
    },
    {
      id: 2,
      title: '맥북 프로 13인치 M1',
      price: 1200000,
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=300&fit=crop',
      category: 'electronics',
      location: '홍대',
      time: '5시간 전',
      likes: 23,
      comments: 5,
      views: 189,
      condition: '최상',
      seller: '박학생',
      department: '경영학과',
      description: '거의 새것같은 맥북입니다. 학업용으로만 사용했어요.',
      status: 'available'
    },
    {
      id: 3,
      title: '경영학원론 교재',
      price: 15000,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=300&fit=crop',
      category: 'books',
      location: '이대',
      time: '1일 전',
      likes: 8,
      comments: 2,
      views: 67,
      condition: '상급',
      seller: '이학생',
      department: '경영학과',
      description: '이번 학기 사용한 교재입니다. 필기 조금 있어요.',
      status: 'available'
    }
  ]);

  const categories = [
    { id: 'all', name: '전체', color: '#667eea' },
    { id: 'electronics', name: '전자기기', color: '#4facfe' },
    { id: 'books', name: '교재/도서', color: '#43e97b' },
    { id: 'clothing', name: '의류', color: '#fa709a' },
    { id: 'furniture', name: '가구/생활', color: '#fd79a8' },
    { id: 'sports', name: '스포츠', color: '#fdcb6e' },
    { id: 'beauty', name: '뷰티', color: '#e17055' },
    { id: 'etc', name: '기타', color: '#a29bfe' }
  ];

  const products = [
    {
      id: 1,
      title: 'iPhone 13 Pro 128GB',
      price: 850000,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
      category: 'electronics',
      location: '신촌',
      timeAgo: '2시간 전',
      likes: 15,
      comments: 3,
      views: 127,
      condition: '상급',
      seller: '김학생',
      description: '작년에 구입한 아이폰입니다. 케이스 끼고 사용해서 상태 좋아요!'
    },
    {
      id: 2,
      title: '미적분학 교재 (새책)',
      price: 25000,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=300&fit=crop',
      category: 'books',
      location: '대학로',
      timeAgo: '5시간 전',
      likes: 8,
      comments: 1,
      views: 89,
      condition: '새상품',
      seller: '수학과20',
      description: '이번 학기 수업용으로 샀는데 온라인 수업으로 바뀌어서 판매합니다.'
    },
    {
      id: 3,
      title: '나이키 에어포스 270mm',
      price: 120000,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop',
      category: 'clothing',
      location: '홍대',
      timeAgo: '1일 전',
      likes: 23,
      comments: 7,
      views: 234,
      condition: '중급',
      seller: '운동러버',
      description: '몇 번 신지 않아서 상태 양호합니다. 정품 박스 포함!'
    },
    {
      id: 4,
      title: '스터디 테이블 + 의자 세트',
      price: 180000,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
      category: 'furniture',
      location: '신촌',
      timeAgo: '3일 전',
      likes: 12,
      comments: 4,
      views: 156,
      condition: '상급',
      seller: '졸업생',
      description: '졸업하면서 판매합니다. 직거래만 가능해요.'
    },
    {
      id: 5,
      title: '맥북 프로 13인치 M1',
      price: 1200000,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
      category: 'electronics',
      location: '강남',
      timeAgo: '6시간 전',
      likes: 45,
      comments: 12,
      views: 567,
      condition: '상급',
      seller: '컴공과생',
      description: '1년 사용했고 AppleCare+ 남아있어요. 충전기, 박스 모두 포함'
    },
    {
      id: 6,
      title: '화학 실험복 + 보안경',
      price: 35000,
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=300&h=300&fit=crop',
      category: 'clothing',
      location: '대학로',
      timeAgo: '12시간 전',
      likes: 6,
      comments: 2,
      views: 78,
      condition: '상급',
      seller: '화학과22',
      description: '실험 수업 끝나서 판매해요. 세탁해서 깨끗합니다.'
    }
  ];

  const filteredProducts = items.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price_low':
        return a.price - b.price;
      case 'price_high':
        return b.price - a.price;
      case 'popular':
        return b.likes - a.likes;
      case 'latest':
      default:
        return new Date(b.timeAgo) - new Date(a.timeAgo);
    }
  });

  const formatPrice = (price) => {
    return price.toLocaleString() + '원';
  };

  const getCategoryColor = (categoryId) => {
    return categories.find(cat => cat.id === categoryId)?.color || '#667eea';
  };

  const handleCreateItem = (newItem) => {
    setItems(prev => [newItem, ...prev]);
  };

  const handleBackToMain = () => {
    setCurrentView('main');
  };

  const handleAddItem = () => {
    setCurrentView('create');
  };

  const toggleLike = (itemId) => {
    setLikedItems(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(itemId)) {
        newLiked.delete(itemId);
      } else {
        newLiked.add(itemId);
      }
      return newLiked;
    });
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowProductDetail(true);
  };

  const closeProductDetail = () => {
    setShowProductDetail(false);
    setSelectedProduct(null);
  };

  const handleSellerClick = (seller) => {
    setSelectedSeller({
      name: seller,
      department: items.find(item => item.seller === seller)?.department || '정보 없음'
    });
    setCurrentView('sellerProfile');
  };

  if (currentView === 'create') {
    return (
      <CreateMarketplaceItem 
        onBack={handleBackToMain}
        onCreateItem={handleCreateItem}
      />
    );
  }

  if (currentView === 'sellerProfile') {
    return (
      <SellerProfile 
        seller={selectedSeller}
        onBack={handleBackToMain}
      />
    );
  }

  return (
    <div className="marketplace">
      <header className="marketplace-header">
        <h1>중고거래</h1>
        <div className="header-subtitle">학생들의 안전한 거래 공간</div>
        
        {/* 네비게이션 탭 */}
        <div className="marketplace-tabs">
          <button 
            className={`tab-button ${currentView === 'main' ? 'active' : ''}`}
            onClick={() => setCurrentView('main')}
          >
            전체상품
          </button>
          <button 
            className={`tab-button ${currentView === 'wishlist' ? 'active' : ''}`}
            onClick={() => setCurrentView('wishlist')}
          >
            <Heart size={16} />
            관심목록 ({likedItems.size})
          </button>
        </div>
      </header>

      <div className="search-section">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="상품명, 설명 검색..."
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
                className={`sort-option ${sortBy === 'price_low' ? 'active' : ''}`}
                onClick={() => {setSortBy('price_low'); setShowSortMenu(false);}}
              >
                낮은 가격순
              </button>
              <button 
                className={`sort-option ${sortBy === 'price_high' ? 'active' : ''}`}
                onClick={() => {setSortBy('price_high'); setShowSortMenu(false);}}
              >
                높은 가격순
              </button>
              <button 
                className={`sort-option ${sortBy === 'popular' ? 'active' : ''}`}
                onClick={() => {setSortBy('popular'); setShowSortMenu(false);}}
              >
                인기순
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="category-tabs">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
            style={selectedCategory === category.id ? { 
              backgroundColor: category.color,
              color: 'white'
            } : {}}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="marketplace-content">
        {currentView === 'main' ? (
          <>
            <div className="content-header">
              <span className="result-count">{filteredProducts.length}개 상품</span>
            </div>

            <div className="products-container grid">
              {filteredProducts.map(product => (
            <div key={product.id} className="product-card" onClick={() => handleProductClick(product)}>
              <div className="product-header">
                <div className="product-badge" style={{ backgroundColor: getCategoryColor(product.category) }}>
                  {categories.find(cat => cat.id === product.category)?.name}
                </div>
                <div className="seller-department">{product.department}</div>
              </div>

              <div className="product-image-container">
                <div className="product-image">
                  <img src={product.image} alt={product.title} />
                  <div className="price-overlay">
                    {formatPrice(product.price)}
                  </div>
                  <button 
                    className={`like-button ${likedItems.has(product.id) ? 'liked' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(product.id);
                    }}
                  >
                    <Heart size={16} fill={likedItems.has(product.id) ? '#ff6b6b' : 'none'} />
                  </button>
                </div>
              </div>
              
              <div className="product-info">
                <div className="product-title">{product.title}</div>
                
                <div className="product-detail-row">
                  <div className="product-condition">{product.condition}</div>
                  <div className="product-spacing"></div>
                  <div 
                    className="seller-name clickable"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSellerClick(product.seller);
                    }}
                  >
                    {product.seller}
                  </div>
                </div>
                
                <div className="product-meta">
                  <div className="product-location-time">
                    <div className="meta-item">
                      <MapPin size={12} />
                      <span>{product.location}</span>
                    </div>
                    <div className="meta-item">
                      <Clock size={12} />
                      <span>{product.time}</span>
                    </div>
                  </div>

                  <div className="product-stats">
                    <div className="stat-item">
                      <Heart size={12} />
                      <span>{product.likes}</span>
                    </div>
                    <div className="stat-item">
                      <MessageCircle size={12} />
                      <span>{product.comments}</span>
                    </div>
                    <div className="stat-item">
                      <Eye size={12} />
                      <span>{product.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              ))}
            </div>
          </>
        ) : currentView === 'wishlist' ? (
          <div className="wishlist-content">
            <div className="content-header">
              <span className="result-count">관심상품 {likedItems.size}개</span>
            </div>
            
            {likedItems.size === 0 ? (
              <div className="empty-wishlist">
                <Heart size={48} color="#e1e8ed" />
                <h3>관심상품이 없습니다</h3>
                <p>마음에 드는 상품을 하트로 저장해보세요!</p>
                <button 
                  className="browse-button"
                  onClick={() => setCurrentView('main')}
                >
                  상품 둘러보기
                </button>
              </div>
            ) : (
              <div className="products-container grid">
                {items.filter(product => likedItems.has(product.id)).map(product => (
                  <div key={product.id} className="product-card" onClick={() => handleProductClick(product)}>
                    <div className="product-header">
                      <div className="product-badge" style={{ backgroundColor: getCategoryColor(product.category) }}>
                        {categories.find(cat => cat.id === product.category)?.name}
                      </div>
                      <div className="seller-department">{product.department}</div>
                    </div>

                    <div className="product-image-container">
                      <div className="product-image">
                        <img src={product.image} alt={product.title} />
                        <div className="price-overlay">
                          {formatPrice(product.price)}
                        </div>
                        <button 
                          className={`like-button ${likedItems.has(product.id) ? 'liked' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(product.id);
                          }}
                        >
                          <Heart size={16} fill={likedItems.has(product.id) ? '#ff6b6b' : 'none'} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="product-info">
                      <div className="product-title">{product.title}</div>
                      
                      <div className="product-detail-row">
                        <div className="product-condition">{product.condition}</div>
                        <div className="product-spacing"></div>
                        <div 
                    className="seller-name clickable"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSellerClick(product.seller);
                    }}
                  >
                    {product.seller}
                  </div>
                      </div>
                      
                      <div className="product-meta">
                        <div className="product-location-time">
                          <div className="meta-item">
                            <MapPin size={12} />
                            <span>{product.location}</span>
                          </div>
                          <div className="meta-item">
                            <Clock size={12} />
                            <span>{product.time}</span>
                          </div>
                        </div>

                        <div className="product-stats">
                          <div className="stat-item">
                            <Heart size={12} />
                            <span>{product.likes}</span>
                          </div>
                          <div className="stat-item">
                            <MessageCircle size={12} />
                            <span>{product.comments}</span>
                          </div>
                          <div className="stat-item">
                            <Eye size={12} />
                            <span>{product.views}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </div>

      <button 
        className="floating-add-button"
        onClick={handleAddItem}
      >
        <Plus size={24} />
      </button>

      {/* 상품 상세 모달 */}
      {showProductDetail && selectedProduct && (
        <div className="modal-overlay" onClick={closeProductDetail}>
          <div className="product-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedProduct.title}</h3>
              <button className="close-button" onClick={closeProductDetail}>
                <X size={24} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="product-detail-image">
                <img src={selectedProduct.image} alt={selectedProduct.title} />
                <div className="price-overlay-large">
                  {formatPrice(selectedProduct.price)}
                </div>
              </div>
              
              <div className="product-detail-info">
                <div className="detail-row">
                  <div className="detail-label">상품 상태:</div>
                  <div className="detail-value">{selectedProduct.condition}</div>
                </div>
                
                <div className="detail-row">
                  <div className="detail-label">판매자:</div>
                  <div className="detail-value">
                    <User size={16} />
                    {selectedProduct.seller} ({selectedProduct.department})
                  </div>
                </div>
                
                <div className="detail-row">
                  <div className="detail-label">위치:</div>
                  <div className="detail-value">
                    <MapPin size={16} />
                    {selectedProduct.location}
                  </div>
                </div>
                
                <div className="detail-row">
                  <div className="detail-label">등록 시간:</div>
                  <div className="detail-value">
                    <Clock size={16} />
                    {selectedProduct.time}
                  </div>
                </div>
                
                <div className="product-description">
                  <h4>상품 설명</h4>
                  <p>{selectedProduct.description}</p>
                </div>
                
                <div className="product-stats-detail">
                  <div className="stat-item-detail">
                    <Heart size={16} />
                    <span>좋아요 {selectedProduct.likes}개</span>
                  </div>
                  <div className="stat-item-detail">
                    <MessageCircle size={16} />
                    <span>댓글 {selectedProduct.comments}개</span>
                  </div>
                  <div className="stat-item-detail">
                    <Eye size={16} />
                    <span>조회 {selectedProduct.views}회</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
