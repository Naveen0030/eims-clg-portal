import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Profile from './Profile';
import { useNavigate } from "react-router-dom";

const Navbar = ({ userInfo, onLogout, onToggleSidebar, isSidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Menu button and logo */}
          <div className="flex items-center">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
            >
              {isSidebarOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
            
            <div className="ml-4 lg:ml-0 flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-gray-900">
                  EIMS-Portal
                </h1>
                <p className="text-xs text-gray-500">IIT Bhubaneswar</p>
              </div>
            </div>
          </div>

          {/* Right side - User profile */}
          <div className="flex items-center">
            {userInfo && (
              <Profile userInfo={userInfo} onLogout={handleLogout} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
