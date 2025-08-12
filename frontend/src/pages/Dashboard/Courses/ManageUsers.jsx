import React from "react";
import { Link } from "react-router-dom";
import AuthenticatedRoute from "../../../Components/AuthenticatedRoute";
import DashboardLayout from "../../../Components/DashboardLayout";
import { 
  UserPlusIcon,
  UserGroupIcon,
  AcademicCapIcon,
  CogIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const ManageUsers = () => {
    return (
        <AuthenticatedRoute category="Admin">
            <DashboardLayout category="Admin">
                <div className="min-h-screen bg-gray-50 py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
                                    <p className="mt-2 text-gray-600">
                                        Add new users and manage existing user accounts in the system
                                    </p>
                                </div>
                                <Link
                                    to="/admin-dashboard"
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                >
                                    Back to Dashboard
                                </Link>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <UserPlusIcon className="h-6 w-6 text-blue-400" />
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 truncate">Add New User</dt>
                                                <dd className="text-lg font-medium text-gray-900">Create Account</dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <UserGroupIcon className="h-6 w-6 text-green-400" />
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 truncate">View All Users</dt>
                                                <dd className="text-lg font-medium text-gray-900">Manage Accounts</dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <CogIcon className="h-6 w-6 text-purple-400" />
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 truncate">System Control</dt>
                                                <dd className="text-lg font-medium text-gray-900">Admin Panel</dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Cards */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Add User Card */}
                            <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <div className="p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <UserPlusIcon className="w-6 h-6 text-blue-600" />
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <h2 className="text-xl font-semibold text-gray-900">Add New User</h2>
                                            <p className="text-sm text-gray-500">Create user accounts</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mb-6">
                                        Create new user accounts by entering their details including name, email, password, department, and role. Users can be assigned as Students, Instructors, or Admins.
                                    </p>
                                    <Link
                                        to="/add-user"
                                        className="inline-flex items-center w-full justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                    >
                                        Add User
                                        <ArrowRightIcon className="w-4 h-4 ml-2" />
                                    </Link>
                                </div>
                            </div>

                            {/* View All Users Card */}
                            <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <div className="p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                                <UserGroupIcon className="w-6 h-6 text-green-600" />
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <h2 className="text-xl font-semibold text-gray-900">View All Users</h2>
                                            <p className="text-sm text-gray-500">Manage existing users</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mb-6">
                                        View and manage all registered users in the system. Search, filter, and view detailed information about each user including their roles, departments, and account status.
                                    </p>
                                    <Link
                                        to="/all-users"
                                        className="inline-flex items-center w-full justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                                    >
                                        View Users
                                        <ArrowRightIcon className="w-4 h-4 ml-2" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions Section */}
                        <div className="mt-12 bg-white shadow rounded-lg overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                                    <CogIcon className="w-5 h-5 mr-2 text-purple-600" />
                                    Quick Actions
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Link
                                        to="/add-course"
                                        className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                                    >
                                        <AcademicCapIcon className="w-5 h-5 text-blue-600 mr-3" />
                                        <span className="text-sm font-medium text-gray-900">Add Course</span>
                                    </Link>
                                    <Link
                                        to="/manage-users"
                                        className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
                                    >
                                        <UserGroupIcon className="w-5 h-5 text-green-600 mr-3" />
                                        <span className="text-sm font-medium text-gray-900">User Management</span>
                                    </Link>
                                    <Link
                                        to="/admin-dashboard"
                                        className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
                                    >
                                        <CogIcon className="w-5 h-5 text-purple-600 mr-3" />
                                        <span className="text-sm font-medium text-gray-900">Admin Dashboard</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </AuthenticatedRoute>
    );
};

export default ManageUsers;
