/**
 * Application Constants
 * Centralized configuration and constant values
 */

// Quiz Configuration
export const QUIZ_CONFIG = {
  TIME_LIMIT: 300, // 5 minutes in seconds
  QUESTIONS_COUNT: 10,
  CATEGORY: 11, // 11 = Entertainment: Film
  DIFFICULTY: 'easy',
  API_URL: 'https://opentdb.com/api.php'
};

// LocalStorage Keys
export const STORAGE_KEYS = {
  USER: 'quizUser',
  QUIZ_PROGRESS: 'quizProgress'
};

// Quiz States
export const QUIZ_STATES = {
  LOGIN: 'login',
  QUIZ: 'quiz',
  RESULTS: 'results'
};

// Character codes for answer options
export const ANSWER_OPTION_START_CODE = 65; // ASCII code for 'A'

// Timing constants
export const TIMING = {
  AUTO_ADVANCE_DELAY: 500, // milliseconds
  TIMER_INTERVAL: 1000, // milliseconds
  TIMER_WARNING_THRESHOLD: 60 // seconds
};

// Default time format
export const TIME_FORMAT = {
  MINUTES: 'mins',
  SECONDS: 'secs'
};
