import React, { useState, useEffect } from 'react';
import { X, Navigation, Clock, MapPin, ChevronRight, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import './InlineRouteGuidance.css';

const InlineRouteGuidance = ({ 
  route, 
  onClose, 
  darkMode = false 
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [estimatedArrival, setEstimatedArrival] = useState('');

  useEffect(() => {
    const now = new Date();
    const totalMinutes = parseInt(route.time);
    const arrivalTime = new Date(now.getTime() + totalMinutes * 60000);
    setEstimatedArrival(arrivalTime.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }));
  }, [route.time]);

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPaused]);

  const formatElapsedTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNextStep = () => {
    if (currentStepIndex < route.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
  };

  const currentStep = route.steps[currentStepIndex];
  const progress = ((currentStepIndex + 1) / route.steps.length) * 100;
  const isLastStep = currentStepIndex === route.steps.length - 1;

  return (
    <div className={`inline-guidance-container ${darkMode ? 'dark' : ''}`}>
      
      {/* Header with route info */}
      <div className="guidance-header">
        <div className="route-summary">
          <div className="route-title">
            <Navigation size={20} />
            <span>{route.start.name} → {route.end.name}</span>
          </div>
          <div className="route-stats">
            <div className="stat-item">
              <Clock size={14} />
              <span>{route.time} 소요</span>
            </div>
            <div className="stat-item">
              <MapPin size={14} />
              <span>{route.distance}</span>
            </div>
            <div className="stat-item">
              <span>도착 예정: {estimatedArrival}</span>
            </div>
          </div>
        </div>
        
        <div className="header-controls">
          <button 
            className={`voice-toggle ${voiceEnabled ? 'active' : ''}`}
            onClick={toggleVoice}
            title={voiceEnabled ? '음성 안내 끄기' : '음성 안내 켜기'}
          >
            {voiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          
          <button 
            className="pause-button"
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? '재개' : '일시정지'}
          >
            {isPaused ? '▶️' : '⏸️'}
          </button>
          
          <button className="close-guidance" onClick={onClose} title="길안내 종료">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="progress-text">
          단계 {currentStepIndex + 1} / {route.steps.length}
        </div>
      </div>

      {/* Current step */}
      <div className="current-step">
        <div className="step-header">
          <div className="step-number">{currentStepIndex + 1}</div>
          <div className="step-content">
            <div className="step-instruction">{currentStep.instruction}</div>
            <div className="step-details">
              <span className="step-distance">{currentStep.distance}</span>
              <span className="step-duration">약 {currentStep.duration}</span>
            </div>
          </div>
        </div>

        {isLastStep && (
          <div className="arrival-message">
            <div className="arrival-icon">🎯</div>
            <div className="arrival-text">
              <div className="arrival-title">목적지에 도착했습니다!</div>
              <div className="arrival-subtitle">{route.end.name}</div>
            </div>
          </div>
        )}
      </div>

      {/* Step navigation */}
      <div className="step-navigation">
        <button 
          className="nav-button prev"
          onClick={handlePreviousStep}
          disabled={currentStepIndex === 0}
        >
          <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
          이전
        </button>

        <div className="elapsed-time">
          경과 시간: {formatElapsedTime(elapsedTime)}
        </div>

        <button 
          className="nav-button next"
          onClick={handleNextStep}
          disabled={currentStepIndex === route.steps.length - 1}
        >
          다음
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Upcoming steps preview */}
      {!isLastStep && (
        <div className="upcoming-steps">
          <h4>다음 단계</h4>
          <div className="steps-preview">
            {route.steps.slice(currentStepIndex + 1, currentStepIndex + 3).map((step, index) => (
              <div key={index} className="preview-step">
                <div className="preview-number">{currentStepIndex + index + 2}</div>
                <div className="preview-content">
                  <div className="preview-instruction">{step.instruction}</div>
                  <div className="preview-distance">{step.distance}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick actions */}
      <div className="quick-actions">
        <button className="action-button" title="경로 재계산">
          <RotateCcw size={16} />
          재계산
        </button>
        
        <button 
          className="action-button emergency" 
          title="긴급상황"
          onClick={() => alert('긴급상황 연락처: 02-1234-5678')}
        >
          🚨 긴급
        </button>
      </div>

      {/* Mini map placeholder */}
      <div className="mini-map">
        <div className="mini-map-content">
          <div className="current-position">📍</div>
          <div className="route-line"></div>
          <div className="destination">🏁</div>
        </div>
        <div className="mini-map-label">경로 개요</div>
      </div>

    </div>
  );
};

export default InlineRouteGuidance;
