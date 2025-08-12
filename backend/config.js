// ===========================================
// 🔗 HOSTING DEPLOYMENT - CHANGE THESE LINKS 🔗
// ===========================================
// When deploying, change these URLs to your production endpoints
// ===========================================

// Backend API Base URL (for internal API calls)
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8000';

// Frontend URL (for CORS configuration)
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Database configuration
const DB_CONFIG = {
    // Add your database configuration here if needed
};

// Export all configuration
module.exports = {
    API_BASE_URL,
    FRONTEND_URL,
    DB_CONFIG,
    
    // Helper function to build API URLs
    buildApiUrl: (endpoint) => `${API_BASE_URL}${endpoint}`,
    
    // Common API endpoints
    ENDPOINTS: {
        FACULTY_ADVISOR: `${API_BASE_URL}/facultyadvisor`,
        GET_USER: `${API_BASE_URL}/get-user`,
        VIEW_USER: (id) => `${API_BASE_URL}/view-user/${id}`,
        // Add more endpoints as needed
    }
};

// ===========================================
// 🔗 ENVIRONMENT VARIABLES SUPPORT 🔗
// ===========================================
// Create a .env file in your backend directory with:
// API_BASE_URL=https://your-production-backend-url.com
// FRONTEND_URL=https://your-production-frontend-url.com
// ===========================================
