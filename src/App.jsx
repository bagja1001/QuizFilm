import React, { useState, useEffect } from 'react';
import { STORAGE_KEYS, QUIZ_STATES } from './constants';
import Login from './components/Login';
import Quiz from './components/Quiz';
import Results from './components/Results';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [quizState, setQuizState] = useState(QUIZ_STATES.LOGIN);
  const [quizData, setQuizData] = useState(null);

  // Initialize app state from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
    const savedQuiz = localStorage.getItem(STORAGE_KEYS.QUIZ_PROGRESS);

    if (savedUser) {
      // This is a valid pattern to restore app state from localStorage
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(JSON.parse(savedUser));

      if (savedQuiz) {
        const parsedQuiz = JSON.parse(savedQuiz);
        setQuizData(parsedQuiz);
        setQuizState(QUIZ_STATES.QUIZ);
      }
    }
  }, []);

  // Handle user login
  const handleLogin = (username) => {
    const userData = { username, loginTime: new Date().toISOString() };
    setUser(userData);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
    setQuizState(QUIZ_STATES.QUIZ);
  };

  // Handle quiz completion
  const handleQuizComplete = (results) => {
    setQuizData(results);
    setQuizState(QUIZ_STATES.RESULTS);
    localStorage.removeItem(STORAGE_KEYS.QUIZ_PROGRESS);
  };

  // Handle quiz restart
  const handleRestart = () => {
    setQuizData(null);
    setQuizState(QUIZ_STATES.QUIZ);
    localStorage.removeItem(STORAGE_KEYS.QUIZ_PROGRESS);
  };

  // Handle user logout
  const handleLogout = () => {
    setUser(null);
    setQuizData(null);
    setQuizState(QUIZ_STATES.LOGIN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.QUIZ_PROGRESS);
  };

  return (
    <div className="app">
      {quizState === QUIZ_STATES.LOGIN && (
        <Login onLogin={handleLogin} />
      )}

      {quizState === QUIZ_STATES.QUIZ && user && (
        <Quiz
          user={user}
          onComplete={handleQuizComplete}
          onLogout={handleLogout}
          savedProgress={quizData}
        />
      )}

      {quizState === QUIZ_STATES.RESULTS && (
        <Results
          results={quizData}
          onRestart={handleRestart}
          onLogout={handleLogout}
          user={user}
        />
      )}
    </div>
  );
}

export default App;
