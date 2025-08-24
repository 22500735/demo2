import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, Star, MessageCircle, ThumbsUp, Clock, MapPin, Users, Calculator, Minus, Plus, User, BookOpen, Search, Edit3, Send } from 'lucide-react';
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
  const [showMemo, setShowMemo] = useState(false);
  const [showBoard, setShowBoard] = useState(false);
  const [showPopularCourses, setShowPopularCourses] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [memos, setMemos] = useState({});
  const [boardPosts, setBoardPosts] = useState({});
  const [newPost, setNewPost] = useState('');
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [schedule, setSchedule] = useState({});
  
  const days = ['月', '火', '水', '木', '金'];
  const timeSlots = [
    '9:00-10:30',     // 1st period
    '11:00-12:30',    // 2nd period
    '12:30-13:20',    // Lunch Hour
    '13:20-14:50',    // 3rd period
    '15:05-16:35',    // 4th period
    '16:50-18:20',    // 5th period
    '18:30-20:00'     // 6th period
  ];

  const periodNames = [
    '1교시',
    '2교시', 
    '점심시간',
    '3교시',
    '4교시',
    '5교시',
    '6교시'
  ];

  const initialSchedule = {
    '月': [
      { 
        subject: '数学解析I', 
        room: 'A101', 
        professor: '田中教授',
        credits: 2,
        description: '微分積分学の基礎理論を学습します。極限、連続性、微分可能性について詳しく扱います。',
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
        description: '基礎物理学の実験을 통해 이론의 이해를 深めます。レポート作成도 중요한 평가 요소입니다.',
        color: '#2ecc71'
      },
      { 
        subject: '물리학실험', 
        room: '실험실1', 
        professor: '佐藤教授',
        credits: 1,
        description: '基礎물리학の実験을 통해 이론 이해를 深めます。レポート작성도 중요한 평가 요소입니다.',
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

  // 인기 강의 데이터
  const popularCourses = [
    {
      id: 1,
      name: '데이터 사이언스 입문',
      professor: '이교수',
      credits: 3,
      rating: 4.8,
      students: 120,
      time: '화,목 13:20-14:50',
      department: '컴퓨터공학과',
      reviews: [
        { id: 1, author: '익명1', rating: 5, content: '정말 유익한 강의였습니다. 실습 위주로 진행되어 이해하기 쉬웠어요.', date: '2024-01-15' },
        { id: 2, author: '익명2', rating: 4, content: '교수님이 친절하시고 질문에 잘 답해주세요. 과제는 조금 많은 편입니다.', date: '2024-01-10' },
        { id: 3, author: '익명3', rating: 5, content: '미래에 도움이 될 것 같은 내용들이 많았습니다. 추천해요!', date: '2024-01-08' }
      ]
    },
    {
      id: 2,
      name: '웹 프로그래밍',
      professor: '김교수',
      credits: 3,
      rating: 4.6,
      students: 95,
      time: '월,수 15:05-16:35',
      department: '컴퓨터공학과',
      reviews: [
        { id: 4, author: '익명4', rating: 5, content: 'HTML, CSS, JavaScript부터 React까지 체계적으로 배울 수 있어요.', date: '2024-01-12' },
        { id: 5, author: '익명5', rating: 4, content: '실무에 바로 적용할 수 있는 내용들이 많았습니다.', date: '2024-01-09' }
      ]
    },
    {
      id: 3,
      name: '심리학개론',
      professor: '박교수',
      credits: 2,
      rating: 4.7,
      students: 150,
      time: '화 11:00-12:30',
      department: '심리학과',
      reviews: [
        { id: 6, author: '익명6', rating: 5, content: '인간의 심리를 이해하는 데 도움이 많이 되었습니다.', date: '2024-01-14' },
        { id: 7, author: '익명7', rating: 4, content: '강의가 재미있고 이해하기 쉽게 설명해주세요.', date: '2024-01-11' }
      ]
    },
    {
      id: 4,
      name: '경영학원론',
      professor: '최교수',
      credits: 3,
      rating: 4.5,
      students: 200,
      time: '월,금 13:20-14:50',
      department: '경영학과',
      reviews: [
        { id: 8, author: '익명8', rating: 4, content: '경영의 기본 개념을 잘 배울 수 있었습니다.', date: '2024-01-13' },
        { id: 9, author: '익명9', rating: 5, content: '실제 사례를 많이 들어주셔서 이해가 쉬웠어요.', date: '2024-01-07' }
      ]
    }
  ];

  // 초기 시간표 설정
  useEffect(() => {
    setSchedule(initialSchedule);
  }, []);

  const handleClassClick = (classInfo, day, period) => {
    if (classInfo) {
      setSelectedClass({ ...classInfo, day, period: period + 1, time: timeSlots[period] });
      setShowModal(true);
      setShowMemo(false);
      setShowBoard(false);
    }
  };

  const handleEmptyCellPlusClick = () => {
    setShowSearch(true);
    setShowPopularCourses(false);
  };

  const handleSearchClick = () => {
    setShowSearch(true);
    setShowPopularCourses(false);
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const handleMemoClick = () => {
    setShowMemo(true);
    setShowBoard(false);
  };

  const handleBoardClick = () => {
    setShowBoard(true);
    setShowMemo(false);
  };

  const handleWeekChange = (week) => {
    setSelectedWeek(week);
  };

  const saveMemo = (week, content) => {
    const classKey = `${selectedClass.subject}-${selectedClass.professor}`;
    setMemos(prev => ({
      ...prev,
      [classKey]: {
        ...prev[classKey],
        [week]: content
      }
    }));
  };

  const addBoardPost = () => {
    if (newPost.trim()) {
      const classKey = `${selectedClass.subject}-${selectedClass.professor}`;
      setBoardPosts(prev => ({
        ...prev,
        [classKey]: [
          ...(prev[classKey] || []),
          {
            id: Date.now(),
            content: newPost,
            author: '나',
            time: new Date().toLocaleString(),
            likes: 0
          }
        ]
      }));
      setNewPost('');
    }
  };

  const filteredCourses = popularCourses.filter(course => 
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.professor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addCourseToSchedule = (course) => {
    // 강의 시간 파싱 (예: "월,수 15:05-16:35")
    const timeInfo = course.time;
    const [daysStr, timeRange] = timeInfo.split(' ');
    const courseDays = daysStr.split(',');
    
    // 시간대 찾기
    let targetPeriod = -1;
    timeSlots.forEach((slot, index) => {
      if (timeRange.includes(slot.split('-')[0])) {
        targetPeriod = index;
      }
    });
    
    if (targetPeriod === -1) {
      alert('해당 시간대를 찾을 수 없습니다.');
      return;
    }
    
    // 시간표에 추가
    const newSchedule = { ...schedule };
    courseDays.forEach(day => {
      // 한국어 요일을 일본어로 변환
      let targetDay = day;
      if (day === '월') targetDay = '月';
      else if (day === '화') targetDay = '火';
      else if (day === '수') targetDay = '水';
      else if (day === '목') targetDay = '木';
      else if (day === '금') targetDay = '金';
      
      if (!newSchedule[targetDay]) {
        newSchedule[targetDay] = new Array(timeSlots.length).fill(null);
      }
      
      // 해당 시간에 이미 수업이 있는지 확인
      if (newSchedule[targetDay][targetPeriod]) {
        alert(`${targetDay}요일 ${periodNames[targetPeriod]}에 이미 수업이 있습니다.`);
        return;
      }
      
      // 강의 추가
      newSchedule[targetDay][targetPeriod] = {
        subject: course.name,
        room: 'TBA',
        professor: course.professor,
        credits: course.credits,
        description: `${course.department} 소속 강의입니다.`,
        color: '#4facfe'
      };
    });
    
    setSchedule(newSchedule);
    alert(`${course.name} 강의가 시간표에 추가되었습니다!`);
    setShowSearch(false);
    setSelectedCourse(null);
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
    const scheduleItem = schedule[day] ? schedule[day][period] : null;
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
      if (schedule[day]) {
        total += schedule[day].filter(item => item !== null).length;
      }
    });
    return total;
  };

  const getTotalCredits = () => {
    let total = 0;
    days.forEach(day => {
      if (schedule[day]) {
        schedule[day].forEach(item => {
          if (item) total += item.credits;
        });
      }
    });
    return total;
  };

  const gradePoints = {
    'A+': 4.5, 'A': 4.0, 'B+': 3.5, 'B': 3.0, 'C+': 2.5, 'C': 2.0, 'D+': 1.5, 'D': 1.0, 'F': 0.0
  };

  const getAllSubjects = () => {
    const subjects = [];
    days.forEach(day => {
      if (schedule[day]) {
        schedule[day].forEach(item => {
          if (item && !subjects.find(s => s.subject === item.subject)) {
            subjects.push(item);
          }
        });
      }
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
                    onClick={() => classInfo ? handleClassClick(classInfo, day, periodIndex) : handleEmptyCellPlusClick()}
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
            
            <div className="modal-tabs">
              <button 
                className={`tab-button ${!showMemo && !showBoard ? 'active' : ''}`}
                onClick={() => {setShowMemo(false); setShowBoard(false);}}
              >
                수업 정보
              </button>
              <button 
                className={`tab-button ${showMemo ? 'active' : ''}`}
                onClick={handleMemoClick}
              >
                <Edit3 size={16} />
                메모
              </button>
              <button 
                className={`tab-button ${showBoard ? 'active' : ''}`}
                onClick={handleBoardClick}
              >
                <MessageCircle size={16} />
                비공개 게시판
              </button>
            </div>

            <div className="modal-body">
              {!showMemo && !showBoard && (
                <div className="class-info-tab">
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
                  
                  <div className="class-description">
                    <h4>수업 설명</h4>
                    <p>{selectedClass.description}</p>
                  </div>
                </div>
              )}

              {showMemo && (
                <div className="memo-tab">
                  <div className="week-selector">
                    <h4>주차별 메모</h4>
                    <div className="week-buttons">
                      {Array.from({length: 15}, (_, i) => i + 1).map(week => (
                        <button
                          key={week}
                          className={`week-button ${selectedWeek === week ? 'active' : ''}`}
                          onClick={() => handleWeekChange(week)}
                        >
                          {week}주차
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="memo-content">
                    <h5>{selectedWeek}주차 메모</h5>
                    <textarea
                      className="memo-textarea"
                      placeholder={`${selectedWeek}주차 수업 내용을 메모하세요...`}
                      value={memos[`${selectedClass.subject}-${selectedClass.professor}`]?.[selectedWeek] || ''}
                      onChange={(e) => saveMemo(selectedWeek, e.target.value)}
                      rows={10}
                    />
                  </div>
                </div>
              )}

              {showBoard && (
                <div className="board-tab">
                  <h4>비공개 게시판</h4>
                  <p className="board-description">이 수업을 듣는 학생들만 사용할 수 있는 게시판입니다.</p>
                  
                  <div className="post-input-section">
                    <textarea
                      className="post-textarea"
                      placeholder="궁금한 점이나 정보를 공유해보세요..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      rows={3}
                    />
                    <button className="post-submit-button" onClick={addBoardPost}>
                      <Send size={16} />
                      게시
                    </button>
                  </div>

                  <div className="posts-list">
                    {(boardPosts[`${selectedClass.subject}-${selectedClass.professor}`] || []).map(post => (
                      <div key={post.id} className="board-post">
                        <div className="post-header">
                          <span className="post-author">{post.author}</span>
                          <span className="post-time">{post.time}</span>
                        </div>
                        <div className="post-content">{post.content}</div>
                        <div className="post-actions">
                          <button className="like-button">
                            <ThumbsUp size={14} />
                            {post.likes}
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {(!boardPosts[`${selectedClass.subject}-${selectedClass.professor}`] || 
                      boardPosts[`${selectedClass.subject}-${selectedClass.professor}`].length === 0) && (
                      <div className="no-posts">
                        <p>아직 게시물이 없습니다. 첫 번째 게시물을 작성해보세요!</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 인기 강의 목록 모달 */}
      {showPopularCourses && (
        <div className="modal-overlay" onClick={() => setShowPopularCourses(false)}>
          <div className="popular-courses-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>인기 강의</h3>
              <button className="search-toggle" onClick={handleSearchClick}>
                <Search size={20} />
              </button>
              <button className="close-button" onClick={() => setShowPopularCourses(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="courses-list">
              {popularCourses.map(course => (
                <div key={course.id} className="course-item" onClick={() => handleCourseClick(course)}>
                  <div className="course-header">
                    <h4>{course.name}</h4>
                    <div className="course-rating">
                      <Star size={16} fill="#ffc107" color="#ffc107" />
                      {course.rating}
                    </div>
                  </div>
                  <div className="course-info">
                    <span className="course-professor">{course.professor}</span>
                    <span className="course-department">{course.department}</span>
                  </div>
                  <div className="course-meta">
                    <span className="course-time">{course.time}</span>
                    <span className="course-students">{course.students}명 수강</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 강의 검색 모달 */}
      {showSearch && (
        <div className="modal-overlay" onClick={() => setShowSearch(false)}>
          <div className="search-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>강의 검색</h3>
              <button className="close-button" onClick={() => setShowSearch(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="search-input-section">
              <input
                type="text"
                className="course-search-input"
                placeholder="강의명, 교수명, 학과명으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="search-results">
              {filteredCourses.map(course => (
                <div key={course.id} className="course-item" onClick={() => handleCourseClick(course)}>
                  <div className="course-header">
                    <h4>{course.name}</h4>
                    <div className="course-rating">
                      <Star size={16} fill="#ffc107" color="#ffc107" />
                      {course.rating}
                    </div>
                  </div>
                  <div className="course-info">
                    <span className="course-professor">{course.professor}</span>
                    <span className="course-department">{course.department}</span>
                  </div>
                  <div className="course-meta">
                    <span className="course-time">{course.time}</span>
                    <span className="course-students">{course.students}명 수강</span>
                  </div>
                </div>
              ))}
              
              {filteredCourses.length === 0 && searchQuery && (
                <div className="no-results">
                  <p>검색 결과가 없습니다.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 강의 리뷰 모달 */}
      {selectedCourse && (
        <div className="modal-overlay" onClick={() => setSelectedCourse(null)}>
          <div className="course-review-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedCourse.name}</h3>
              <button className="close-button" onClick={() => setSelectedCourse(null)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="course-details">
              <div className="course-summary">
                <div className="summary-item">
                  <span className="label">교수:</span>
                  <span>{selectedCourse.professor}</span>
                </div>
                <div className="summary-item">
                  <span className="label">학과:</span>
                  <span>{selectedCourse.department}</span>
                </div>
                <div className="summary-item">
                  <span className="label">학점:</span>
                  <span>{selectedCourse.credits}학점</span>
                </div>
                <div className="summary-item">
                  <span className="label">시간:</span>
                  <span>{selectedCourse.time}</span>
                </div>
                <div className="summary-item">
                  <span className="label">수강인원:</span>
                  <span>{selectedCourse.students}명</span>
                </div>
              </div>
              
              <div className="overall-rating">
                <div className="rating-score">
                  <Star size={24} fill="#ffc107" color="#ffc107" />
                  <span className="score">{selectedCourse.rating}</span>
                </div>
                <div className="rating-details">
                  <span>전체 평점</span>
                  <span>{selectedCourse.reviews.length}개 리뷰</span>
                </div>
              </div>
            </div>
            
            <div className="reviews-section">
              <h4>수강생 리뷰</h4>
              <div className="reviews-list">
                {selectedCourse.reviews.map(review => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <div className="reviewer-info">
                        <span className="reviewer-name">{review.author}</span>
                        <div className="review-rating">
                          {Array.from({length: 5}, (_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              fill={i < review.rating ? "#ffc107" : "none"} 
                              color="#ffc107" 
                            />
                          ))}
                        </div>
                      </div>
                      <span className="review-date">{review.date}</span>
                    </div>
                    <p className="review-text">{review.content}</p>
                  </div>
                ))}
              </div>
              
              <div className="add-course-section">
                <button 
                  className="add-course-button"
                  onClick={() => addCourseToSchedule(selectedCourse)}
                >
                  시간표에 추가
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timetable;
