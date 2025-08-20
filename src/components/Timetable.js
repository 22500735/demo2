import React, { useState } from 'react';
import { Clock, MapPin, User } from 'lucide-react';
import './Timetable.css';

const Timetable = () => {
  const [selectedDay, setSelectedDay] = useState('月');
  
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
      { subject: '数学解析I', room: 'A101', professor: '田中教授' },
      { subject: '英語コミュニケーション', room: 'B205', professor: 'Smith先生' },
      null,
      { subject: '物理学実験', room: '実験室1', professor: '佐藤教授' },
      { subject: '物理学実験', room: '実験室1', professor: '佐藤教授' },
      null
    ],
    '火': [
      { subject: 'プログラミング基礎', room: 'PC室A', professor: '山田教授' },
      { subject: 'プログラミング基礎', room: 'PC室A', professor: '山田教授' },
      { subject: '線形代数', room: 'C301', professor: '鈴木教授' },
      null,
      { subject: '体育', room: '体育館', professor: '高橋先生' },
      null
    ],
    '水': [
      { subject: '化学', room: 'D102', professor: '伊藤教授' },
      null,
      { subject: '日本史', room: 'E203', professor: '渡辺教授' },
      { subject: '経済学入門', room: 'F105', professor: '中村教授' },
      null,
      { subject: 'ゼミナール', room: 'G301', professor: '小林教授' }
    ],
    '木': [
      null,
      { subject: '統計学', room: 'H201', professor: '加藤教授' },
      { subject: '心理学', room: 'I103', professor: '松本教授' },
      { subject: '哲学', room: 'J204', professor: '木村教授' },
      null,
      null
    ],
    '金': [
      { subject: '情報理論', room: 'PC室B', professor: '斉藤教授' },
      { subject: '情報理論', room: 'PC室B', professor: '斉藤教授' },
      null,
      { subject: '社会学', room: 'K105', professor: '清水教授' },
      { subject: '文学', room: 'L202', professor: '森田教授' },
      null
    ]
  };

  return (
    <div className="timetable">
      <header className="timetable-header">
        <h1>時間割</h1>
        <div className="header-subtitle">2024年度 春学期</div>
      </header>

      <div className="day-selector">
        {days.map((day) => (
          <button
            key={day}
            className={`day-button ${selectedDay === day ? 'active' : ''}`}
            onClick={() => setSelectedDay(day)}
          >
            {day}曜日
          </button>
        ))}
      </div>

      <div className="schedule-container">
        {timeSlots.map((time, index) => (
          <div key={index} className="time-slot">
            <div className="time-info">
              <Clock size={16} />
              <span className="time-text">{time}</span>
              <span className="period-number">{index + 1}限</span>
            </div>
            
            <div className="class-card">
              {schedule[selectedDay][index] ? (
                <div className="class-info">
                  <h3 className="subject-name">
                    {schedule[selectedDay][index].subject}
                  </h3>
                  <div className="class-details">
                    <div className="detail-item">
                      <MapPin size={14} />
                      <span>{schedule[selectedDay][index].room}</span>
                    </div>
                    <div className="detail-item">
                      <User size={14} />
                      <span>{schedule[selectedDay][index].professor}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="empty-slot">
                  <span>空きコマ</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="timetable-stats">
        <div className="stat-item">
          <span className="stat-number">
            {schedule[selectedDay].filter(item => item !== null).length}
          </span>
          <span className="stat-label">授業数</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {schedule[selectedDay].filter(item => item === null).length}
          </span>
          <span className="stat-label">空きコマ</span>
        </div>
      </div>
    </div>
  );
};

export default Timetable;
