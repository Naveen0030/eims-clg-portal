import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  UserGroupIcon, 
  AcademicCapIcon, 
  CogIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  PlusCircleIcon,
  EyeIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Sidebar = ({ userInfo, onLogout, isOpen, onToggle }) => {
  const location = useLocation();

  const getNavItems = () => {
    if (!userInfo) return [];

    switch (userInfo.category) {
      case 'Admin':
        return [
          { name: 'Dashboard', href: '/admin-dashboard', icon: HomeIcon },
          { name: 'Add Course', href: '/add-course', icon: PlusCircleIcon },
          { name: 'Manage Users', href: '/manage-users', icon: UserGroupIcon },
          { name: 'All Users', href: '/all-users', icon: UsersIcon },
        ];
      case 'Instructor':
        return [
          { name: 'Dashboard', href: '/instructor-dashboard', icon: HomeIcon },
          { name: 'My Courses', href: '/my-courses', icon: BookOpenIcon },
          { name: 'Verify Students', href: '/verify-students', icon: CheckCircleIcon },
          ...(userInfo.fa ? [{ name: 'FA Validation', href: '/verify-fa', icon: ClipboardDocumentListIcon }] : []),
        ];
      case 'Student':
        return [
          { name: 'Dashboard', href: '/student-dashboard', icon: HomeIcon },
          { name: 'Enroll Course', href: '/enroll-course', icon: PlusCircleIcon },
          { name: 'My Courses', href: '/enrolled-courses', icon: BookOpenIcon },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <AcademicCapIcon className="w-8 h-8 text-blue-600" />
            <h1 className="ml-3 text-xl font-bold text-gray-900">EIMS-DEP</h1>
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
                onClick={() => window.innerWidth < 1024 && onToggle()}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Section */}
        {userInfo && (
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                {userInfo.fullName?.charAt(0) || 'U'}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{userInfo.fullName}</p>
                <p className="text-xs text-gray-500 capitalize">{userInfo.category}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              <CogIcon className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar; 