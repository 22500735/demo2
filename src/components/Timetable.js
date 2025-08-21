import React, { useState } from 'react';
import { X, ArrowLeft, Star, MessageCircle, ThumbsUp, Clock, MapPin, Users, Calculator, Minus, Plus, User, BookOpen } from 'lucide-react';
import GradeCalculator from './GradeCalculator';
import './Timetable.css';

const Timetable = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [grades, setGrades] = useState({});
  const [customClasses, setCustomClasses] = useState({});
  const [editingCell, setEditingCell] = useState(null);
  const [showGradeCalculator, setShowGradeCalculator] = useState(false);
  
  const days = ['月', '火', '水', '木', '金'];
  const timeSlots = [
    '9:00-10:30',     // 1st period
    '10:30-11:00',    // Worship
    '11:00-12:30',    // 2nd period
    '12:30-13:20',    // Lunch Hour
    '13:20-14:50',    // 3rd period
    '15:05-16:35',    // 4th period
    '16:50-18:20',    // 5th period
    '18:30-20:00',    // 6th period
    '20:10-21:40'     // 7th period
  ];

  const periodNames = [
    '1교시',
    '예배',
    '2교시', 
    '점심시간',
    '3교시',
    '4교시',
    '5교시',
    '6교시',
    '7교시'
  ];

  const schedule = {
    '月': [
      { 
        subject: '数学解析I', 
        room: 'A101', 
        professor: '田中教授',
        credits: 2,
        description: '微分積分学の基礎理論を学習します。極限、連続性、微分可能性について詳しく扱います。',
        color: '#4facfe'
      },
      { 
        subject: '英語コミュニケーション', 
        room: 'B205', 
        professor: 'Smith先生',
        credits: 1,
        description: '実践的な英語コミュニケーション能力を身につけます。プレゼンテーションやディスカッションを中心に行います。',
        color: '#ff6b6b'
      },
      null,
      { 
        subject: '物理学実験', 
        room: '実験室1', 
        professor: '佐藤教授',
        credits: 1,
        description: '基礎物理学の実験を通して理論の理解を深めます。レポート作成も重要な評価要素です。',
        color: '#2ecc71'
      },
      { 
        subject: '物理学実験', 
        room: '実験室1', 
        professor: '佐藤教授',
        credits: 1,
        description: '基礎物理学の実験を通して理論の理解を深めます。レポート作成も重要な評価要素です。',
        color: '#2ecc71'
      },
      null
    ],
    '火': [
      { 
        subject: 'プログラミング基礎', 
        room: 'PC室A', 
        professor: '山田教授',
        credits: 2,
        description: 'Python言語を使用してプログラミングの基礎を学びます。変数、制御構造、関数について学習します。',
        color: '#9b59b6'
      },
      { 
        subject: 'プログラミング基礎', 
        room: 'PC室A', 
        professor: '山田教授',
        credits: 2,
        description: 'Python言語を使用してプログラミングの基礎を学びます。変数、制御構造、関数について学習します。',
        color: '#9b59b6'
      },
      { 
        subject: '線形代数', 
        room: 'C301', 
        professor: '鈴木教授',
        credits: 2,
        description: 'ベクトル空間、行列演算、固有値問題などの線形代数の基礎理論を学習します。',
        color: '#f39c12'
      },
      null,
      { 
        subject: '体育', 
        room: '体育館', 
        professor: '高橋先生',
        credits: 1,
        description: 'バスケットボール、バレーボール、卓球などの球技を通して体力向上を図ります。',
        color: '#e74c3c'
      },
      null
    ],
    '水': [
      { 
        subject: '化学', 
        room: 'D102', 
        professor: '伊藤教授',
        credits: 2,
        description: '原子構造、化学結合、化学反応の基礎理論を学習します。実験も並行して行います。',
        color: '#1abc9c'
      },
      null,
      { 
        subject: '日本史', 
        room: 'E203', 
        professor: '渡辺教授',
        credits: 2,
        description: '古代から現代まで日本の歴史を通史的に学習します。史料読解も重視します。',
        color: '#34495e'
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    '木': [
      null,
      null, // 예배
      { subject: '미적분학', room: 'C301', professor: '최교수', credits: 3, description: '함수의 극한, 미분, 적분의 기본 개념을 학습합니다.', rating: 3.9, reviews: 18 },
      null, // 점심시간
      { subject: '컴퓨터프로그래밍', room: 'D401', professor: '정교수', credits: 3, description: 'Python을 이용한 기초 프로그래밍 기법을 배웁니다.', rating: 4.6, reviews: 27 },
      { subject: '물리학', room: 'G701', professor: '윤교수', credits: 3, description: '역학, 열역학, 전자기학의 기본 원리를 학습합니다.', rating: 4.0, reviews: 21 },
      null,
      null,
      null
    ],
    '金': [
      { subject: '체육', room: '체육관', professor: '박교수', credits: 1, description: '건강한 신체 활동과 스포츠를 통한 체력 증진을 목표로 합니다.', rating: 4.8, reviews: 31 },
      null, // 예배
      null,
      null, // 점심시간
      { subject: '물리학', room: 'G701', professor: '윤교수', credits: 3, description: '역학, 열역학, 전자기학의 기본 원리를 학습합니다.', rating: 4.0, reviews: 21 },
      { subject: '한국사', room: 'E501', professor: '강교수', credits: 2, description: '한국의 역사와 문화를 체계적으로 학습합니다.', rating: 4.1, reviews: 12 },
      null,
      null
    ]
  };

  const handleClassClick = (classInfo, day, period) => {
    if (classInfo) {
      setSelectedClass({ ...classInfo, day, period: period + 1, time: timeSlots[period] });
      setShowModal(true);
    }
  };

  const handleEmptyCellClick = (day, period) => {
    const cellKey = `${day}-${period}`;
    // 수업 추가 모달을 표시하거나 편집 모드로 전환
    if (window.confirm('이 시간에 수업을 추가하시겠습니까?')) {
      setEditingCell(cellKey);
    }
  };

  const handleMemoSave = (day, period, memo) => {
    const cellKey = `${day}-${period}`;
    if (memo.trim()) {
      setCustomClasses(prev => ({
        ...prev,
        [cellKey]: {
          subject: memo,
          isCustom: true,
          room: '개인메모',
          professor: '나',
          credits: 0,
          description: '개인적으로 추가한 메모입니다.'
        }
      }));
    } else {
      setCustomClasses(prev => {
        const newCustomClasses = { ...prev };
        delete newCustomClasses[cellKey];
        return newCustomClasses;
      });
    }
    setEditingCell(null);
  };

  const getCellContent = (day, period) => {
    const scheduleItem = schedule[day][period];
    const cellKey = `${day}-${period}`;
    const customItem = customClasses[cellKey];
    
    return scheduleItem || customItem || null;
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedClass(null);
  };

  const getTotalClasses = () => {
    let total = 0;
    days.forEach(day => {
      total += schedule[day].filter(item => item !== null).length;
    });
    return total;
  };

  const getTotalCredits = () => {
    let total = 0;
    days.forEach(day => {
      schedule[day].forEach(item => {
        if (item) total += item.credits;
      });
    });
    return total;
  };

  const gradePoints = {
    'A+': 4.5, 'A': 4.0, 'B+': 3.5, 'B': 3.0, 'C+': 2.5, 'C': 2.0, 'D+': 1.5, 'D': 1.0, 'F': 0.0
  };

  const getAllSubjects = () => {
    const subjects = [];
    days.forEach(day => {
      schedule[day].forEach(item => {
        if (item && !subjects.find(s => s.subject === item.subject)) {
          subjects.push(item);
        }
      });
    });
    return subjects;
  };

  const calculateGPA = () => {
    const subjects = getAllSubjects();
    let totalPoints = 0;
    let totalCredits = 0;
    
    subjects.forEach(subject => {
      const grade = grades[subject.subject];
      if (grade && gradePoints[grade] !== undefined) {
        totalPoints += gradePoints[grade] * subject.credits;
        totalCredits += subject.credits;
      }
    });
    
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  const handleGradeChange = (subject, grade) => {
    setGrades(prev => ({
      ...prev,
      [subject]: grade
    }));
  };

  // 학점 계산기 뷰 렌더링
  if (showGradeCalculator) {
    return (
      <div className="grade-calculator-container">
        <div className="grade-calculator-header">
          <button 
            className="back-button"
            onClick={() => setShowGradeCalculator(false)}
          >
            <ArrowLeft size={20} />
            <span>뒤로가기</span>
          </button>
        </div>
        <GradeCalculator />
      </div>
    );
  }

  return (
    <div className="timetable">
      <header className="timetable-header">
        <h1>時間割</h1>
        <div className="header-subtitle">2024年度 春学期</div>
      </header>

      <div className="timetable-grid">
        <div className="timetable-grid">
          <div className="grid-header">
            <div className="time-header">시간</div>
            {days.map(day => (
              <div key={day} className="day-header">{day}</div>
            ))}
          </div>
          
          {timeSlots.map((time, periodIndex) => (
            <div key={periodIndex} className="grid-row">
              <div className="time-cell">
                <div className="period-name">{periodNames[periodIndex]}</div>
                <div className="time-range">{time}</div>
              </div>
              {days.map(day => {
                const classInfo = getCellContent(day, periodIndex);
                const cellKey = `${day}-${periodIndex}`;
                const isEditing = editingCell === cellKey;
                
                return (
                  <div
                    key={cellKey}
                    className={`class-cell ${classInfo ? 'has-class' : 'empty-cell'} ${classInfo?.isCustom ? 'custom-class' : ''}`}
                    onClick={() => classInfo ? handleClassClick(classInfo, day, periodIndex) : handleEmptyCellClick(day, periodIndex)}
                    style={classInfo && !classInfo.isCustom ? { backgroundColor: classInfo.color || '#4facfe' } : {}}
                  >
                    {isEditing ? (
                      <input
                        type="text"
                        className="memo-input"
                        placeholder="수업명 입력..."
                        autoFocus
                        onBlur={(e) => handleMemoSave(day, periodIndex, e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleMemoSave(day, periodIndex, e.target.value);
                          }
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : classInfo ? (
                      <div className="class-content">
                        <div className="subject-name">{classInfo.subject}</div>
                        <div className="class-room">{classInfo.room}</div>
                        {classInfo.isCustom && <div className="custom-badge">메모</div>}
                      </div>
                    ) : (
                      <div className="add-memo">+</div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="timetable-stats">
        <div className="stat-item">
          <span className="stat-number">{getTotalClasses()}</span>
          <span className="stat-label">総授業数</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{getTotalCredits()}</span>
          <span className="stat-label">総単位数</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{calculateGPA()}</span>
          <span className="stat-label">GPA</span>
        </div>
      </div>

      <div className="calculator-section">
        <button 
          className="calculator-toggle"
          onClick={() => setShowCalculator(!showCalculator)}
        >
          <Calculator size={20} />
          <span>学点計算機</span>
          {showCalculator ? <Minus size={16} /> : <Plus size={16} />}
        </button>

        {showCalculator && (
          <div className="calculator-content">
            <div className="calculator-header">
              <h3>成績入力</h3>
              <p>各科目の成績を選択してGPAを計算します</p>
            </div>
            
            <div className="subjects-list">
              {getAllSubjects().map((subject, index) => (
                <div key={index} className="subject-grade-item">
                  <div className="subject-info">
                    <span className="subject-name-calc">{subject.subject}</span>
                    <span className="subject-credits">{subject.credits}単位</span>
                  </div>
                  <select
                    value={grades[subject.subject] || ''}
                    onChange={(e) => handleGradeChange(subject.subject, e.target.value)}
                    className="grade-select"
                  >
                    <option value="">未選択</option>
                    <option value="A+">A+ (4.5)</option>
                    <option value="A">A (4.0)</option>
                    <option value="B+">B+ (3.5)</option>
                    <option value="B">B (3.0)</option>
                    <option value="C+">C+ (2.5)</option>
                    <option value="C">C (2.0)</option>
                    <option value="D+">D+ (1.5)</option>
                    <option value="D">D (1.0)</option>
                    <option value="F">F (0.0)</option>
                  </select>
                </div>
              ))}
            </div>

            <div className="gpa-summary">
              <div className="gpa-item">
                <span className="gpa-label">計算対象単位数</span>
                <span className="gpa-value">
                  {getAllSubjects().reduce((total, subject) => {
                    return grades[subject.subject] ? total + subject.credits : total;
                  }, 0)}単位
                </span>
              </div>
              <div className="gpa-item main-gpa">
                <span className="gpa-label">現在のGPA</span>
                <span className="gpa-value">{calculateGPA()}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 학점 계산기 버튼 */}
      <div className="grade-calculator-button-container">
        <button 
          className="grade-calculator-button"
          onClick={() => setShowGradeCalculator(true)}
        >
          <Calculator size={20} />
          <span>학점 계산기</span>
        </button>
      </div>

      {showModal && selectedClass && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedClass.subject}</h3>
              <button className="close-button" onClick={closeModal}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <div className="class-detail">
                <div className="detail-item">
                  <Clock size={16} />
                  <span>{selectedClass.time}</span>
                </div>
                <div className="detail-item">
                  <MapPin size={16} />
                  <span>{selectedClass.room}</span>
                </div>
                <div className="detail-item">
                  <User size={16} />
                  <span>{selectedClass.professor}</span>
                </div>
                <div className="detail-item">
                  <BookOpen size={16} />
                  <span>{selectedClass.credits}단위</span>
                </div>
              </div>
              
              {!selectedClass.isCustom && selectedClass.rating && (
                <div className="course-evaluation">
                  <h4>강의 평가</h4>
                  <div className="rating-section">
                    <div className="rating-score">
                      <span className="score">{selectedClass.rating}</span>
                      <div className="stars">
                        {[1, 2, 3, 4, 5].map(star => (
                          <span key={star} className={`star ${star <= selectedClass.rating ? 'filled' : ''}`}>★</span>
                        ))}
                      </div>
                      <span className="review-count">({selectedClass.reviews}개 리뷰)</span>
                    </div>
                  </div>
                  
                  <div className="evaluation-details">
                    <div className="eval-item">
                      <span className="eval-label">수업 난이도</span>
                      <div className="eval-bar">
                        <div className="eval-fill" style={{width: `${(selectedClass.rating / 5) * 100}%`}}></div>
                      </div>
                    </div>
                    <div className="eval-item">
                      <span className="eval-label">과제량</span>
                      <div className="eval-bar">
                        <div className="eval-fill" style={{width: `${((selectedClass.rating - 0.5) / 5) * 100}%`}}></div>
                      </div>
                    </div>
                    <div className="eval-item">
                      <span className="eval-label">성적 관대함</span>
                      <div className="eval-bar">
                        <div className="eval-fill" style={{width: `${((selectedClass.rating + 0.3) / 5) * 100}%`}}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="recent-reviews">
                    <h5>최근 리뷰</h5>
                    <div className="review-item">
                      <div className="review-header">
                        <span className="reviewer">익명</span>
                        <span className="review-date">2024.03.15</span>
                      </div>
                      <p className="review-text">교수님이 친절하시고 설명을 잘해주십니다. 과제는 적당하고 시험도 어렵지 않아요.</p>
                    </div>
                    <div className="review-item">
                      <div className="review-header">
                        <span className="reviewer">익명</span>
                        <span className="review-date">2024.03.10</span>
                      </div>
                      <p className="review-text">내용이 흥미롭고 실습 위주라 재미있습니다. 추천해요!</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="class-description">
                <h4>수업 설명</h4>
                <p>{selectedClass.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timetable;
