import React, { useState } from 'react';
import { Plus, Trash2, Calculator } from 'lucide-react';
import './GradeCalculator.css';

const GradeCalculator = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: '미적분학', credits: 3, grade: 'A+' },
    { id: 2, name: '영어회화', credits: 2, grade: 'A0' },
    { id: 3, name: '프로그래밍기초', credits: 3, grade: 'B+' }
  ]);

  const gradePoints = {
    'A+': 4.5,
    'A0': 4.0,
    'B+': 3.5,
    'B0': 3.0,
    'C+': 2.5,
    'C0': 2.0,
    'D+': 1.5,
    'D0': 1.0,
    'F': 0.0
  };

  const addCourse = () => {
    const newCourse = {
      id: Date.now(),
      name: '',
      credits: 3,
      grade: 'A0'
    };
    setCourses([...courses, newCourse]);
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const updateCourse = (id, field, value) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const calculateGPA = () => {
    if (courses.length === 0) return 0;
    
    let totalPoints = 0;
    let totalCredits = 0;
    
    courses.forEach(course => {
      if (course.name && course.grade) {
        totalPoints += gradePoints[course.grade] * course.credits;
        totalCredits += course.credits;
      }
    });
    
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
  };

  return (
    <div className="grade-calculator">
      <div className="calculator-header">
        <div className="header-content">
          <Calculator size={24} />
          <h1>학점 계산기</h1>
        </div>
        <div className="gpa-display">
          <span className="gpa-label">평점평균</span>
          <span className="gpa-value">{calculateGPA()}</span>
        </div>
      </div>

      <div className="courses-container">
        <div className="courses-header">
          <h2>수강 과목</h2>
          <button className="add-course-btn" onClick={addCourse}>
            <Plus size={20} />
            과목 추가
          </button>
        </div>

        <div className="courses-list">
          {courses.map((course) => (
            <div key={course.id} className="course-item">
              <input
                type="text"
                placeholder="과목명"
                value={course.name}
                onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                className="course-name-input"
              />
              
              <select
                value={course.credits}
                onChange={(e) => updateCourse(course.id, 'credits', parseInt(e.target.value))}
                className="credits-select"
              >
                <option value={1}>1학점</option>
                <option value={2}>2학점</option>
                <option value={3}>3학점</option>
                <option value={4}>4학점</option>
                <option value={5}>5학점</option>
                <option value={6}>6학점</option>
              </select>
              
              <select
                value={course.grade}
                onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                className="grade-select"
              >
                <option value="A+">A+</option>
                <option value="A0">A0</option>
                <option value="B+">B+</option>
                <option value="B0">B0</option>
                <option value="C+">C+</option>
                <option value="C0">C0</option>
                <option value="D+">D+</option>
                <option value="D0">D0</option>
                <option value="F">F</option>
              </select>
              
              <button
                className="delete-course-btn"
                onClick={() => deleteCourse(course.id)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {courses.length === 0 && (
          <div className="empty-state">
            <Calculator size={48} />
            <p>수강 과목을 추가해보세요</p>
            <button className="add-first-course" onClick={addCourse}>
              첫 번째 과목 추가하기
            </button>
          </div>
        )}
      </div>

      <div className="calculator-footer">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">총 학점</span>
            <span className="stat-value">
              {courses.reduce((sum, course) => sum + (course.name ? course.credits : 0), 0)}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">수강 과목</span>
            <span className="stat-value">
              {courses.filter(course => course.name).length}개
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">평점평균</span>
            <span className="stat-value gpa-highlight">
              {calculateGPA()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeCalculator;
