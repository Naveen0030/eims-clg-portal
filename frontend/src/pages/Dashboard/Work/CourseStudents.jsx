import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthenticatedRoute from "../../../Components/AuthenticatedRoute";
import DashboardLayout from "../../../Components/DashboardLayout";
import { 
  UserGroupIcon, 
  AcademicCapIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { BASE_URL } from '../../../utils/constants';

const CourseStudents = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { courseCode = "N/A", courseName = "N/A" } = location.state || {};
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log(courseCode);
    
    const fetchStudents = async () => {
        try {
            const accessToken = localStorage.getItem("token");
            if (!accessToken) {
                alert("Unauthorized! Please log in again.");
                navigate("/login");
                return;
            }
            const response = await fetch(`${BASE_URL}/FetchStudents/${courseCode}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${accessToken}`,
                },
            });

            const json = await response.json();
            console.log("Students API Response:", json);
            
            if (response.ok) {
                const enrolledStudents = json.students[0]?.enrolledStudents || [];
                if (enrolledStudents.length > 0) {
                    setStudents(enrolledStudents);
                } else {
                    setError("No students enrolled in this course.");
                }
            } else {
                setError(json.msg || "Failed to fetch students.");
            }
        } catch (e) {
            console.error("Error fetching students:", e);
            setError("An unexpected error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const filtered = students.filter((student) => student.status === "Approved");

    useEffect(() => {
        if (!courseCode) {
            navigate("/my-courses");
        } else {
            fetchStudents();
        }
    }, [courseCode]);

    if (loading) {
        return (
            <AuthenticatedRoute category="Instructor">
                <DashboardLayout category="Instructor">
                    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading students...</p>
                        </div>
                    </div>
                </DashboardLayout>
            </AuthenticatedRoute>
        );
    }

    if (error) {
        return (
            <AuthenticatedRoute category="Instructor">
                <DashboardLayout category="Instructor">
                    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
                            </div>
                            <p className="text-red-500 text-lg mb-4">{error}</p>
                            <button
                                onClick={() => navigate("/my-courses")}
                                className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                            >
                                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                                Back to Courses
                            </button>
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
                                        <UserGroupIcon className="w-8 h-8 mr-3 text-blue-600" />
                                        Students Enrolled in {courseName}
                                    </h1>
                                    <p className="text-gray-600">
                                        View all approved students for this course
                                    </p>
                                </div>
                                <button
                                    onClick={() => navigate("/my-courses")}
                                    className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                                >
                                    <ArrowLeftIcon className="w-4 h-4 mr-2" />
                                    Back to Courses
                                </button>
                            </div>
                        </div>

                        {/* Course Info Card */}
                        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
                            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                                    <AcademicCapIcon className="w-5 h-5 mr-2 text-blue-600" />
                                    Course Information
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Course Code</p>
                                        <p className="text-lg text-gray-900 font-semibold">{courseCode}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Course Name</p>
                                        <p className="text-lg text-gray-900 font-semibold">{courseName}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <UserGroupIcon className="w-6 h-6 text-blue-600" />
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-500">Total Students</p>
                                            <p className="text-2xl font-bold text-gray-900">{students.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                                <CheckCircleIcon className="w-6 h-6 text-green-600" />
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-500">Approved Students</p>
                                            <p className="text-2xl font-bold text-gray-900">{filtered.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                                <ClockIcon className="w-6 h-6 text-yellow-600" />
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-500">Pending Students</p>
                                            <p className="text-2xl font-bold text-gray-900">{students.length - filtered.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Students Table */}
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                                    <UserGroupIcon className="w-5 h-5 mr-2 text-green-600" />
                                    Enrolled Students
                                </h3>
                            </div>
                            
                            {filtered.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <UserGroupIcon className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No students enrolled</h3>
                                    <p className="text-gray-500">No students have been approved for this course yet.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Student
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Email
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Enrollment Date
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filtered.map((student, index) => (
                                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                                                <UserGroupIcon className="w-5 h-5 text-blue-600" />
                                                            </div>
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {student.name}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{student.email}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                            <CheckCircleIcon className="w-3 h-3 mr-1" />
                                                            Approved
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">
                                                            {new Date().toLocaleDateString()}
                                                        </div>
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

export default CourseStudents;
