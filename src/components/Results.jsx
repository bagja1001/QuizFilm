import React from 'react';
import './Results.css';

const Results = ({ results, onRestart, onLogout, user }) => {
    const { totalQuestions, answeredCount, correctCount, wrongCount, timeSpent } = results;
    const unansweredCount = totalQuestions - answeredCount;
    const scorePercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    const getGrade = (percentage) => {
        if (percentage >= 90) return { grade: 'A+', color: '#10b981', message: 'Outstanding!' };
        if (percentage >= 80) return { grade: 'A', color: '#10b981', message: 'Excellent!' };
        if (percentage >= 70) return { grade: 'B', color: '#3b82f6', message: 'Great Job!' };
        if (percentage >= 60) return { grade: 'C', color: '#f59e0b', message: 'Good Effort!' };
        if (percentage >= 50) return { grade: 'D', color: '#f97316', message: 'Keep Trying!' };
        return { grade: 'F', color: '#ef4444', message: 'Need Improvement' };
    };

    const gradeInfo = getGrade(scorePercentage);

    return (
        <div className="results-container fade-in">
            <div className="results-card card">
                <div className="results-header">
                    <div className="confetti-container">
                        {scorePercentage >= 70 && (
                            <>
                                <div className="confetti"></div>
                                <div className="confetti"></div>
                                <div className="confetti"></div>
                                <div className="confetti"></div>
                                <div className="confetti"></div>
                            </>
                        )}
                    </div>

                    <div className="trophy-icon">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M12 15C15.866 15 19 11.866 19 8V5H5V8C5 11.866 8.13401 15 12 15ZM12 15V19M12 19H8M12 19H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M19 5C20.1046 5 21 5.89543 21 7C21 8.10457 20.1046 9 19 9M5 5C3.89543 5 3 5.89543 3 7C3 8.10457 3.89543 9 5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 19H15C15.5523 19 16 19.4477 16 20C16 20.5523 15.5523 21 15 21H9C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19Z" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>

                    <h1 className="results-title">Quiz Completed!</h1>
                    <p className="results-subtitle">Here's how you did, {user.username}</p>
                </div>

                <div className="score-display">
                    <div className="score-circle" style={{ borderColor: gradeInfo.color }}>
                        <div className="score-inner">
                            <span className="score-percentage" style={{ color: gradeInfo.color }}>
                                {scorePercentage}%
                            </span>
                            <span className="score-grade" style={{ color: gradeInfo.color }}>
                                {gradeInfo.grade}
                            </span>
                        </div>
                    </div>
                    <p className="grade-message" style={{ color: gradeInfo.color }}>
                        {gradeInfo.message}
                    </p>
                </div>

                <div className="results-stats">
                    <div className="result-stat-card correct">
                        <div className="stat-icon-large">
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="stat-info">
                            <span className="stat-number">{correctCount}</span>
                            <span className="stat-text">Correct</span>
                        </div>
                    </div>

                    <div className="result-stat-card wrong">
                        <div className="stat-icon-large">
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="stat-info">
                            <span className="stat-number">{wrongCount}</span>
                            <span className="stat-text">Wrong</span>
                        </div>
                    </div>

                    {unansweredCount > 0 && (
                        <div className="result-stat-card unanswered">
                            <div className="stat-icon-large">
                                <svg viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="stat-info">
                                <span className="stat-number">{unansweredCount}</span>
                                <span className="stat-text">Unanswered</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="results-details">
                    <div className="detail-row">
                        <span className="detail-label">Total Questions</span>
                        <span className="detail-value">{totalQuestions}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Time Spent</span>
                        <span className="detail-value">{formatTime(timeSpent)}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Score</span>
                        <span className="detail-value">{correctCount} / {totalQuestions}</span>
                    </div>
                </div>

                <div className="results-actions">
                    <button onClick={onRestart} className="btn btn-primary">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                        </svg>
                        Try Again
                    </button>
                    <button onClick={onLogout} className="btn btn-secondary">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                        </svg>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Results;
