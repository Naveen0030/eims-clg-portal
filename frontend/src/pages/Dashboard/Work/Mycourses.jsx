import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticatedRoute from "../../../Components/AuthenticatedRoute";
import DashboardLayout from "../../../Components/DashboardLayout";
import { 
  BookOpenIcon, 
  UserGroupIcon, 
  AcademicCapIcon,
  ArrowLeftIcon,
  EyeIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { BASE_URL } from '../../../utils/constants';

const MyCourses = () => {
    const [courses, setCourses] = useState([]); 
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    let accessToken = localStorage.getItem("token");
    const navigate = useNavigate();

    if (!accessToken) {
        console.error("Access token not found. Please log in.");
        return;
    }

    const fetchCourses = async () => {
        try {
            const response = await fetch(`${BASE_URL}/FetchCourses`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                }
            });

            const json = await response.json();
            console.log("API Response:", json);

            if (json.courses) {
                setCourses(json.courses);
                setUser(json.user);
            } else {
                console.warn("No 'courses' key found in the API response.");
            }
        } catch (e) {
            console.error("Error fetching courses:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    if (loading) {
        return (
            <AuthenticatedRoute category="Instructor">
                <DashboardLayout category="Instructor">
                    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading your courses...</p>
                        </div>
                    </div>
                </DashboardLayout>
            </AuthenticatedRoute>
        );
    }

    return (
        <AuthenticatedRoute category="Instructor">
            <DashboardLayout category="Instructor">
                <div className="min-h-screen bg-gray-50 py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                                        <BookOpenIcon className="w-8 h-8 mr-3 text-blue-600" />
                                        My Courses
                                    </h1>
                                    <p className="text-gray-600">
                                        Manage and view all your created courses
                                    </p>
                                </div>
                                <button
                                    onClick={() => navigate("/instructor-dashboard")}
                                    className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                                >
                                    <ArrowLeftIcon className="w-4 h-4 mr-2" />
                                    Back to Dashboard
                                </button>
                            </div>
                        </div>

                        {/* Stats Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <BookOpenIcon className="w-6 h-6 text-blue-600" />
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-500">Total Courses</p>
                                            <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                                <UserGroupIcon className="w-6 h-6 text-green-600" />
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-500">Total Students</p>
                                            <p className="text-2xl font-bold text-gray-900">
                                                {courses.reduce((total, course) => total + (course.enrolledStudents?.length || 0), 0)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                                <AcademicCapIcon className="w-6 h-6 text-purple-600" />
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-500">Total Credits</p>
                                            <p className="text-2xl font-bold text-gray-900">
                                                {courses.reduce((total, course) => total + (parseInt(course.Credits) || 0), 0)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Courses Table */}
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                                    <AcademicCapIcon className="w-5 h-5 mr-2 text-blue-600" />
                                    Course Details
                                </h3>
                            </div>
                            
                            {courses.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <BookOpenIcon className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No courses available</h3>
                                    <p className="text-gray-500">You haven't created any courses yet.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Course Code
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Course Name
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Instructor
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Credits
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Students
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {courses.map((course, index) => (
                                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900 bg-blue-50 px-3 py-1 rounded-full">
                                                            {course.courseCode}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900 font-medium">
                                                            {course.title}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {user?.fullName || 'N/A'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900 bg-green-50 px-3 py-1 rounded-full font-medium">
                                                            {course.Credits} Credits
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900 flex items-center">
                                                            <UserGroupIcon className="w-4 h-4 mr-2 text-gray-400" />
                                                            {course.enrolledStudents?.length || 0}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <button
                                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                                            onClick={() =>
                                                                navigate("/students", { 
                                                                    state: { 
                                                                        courseCode: course.courseCode, 
                                                                        courseName: course.title 
                                                                    } 
                                                                })
                                                            }
                                                        >
                                                            <EyeIcon className="w-4 h-4 mr-2" />
                                                            View Students
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </AuthenticatedRoute>
    );
};

export default MyCourses;
