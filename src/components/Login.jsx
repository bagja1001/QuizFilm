import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username.trim()) {
            setError('Please enter your name');
            return;
        }

        if (username.trim().length < 3) {
            setError('Name must be at least 3 characters');
            return;
        }

        onLogin(username.trim());
    };

    return (
        <div className="login-container fade-in">
            {/* Movie Decorations */}
            <div className="movie-decoration popcorn-left">🍿</div>
            <div className="movie-decoration popcorn-right">🍿</div>
            <div className="movie-decoration camera-top">🎥</div>
            <div className="movie-decoration ticket-left">🎟️</div>
            <div className="movie-decoration ticket-right">🎟️</div>
            <div className="movie-decoration star-1">⭐</div>
            <div className="movie-decoration star-2">⭐</div>
            <div className="movie-decoration star-3">⭐</div>

            <div className="login-card">
                <div className="login-header">
                    <div className="icon-wrapper">
                        {/* Film Reel Icon with Animation */}
                        <svg className="film-reel-icon" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" fill="#E50914" opacity="0.2" />
                            <circle cx="50" cy="50" r="30" fill="none" stroke="#E50914" strokeWidth="4" />
                            <circle cx="50" cy="50" r="15" fill="#FFD700" />
                            <circle cx="50" cy="20" r="5" fill="#E50914" />
                            <circle cx="80" cy="50" r="5" fill="#E50914" />
                            <circle cx="50" cy="80" r="5" fill="#E50914" />
                            <circle cx="20" cy="50" r="5" fill="#E50914" />
                            <line x1="50" y1="50" x2="50" y2="20" stroke="#FFD700" strokeWidth="2" />
                            <line x1="50" y1="50" x2="80" y2="50" stroke="#FFD700" strokeWidth="2" />
                        </svg>
                        <div className="clapperboard">🎬</div>
                    </div>
                    <h1 className="login-title">
                        <span className="title-movie">Movie</span> Quiz Master
                    </h1>
                    <p className="login-subtitle">🎭 Test your film knowledge! 🎪</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">
                            🌟 Your Name
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="input"
                            placeholder="Enter your name to start..."
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setError('');
                            }}
                            autoFocus
                        />
                        {error && <span className="error-message">⚠️ {error}</span>}
                    </div>

                    <button type="submit" className="btn btn-primary btn-login">
                        🎬 Start Quiz
                        <svg className="arrow-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </form>

                <div className="login-footer">
                    <div className="feature-list">
                        <div className="feature-item">
                            <span className="feature-icon">🎞️</span>
                            <span>10 Film Questions</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">⏱️</span>
                            <span>5 Minutes Challenge</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">💾</span>
                            <span>Resume Anytime</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
