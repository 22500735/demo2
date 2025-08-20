import React, { useState } from 'react';
import { Clock, MapPin, User, X, BookOpen, Phone } from 'lucide-react';
import './Timetable.css';

const Timetable = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const days = ['月', '火', '水', '木', '金'];
  const timeSlots = [
    '9:00-10:30',
    '10:40-12:10',
    '13:00-14:30',
    '14:40-16:10',
    '16:20-17:50',
    '18:00-19:30'
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
      { 
        subject: '経済学入門', 
        room: 'F105', 
        professor: '中村教授',
        credits: 2,
        description: 'ミクロ経済学とマクロ経済学の基礎概念を学習します。需要と供給、市場メカニズムを理解します。',
        color: '#16a085'
      },
      null,
      { 
        subject: 'ゼミナール', 
        room: 'G301', 
        professor: '小林教授',
        credits: 2,
        description: '少人数制で専門分野の研究手法を学びます。プレゼンテーションとディスカッションが中心です。',
        color: '#8e44ad'
      }
    ],
    '木': [
      null,
      { 
        subject: '統計学', 
        room: 'H201', 
        professor: '加藤教授',
        credits: 2,
        description: '記述統計と推測統計の基礎を学習します。データ分析の手法も実習を通して身につけます。',
        color: '#3498db'
      },
      { 
        subject: '心理学', 
        room: 'I103', 
        professor: '松本教授',
        credits: 2,
        description: '認知心理学、社会心理学、発達心理学の基礎理論を学習します。実験心理学の手法も扱います。',
        color: '#e67e22'
      },
      { 
        subject: '哲学', 
        room: 'J204', 
        professor: '木村教授',
        credits: 2,
        description: '古代ギリシャから現代まで西洋哲学の主要な思想家と理論を学習します。',
        color: '#95a5a6'
      },
      null,
      null
    ],
    '金': [
      { 
        subject: '情報理論', 
        room: 'PC室B', 
        professor: '斉藤教授',
        credits: 2,
        description: '情報量、エントロピー、符号化理論の基礎を学習します。通信システムの理論的背景を理解します。',
        color: '#2c3e50'
      },
      { 
        subject: '情報理論', 
        room: 'PC室B', 
        professor: '斉藤教授',
        credits: 2,
        description: '情報量、エントロピー、符号化理論の基礎を学習します。通信システムの理論的背景を理解します。',
        color: '#2c3e50'
      },
      null,
      { 
        subject: '社会学', 
        room: 'K105', 
        professor: '清水教授',
        credits: 2,
        description: '社会構造、社会変動、社会問題について学習します。現代社会の諸問題を社会学的視点で分析します。',
        color: '#27ae60'
      },
      { 
        subject: '文学', 
        room: 'L202', 
        professor: '森田教授',
        credits: 2,
        description: '日本近現代文学の代表的作品を読み、文学史的背景と作品分析を行います。',
        color: '#d35400'
      },
      null
    ]
  };

  const handleClassClick = (classInfo, day, period) => {
    if (classInfo) {
      setSelectedClass({ ...classInfo, day, period: period + 1, time: timeSlots[period] });
      setShowModal(true);
    }
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

  return (
    <div className="timetable">
      <header className="timetable-header">
        <h1>時間割</h1>
        <div className="header-subtitle">2024年度 春学期</div>
      </header>

      <div className="timetable-grid">
        <div className="grid-header">
          <div className="time-header">時限</div>
          {days.map((day) => (
            <div key={day} className="day-header">{day}</div>
          ))}
        </div>
        
        {timeSlots.map((time, periodIndex) => (
          <div key={periodIndex} className="grid-row">
            <div className="time-cell">
              <div className="period-number">{periodIndex + 1}</div>
              <div className="time-range">{time}</div>
            </div>
            {days.map((day) => (
              <div 
                key={`${day}-${periodIndex}`} 
                className={`class-cell ${schedule[day][periodIndex] ? 'has-class' : 'empty'}`}
                onClick={() => handleClassClick(schedule[day][periodIndex], day, periodIndex)}
                style={{
                  backgroundColor: schedule[day][periodIndex] ? schedule[day][periodIndex].color : 'transparent'
                }}
              >
                {schedule[day][periodIndex] ? (
                  <div className="class-content">
                    <div className="subject-name">{schedule[day][periodIndex].subject}</div>
                    <div className="class-room">{schedule[day][periodIndex].room}</div>
                  </div>
                ) : (
                  <div className="empty-content">-</div>
                )}
              </div>
            ))}
          </div>
        ))}
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
      </div>

      {showModal && selectedClass && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedClass.subject}</h2>
              <button className="close-button" onClick={closeModal}>
                <X size={24} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="class-schedule-info">
                <div className="schedule-item">
                  <Clock size={16} />
                  <span>{selectedClass.day}曜日 {selectedClass.period}限 ({selectedClass.time})</span>
                </div>
                <div className="schedule-item">
                  <MapPin size={16} />
                  <span>{selectedClass.room}</span>
                </div>
                <div className="schedule-item">
                  <User size={16} />
                  <span>{selectedClass.professor}</span>
                </div>
                <div className="schedule-item">
                  <BookOpen size={16} />
                  <span>{selectedClass.credits}単位</span>
                </div>
              </div>
              
              <div className="class-description">
                <h3>授業内容</h3>
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
