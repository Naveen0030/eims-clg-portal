import React, { useState, useEffect } from "react";
import AuthenticatedRoute from "../../Components/AuthenticatedRoute";
import DashboardLayout from "../../Components/DashboardLayout";
import { Link } from "react-router-dom";
import Table from "../../Components/Table";
import SkeletonLoader from "../../Components/SkeletonLoader";
import axiosInstance from "../../utils/axiosinstance";
import { 
  PlusCircleIcon, 
  UserGroupIcon, 
  AcademicCapIcon,
  CogIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalStudents: 0,
    totalInstructors: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch stats
        const usersResponse = await axiosInstance.get('/all-users');
        const users = usersResponse.data.users || [];
        
        setStats({
          totalUsers: users.length,
          totalStudents: users.filter(u => u.category === 'Student').length,
          totalInstructors: users.filter(u => u.category === 'Instructor').length,
          totalCourses: 0 // You can add course count API if available
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SkeletonLoader type="card" lines={3} className="mx-4 my-8" />
      </div>
    );
  }

  return (
    <AuthenticatedRoute category="Admin">
      <DashboardLayout category="Admin">
        <main className="p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Manage courses, users, and system settings.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <UserGroupIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <AcademicCapIcon className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Students</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <CogIcon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Instructors</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalInstructors}</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <ChartBarIcon className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Courses</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Add New Course
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Create and manage courses for instructors to offer.
                  </p>
                  <Link
                    to="/add-course"
                    className="btn-primary inline-flex items-center"
                  >
                    <PlusCircleIcon className="w-4 h-4 mr-2" />
                    Add Course
                  </Link>
                </div>
                <div className="hidden md:block">
                  <PlusCircleIcon className="w-16 h-16 text-blue-100" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Manage Users
                  </h3>
                  <p className="text-gray-600 mb-4">
                    View and manage instructors, students, and admins.
                  </p>
                  <Link
                    to="/manage-users"
                    className="btn-primary inline-flex items-center"
                  >
                    <UserGroupIcon className="w-4 h-4 mr-2" />
                    Manage Users
                  </Link>
                </div>
                <div className="hidden md:block">
                  <UserGroupIcon className="w-16 h-16 text-green-100" />
                </div>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <Table />
        </main>
      </DashboardLayout>
    </AuthenticatedRoute>
  );
};

export default AdminDashboard;
