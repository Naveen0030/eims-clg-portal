import React, { useState, useEffect } from "react";
import AuthenticatedRoute from "../../Components/AuthenticatedRoute";
import DashboardLayout from "../../Components/DashboardLayout";
import { Link } from "react-router-dom";
import Table from "../../Components/Table";
import LoadingSpinner from "../../Components/LoadingSpinner";
import SkeletonLoader from "../../Components/SkeletonLoader";
import axiosInstance from "../../utils/axiosinstance";
import { 
  BookOpenIcon, 
  UserGroupIcon, 
  AcademicCapIcon,
  ClockIcon,
  CheckCircleIcon,
  PlusCircleIcon,
  ArrowTrendingUpIcon,
  CalendarIcon,
  BellIcon
} from '@heroicons/react/24/outline';

const StudentDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [stats, setStats] = useState({
    enrolledCourses: 0,
    pendingRequests: 0,
    approvedCourses: 0
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get('/get-user');
        setUserInfo(response.data.user);
        
        // Fetch enrolled courses for stats
        const coursesResponse = await axiosInstance.get('/enrolled-courses');
        const courses = coursesResponse.data.enrolledCourses || [];
        
        setStats({
          enrolledCourses: courses.length,
          pendingRequests: courses.filter(c => c.status === 'Pending' || c.status === 'Pending for FA').length,
          approvedCourses: courses.filter(c => c.status === 'Approved' || c.status === 'Enrolled').length
        });
      } catch (error) {
        console.error('Error fetching user info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return (
      <AuthenticatedRoute category="Student">
        <DashboardLayout category="Student">
          <div className="min-h-screen bg-gray-50">
            <SkeletonLoader type="card" lines={3} className="mx-4 my-8" />
          </div>
        </DashboardLayout>
      </AuthenticatedRoute>
    );
  }

  return (
    <AuthenticatedRoute category="Student">
      <DashboardLayout category="Student">
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                    <AcademicCapIcon className="w-8 h-8 mr-3 text-blue-600" />
                    Welcome back, {userInfo?.fullName}! 🎓
                  </h1>
                  <p className="text-gray-600">
                    Manage your course enrollments and track your academic progress efficiently.
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <BellIcon className="w-6 h-6" />
                  </button>
                  {stats.pendingRequests > 0 && (
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BookOpenIcon className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500 truncate">Total Enrolled</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.enrolledCourses}</p>
                      <p className="text-xs text-blue-600 flex items-center">
                        <CalendarIcon className="w-3 h-3 mr-1" />
                        This semester
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <ClockIcon className="w-6 h-6 text-yellow-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500 truncate">Pending Requests</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.pendingRequests}</p>
                      <p className="text-xs text-yellow-600 flex items-center">
                        <ClockIcon className="w-3 h-3 mr-1" />
                        Awaiting approval
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircleIcon className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500 truncate">Approved Courses</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.approvedCourses}</p>
                      <p className="text-xs text-green-600 flex items-center">
                        <ArrowTrendingUpIcon className="w-3 h-3 mr-1" />
                        Active enrollments
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200 hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <PlusCircleIcon className="w-6 h-6 text-white" />
                  </div>
                  <BookOpenIcon className="w-8 h-8 text-blue-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Enroll in New Course</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Browse through available courses and enroll in new learning opportunities.
                </p>
                <Link
                  to="/enroll-course"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <PlusCircleIcon className="w-4 h-4 mr-2" />
                  Browse Courses
                </Link>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200 hover:border-green-300 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <BookOpenIcon className="w-6 h-6 text-white" />
                  </div>
                  <UserGroupIcon className="w-8 h-8 text-green-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">My Enrolled Courses</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  View and manage the courses you're currently enrolled in.
                </p>
                <Link
                  to="/enrolled-courses"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                  <BookOpenIcon className="w-4 h-4 mr-2" />
                  View My Courses
                </Link>
              </div>
            </div>

            {/* Profile Information */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                  <UserGroupIcon className="w-5 h-5 mr-2 text-blue-600" />
                  Your Profile Information
                </h3>
              </div>
              <div className="p-6">
                <Table />
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AuthenticatedRoute>
  );
};

export default StudentDashboard;
