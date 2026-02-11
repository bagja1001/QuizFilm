import React, { useState, useEffect, useCallback } from 'react';
import {
  decodeHTML,
  shuffleArray,
  formatTime,
  getProgressPercentage
} from '../utils/quizHelpers';
import { QUIZ_CONFIG, STORAGE_KEYS, TIMING, ANSWER_OPTION_START_CODE } from '../constants';
import './Quiz.css';

const Quiz = ({ user, onComplete, onLogout, savedProgress }) => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(QUIZ_CONFIG.TIME_LIMIT);
    const [loading, setLoading] = useState(true);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    // Fetch questions from API
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                // Check if there's saved progress
                if (savedProgress && savedProgress.questions) {
                    setQuestions(savedProgress.questions);
                    setCurrentIndex(savedProgress.currentIndex || 0);
                    setAnswers(savedProgress.answers || {});
                    setTimeLeft(savedProgress.timeLeft || QUIZ_CONFIG.TIME_LIMIT);
                    setLoading(false);
                    return;
                }

                const apiUrl = `${QUIZ_CONFIG.API_URL}?amount=${QUIZ_CONFIG.QUESTIONS_COUNT}&category=${QUIZ_CONFIG.CATEGORY}&difficulty=${QUIZ_CONFIG.DIFFICULTY}`;
                const response = await fetch(apiUrl);
                const data = await response.json();

                if (data.results) {
                    const formattedQuestions = data.results.map((q, idx) => ({
                        id: idx,
                        question: decodeHTML(q.question),
                        correctAnswer: decodeHTML(q.correct_answer),
                        options: shuffleArray([
                            decodeHTML(q.correct_answer),
                            ...q.incorrect_answers.map(a => decodeHTML(a))
                        ]),
                        type: q.type
                    }));

                    setQuestions(formattedQuestions);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
                alert('Failed to load questions. Please try again.');
            }
        };

        fetchQuestions();
    }, [savedProgress]);

    // Complete quiz handler
    const handleComplete = useCallback(() => {
        const results = {
            questions,
            answers,
            totalQuestions: questions.length,
            answeredCount: Object.keys(answers).length,
            correctCount: questions.filter(q => answers[q.id] === q.correctAnswer).length,
            wrongCount: questions.filter(q => answers[q.id] && answers[q.id] !== q.correctAnswer).length,
            timeSpent: 300 - timeLeft
        };
        onComplete(results);
    }, [questions, answers, timeLeft, onComplete]);

    // Timer countdown
    useEffect(() => {
        if (loading || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    handleComplete();
                    return 0;
                }
                return prev - 1;
            });
        }, TIMING.TIMER_INTERVAL);

        return () => clearInterval(timer);
    }, [loading, timeLeft, handleComplete]);

    // Save progress to localStorage
    useEffect(() => {
        if (!loading && questions.length > 0) {
            const progress = {
                questions,
                currentIndex,
                answers,
                timeLeft,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem(STORAGE_KEYS.QUIZ_PROGRESS, JSON.stringify(progress));
        }
    }, [questions, currentIndex, answers, timeLeft, loading]);

    const handleAnswerSelect = (answer) => {
        if (selectedAnswer) return; // Prevent double selection

        setSelectedAnswer(answer);

        // Save answer
        const newAnswers = { ...answers, [questions[currentIndex].id]: answer };
        setAnswers(newAnswers);

        // Auto advance to next question after a short delay
        setTimeout(() => {
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setSelectedAnswer(null);
            } else {
                handleComplete();
            }
        }, TIMING.AUTO_ADVANCE_DELAY);
    };

    if (loading) {
        return (
            <div className="quiz-container">
                <div className="loading-container">
                    <div className="loader"></div>
                    <p>Loading questions...</p>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];

    return (
        <div className="quiz-container fade-in">
            <div className="quiz-header">
                <div className="quiz-header-top">
                    <div className="user-info">
                        <div className="user-avatar">
                            {user.username.charAt(0).toUpperCase()}
                        </div>
                        <span className="username">{user.username}</span>
                    </div>
                    <button onClick={onLogout} className="btn-logout" title="Logout">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                <div className="quiz-stats">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <span className="stat-value">{currentIndex + 1} / {questions.length}</span>
                            <span className="stat-label">Questions</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon timer-icon">
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <span className={`stat-value ${timeLeft < TIMING.TIMER_WARNING_THRESHOLD ? 'time-warning' : ''}`}>
                                {formatTime(timeLeft)}
                            </span>
                            <span className="stat-label">Time Left</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <span className="stat-value">{Object.keys(answers).length}</span>
                            <span className="stat-label">Answered</span>
                        </div>
                    </div>
                </div>

                <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${getProgressPercentage(currentIndex, questions.length)}%` }}></div>
                </div>
            </div>

            <div className="quiz-content card scale-in">
                <div className="question-number">
                    Question {currentIndex + 1}
                </div>

                <h2 className="question-text">
                    {currentQuestion.question}
                </h2>

                <div className="options-container">
                    {currentQuestion.options.map((option, idx) => {
                        const isSelected = selectedAnswer === option;

                        let className = 'option-card';
                        if (isSelected) {
                            className += ' selected';
                        }

                        return (
                            <button
                                key={idx}
                                className={className}
                                onClick={() => handleAnswerSelect(option)}
                                disabled={selectedAnswer !== null}
                            >
                                <span className="option-letter">
                                    {String.fromCharCode(ANSWER_OPTION_START_CODE + idx)}
                                </span>
                                <span className="option-text">{option}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Quiz;
