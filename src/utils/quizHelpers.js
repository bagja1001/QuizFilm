/**
 * Quiz Helper Functions
 * Reusable utility functions for quiz operations
 */

/**
 * Decode HTML entities
 * @param {string} html - HTML string to decode
 * @returns {string} Decoded text
 */
export const decodeHTML = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

/**
 * Shuffle array elements randomly
 * @param {array} array - Array to shuffle
 * @returns {array} Shuffled array
 */
export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * Format seconds to mm:ss format
 * @param {number} seconds - Total seconds
 * @returns {string} Formatted time string
 */
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Format time spent to human readable format
 * @param {number} seconds - Total seconds
 * @returns {string} Formatted time string (e.g., "5m 30s")
 */
export const formatTimeSpent = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
};

/**
 * Get grade information based on percentage
 * @param {number} percentage - Score percentage
 * @returns {object} Grade info with grade, color, and message
 */
export const getGrade = (percentage) => {
  if (percentage >= 90) return { grade: 'A+', color: '#10b981', message: 'Outstanding!' };
  if (percentage >= 80) return { grade: 'A', color: '#10b981', message: 'Excellent!' };
  if (percentage >= 70) return { grade: 'B', color: '#3b82f6', message: 'Great Job!' };
  if (percentage >= 60) return { grade: 'C', color: '#f59e0b', message: 'Good Effort!' };
  if (percentage >= 50) return { grade: 'D', color: '#f97316', message: 'Keep Trying!' };
  return { grade: 'F', color: '#ef4444', message: 'Need Improvement' };
};

/**
 * Calculate progress percentage
 * @param {number} current - Current index
 * @param {number} total - Total items
 * @returns {number} Progress percentage
 */
export const getProgressPercentage = (current, total) => {
  return total > 0 ? ((current + 1) / total) * 100 : 0;
};

/**
 * Validate username
 * @param {string} username - Username to validate
 * @returns {object} Validation result with valid field and error message
 */
export const validateUsername = (username) => {
  if (!username.trim()) {
    return { valid: false, error: 'Please enter your name' };
  }
  if (username.trim().length < 3) {
    return { valid: false, error: 'Name must be at least 3 characters' };
  }
  return { valid: true, error: '' };
};
