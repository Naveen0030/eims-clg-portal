import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../../utils/axiosinstance";
import AuthenticatedRoute from "../../../Components/AuthenticatedRoute";
import DashboardLayout from "../../../Components/DashboardLayout";
import { 
  ArrowLeftIcon,
  UserIcon,
  AcademicCapIcon,
  CogIcon,
  UserGroupIcon,
  ExclamationCircleIcon,
  CalendarIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

const ViewUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/view-user/${id}`);
                if (response.data && !response.data.error) {
                    setUser(response.data.userDetails);
                }
            } catch (error) {
                setError("Failed to fetch user details. Please try again.");
                console.error("Error fetching user details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'Admin':
                return <CogIcon className="w-6 h-6 text-purple-600" />;
            case 'Instructor':
                return <AcademicCapIcon className="w-6 h-6 text-blue-600" />;
            case 'Student':
                return <UserGroupIcon className="w-6 h-6 text-green-600" />;
            default:
                return <UserIcon className="w-6 h-6 text-gray-600" />;
        }
    };

    const getCategoryBadge = (category) => {
        const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";
        switch (category) {
            case 'Admin':
                return `${baseClasses} bg-purple-100 text-purple-800`;
            case 'Instructor':
                return `${baseClasses} bg-blue-100 text-blue-800`;
            case 'Student':
                return `${baseClasses} bg-green-100 text-green-800`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800`;
        }
    };

    if (loading) {
        return (
            <AuthenticatedRoute category="Admin">
                <DashboardLayout category="Admin">
                    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                </DashboardLayout>
            </AuthenticatedRoute>
        );
    }

    return (
        <AuthenticatedRoute category="Admin">
            <DashboardLayout category="Admin">
                <div className="min-h-screen bg-gray-50 py-8">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Link
                                        to="/all-users"
                                        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors mr-4"
                                    >
                                        <ArrowLeftIcon className="w-4 h-4 mr-2" />
                                        Back to Users
                                    </Link>
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
                                        <p className="mt-2 text-gray-600">View detailed information about this user</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                                <div className="flex items-center">
                                    <ExclamationCircleIcon className="w-5 h-5 text-red-400 mr-3" />
                                    <div>
                                        <h3 className="text-sm font-medium text-red-800">Error</h3>
                                        <p className="text-sm text-red-700 mt-1">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {user ? (
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                {/* User Header */}
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="h-20 w-20 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                                                <span className="text-2xl font-bold text-white">
                                                    {user.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="ml-6">
                                            <h2 className="text-2xl font-bold text-white">{user.fullName}</h2>
                                            <p className="text-blue-100">{user.email}</p>
                                            <div className="mt-2">
                                                <span className={getCategoryBadge(user.category)}>
                                                    {getCategoryIcon(user.category)}
                                                    <span className="ml-2">{user.category}</span>
                                                </span>
                                                {user.fa && user.category === 'Instructor' && (
                                                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                                        Faculty Advisor
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* User Details */}
                                <div className="px-6 py-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Basic Information */}
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                                            <dl className="space-y-4">
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                                                        <UserIcon className="w-4 h-4 mr-2" />
                                                        Full Name
                                                    </dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{user.fullName}</dd>
                                                </div>
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                                                </div>
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                                                        {getCategoryIcon(user.category)}
                                                        <span className="ml-2">Role</span>
                                                    </dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{user.category}</dd>
                                                </div>
                                            </dl>
                                        </div>

                                        {/* Additional Information */}
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
                                            <dl className="space-y-4">
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                                                        <BuildingOfficeIcon className="w-4 h-4 mr-2" />
                                                        Department
                                                    </dt>
                                                    <dd className="mt-1 text-sm text-gray-900">
                                                        {user.department || 'Not assigned'}
                                                    </dd>
                                                </div>
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                                                        <CalendarIcon className="w-4 h-4 mr-2" />
                                                        Account Created
                                                    </dt>
                                                    <dd className="mt-1 text-sm text-gray-900">
                                                        {new Date(user.createdOn).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </dd>
                                                </div>
                                                {user.category === "Instructor" && (
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500">Faculty Advisor Status</dt>
                                                        <dd className="mt-1 text-sm text-gray-900">
                                                            {user.fa ? (
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                                                    Yes - Can approve enrollments
                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                                    No - Regular instructor
                                                                </span>
                                                            )}
                                                        </dd>
                                                    </div>
                                                )}
                                            </dl>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-8 pt-6 border-t border-gray-200">
                                        <div className="flex justify-between items-center">
                                            <Link
                                                to="/all-users"
                                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                            >
                                                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                                                Back to All Users
                                            </Link>
                                            <div className="flex space-x-3">
                                                <button
                                                    onClick={() => window.print()}
                                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                                >
                                                    Print Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white shadow-lg rounded-lg p-8 text-center">
                                <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900">User not found</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    The user you're looking for doesn't exist or has been removed.
                                </p>
                                <div className="mt-6">
                                    <Link
                                        to="/all-users"
                                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                    >
                                        <ArrowLeftIcon className="w-4 h-4 mr-2" />
                                        Back to All Users
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </DashboardLayout>
        </AuthenticatedRoute>
    );
};

export default ViewUser;
