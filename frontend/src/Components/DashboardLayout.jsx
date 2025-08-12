import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import axiosInstance from '../utils/axiosinstance';

const DashboardLayout = ({ children, category }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          localStorage.clear();
          window.location.href = '/login';
          return;
        }

        const response = await axiosInstance.get('/get-user');
        if (response.data && response.data.user) {
          setUserInfo(response.data.user);
        } else {
          throw new Error('No user data received');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        localStorage.clear();
        window.location.href = '/login';
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        userInfo={userInfo} 
        onLogout={handleLogout}
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
      />
      
      <div className="lg:ml-64">
        <Navbar 
          userInfo={userInfo}
          onToggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout; 