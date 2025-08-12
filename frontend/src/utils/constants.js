// ===========================================
// 🔗 HOSTING DEPLOYMENT - CHANGE THESE LINKS 🔗
// ===========================================
// When deploying to Render/Vercel/Netlify, change these URLs to your production endpoints
// Examples:
// - Render: https://your-app-name.onrender.com
// - Vercel: https://your-app-name.vercel.app/api
// - Netlify: https://your-app-name.netlify.app/.netlify/functions/api
// - Custom domain: https://api.yourdomain.com
// ===========================================

// Main API Base URL (Most Important - Change this one and all others will update)
export const BASE_URL = 'http://localhost:8000'

// Frontend URL (for CORS and redirects)
export const FRONTEND_URL = 'http://localhost:5173'

// Specific API endpoints (these will automatically use BASE_URL)
export const API_ENDPOINTS = {
    // User management
    GET_USER: `${BASE_URL}/get-user`,
    VIEW_USER: (id) => `${BASE_URL}/view-user/${id}`,
    ALL_USERS: `${BASE_URL}/all-users`,
    ADD_USER: `${BASE_URL}/add-user`,
    
    // Authentication
    SEND_OTP: `${BASE_URL}/send-otp`,
    VERIFY_OTP: `${BASE_URL}/verify-otp`,
    SEND_LOGIN_OTP: `${BASE_URL}/send-login-otp`,
    VERIFY_LOGIN_OTP: `${BASE_URL}/verify-login-otp`,
    
    // Courses
    COURSES: `${BASE_URL}/courses`,
    OFFER_COURSE: `${BASE_URL}/offer-course`,
    FETCH_COURSES: `${BASE_URL}/FetchCourses`,
    AVAILABLE_COURSES: `${BASE_URL}/available-courses`,
    ENROLL_COURSE: `${BASE_URL}/enroll-course`,
    ENROLLED_COURSES: `${BASE_URL}/enrolled-courses`,
    
    // Instructors
    INSTRUCTORS: `${BASE_URL}/instructors`,
    INSTRUCTOR_PENDING_ENROLLMENTS: `${BASE_URL}/instructor/pending-enrollments`,
    INSTRUCTOR_UPDATE_ENROLLMENT: `${BASE_URL}/instructor/update-enrollment`,
    
    // Faculty Advisor
    FACULTY_ADVISOR: `${BASE_URL}/facultyadvisor`,
    GET_APPROVED: `${BASE_URL}/getApproved`,
    UPDATE_STATUS: `${BASE_URL}/UpdateStatus`,
    
    // Users
    USERS: `${BASE_URL}/users`,
}

// ===========================================
// 🔗 ENVIRONMENT VARIABLES SUPPORT 🔗
// ===========================================
// Uncomment the lines below to use environment variables instead
// export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
// export const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173'
// ===========================================