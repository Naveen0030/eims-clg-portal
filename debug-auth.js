// ===========================================
// 🔗 HOSTING DEPLOYMENT - CHANGE THESE LINKS 🔗
// ===========================================
// When deploying, change these URLs to your backend API endpoints
// ===========================================
// Import the centralized URL constants
import { BASE_URL } from './frontend/src/utils/constants.js';

// Debug script to test authentication
// Run this in the browser console to debug auth issues

const debugAuth = async () => {
  console.log('=== Authentication Debug ===');
  
  // Check if token exists
  const token = localStorage.getItem('token');
  console.log('Token exists:', !!token);
  if (token) {
    console.log('Token length:', token.length);
    console.log('Token preview:', token.substring(0, 20) + '...');
  }
  
  // Test get-user endpoint
  try {
    const response = await fetch(`${BASE_URL}/get-user`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('get-user response status:', response.status);
    const data = await response.json();
    console.log('get-user response data:', data);
    
    if (response.ok && data.user) {
      console.log('User authenticated successfully:', {
        id: data.user._id,
        name: data.user.fullName,
        category: data.user.category,
        department: data.user.department
      });
    }
  } catch (error) {
    console.error('get-user request failed:', error);
  }
  
  // ===========================================
  // 🔗 HOSTING DEPLOYMENT - CHANGE THIS LINK 🔗
  // ===========================================
  // When deploying, change this URL to your backend API endpoint
  // ===========================================
  // Test view-user endpoint with a sample ID
  if (token) {
    try {
      const response = await fetch(`${BASE_URL}/view-user/507f1f77bcf86cd799439011`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('view-user response status:', response.status);
      const data = await response.json();
      console.log('view-user response data:', data);
    } catch (error) {
      console.error('view-user request failed:', error);
    }
  }
};

// Run the debug function
debugAuth();
