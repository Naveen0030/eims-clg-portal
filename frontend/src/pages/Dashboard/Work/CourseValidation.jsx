import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosinstance";
import AuthenticatedRoute from "../../../Components/AuthenticatedRoute";
import DashboardLayout from "../../../Components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { 
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ArrowLeftIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const CourseValidation = () => {
  const [pendingEnrollments, setPendingEnrollments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(3);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPendingEnrollments = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/instructor/pending-enrollments");
      if (response.data && !response.data.error) {
        // Filter out courses with no pending students
        const filteredEnrollments = response.data.pendingEnrollments.filter(
          (course) => course.pendingStudents.length > 0
        );
        setPendingEnrollments(filteredEnrollments);
      } else {
        console.error("Failed to fetch pending enrollments.");
      }
    } catch (error) {
      console.error("Error fetching pending enrollments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (courseId, studentId, status) => {
    try {
      const response = await axiosInstance.post("/instructor/update-enrollment", {
        courseId,
        studentId,
        status,
      });
      if (response.data && !response.data.error) {
        alert(response.data.message);
        fetchPendingEnrollments();
      } else {
        alert("Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again later.");
    }
  };

  useEffect(() => {
    fetchPendingEnrollments();
  }, []);

  // Pagination logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = pendingEnrollments.slice(indexOfFirstCourse, indexOfLastCourse);

  const totalPages = Math.ceil(pendingEnrollments.length / coursesPerPage);

  if (loading) {
    return (
      <AuthenticatedRoute category="Instructor">
        <DashboardLayout category="Instructor">
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading enrollment requests...</p>
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
                    <CheckCircleIcon className="w-8 h-8 mr-3 text-green-600" />
                    Validate Enrollment Requests
                  </h1>
                  <p className="text-gray-600">
                    Review and approve student enrollment requests for your courses
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
                        <AcademicCapIcon className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Total Courses</p>
                      <p className="text-2xl font-bold text-gray-900">{pendingEnrollments.length}</p>
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
                      <p className="text-sm font-medium text-gray-500">Pending Requests</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {pendingEnrollments.reduce((total, course) => total + course.pendingStudents.length, 0)}
                      </p>
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
                      <p className="text-sm font-medium text-gray-500">Students</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {pendingEnrollments.reduce((total, course) => total + course.pendingStudents.length, 0)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enrollment Requests */}
            {pendingEnrollments.length === 0 ? (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircleIcon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No pending requests</h3>
                  <p className="text-gray-500">All enrollment requests have been processed.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {currentCourses.map((course) => (
                  <div key={course.courseId} className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
                      <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                        <AcademicCapIcon className="w-5 h-5 mr-2 text-blue-600" />
                        {course.courseTitle} ({course.courseCode})
                      </h2>
                      <p className="text-sm text-blue-600 mt-1">
                        {course.pendingStudents.length} pending student{course.pendingStudents.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    
                    <div className="p-6">
                      <div className="space-y-4">
                        {course.pendingStudents.map((student) => (
                          <div
                            key={student.studentId}
                            className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <UserGroupIcon className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="text-lg font-medium text-gray-900">
                                  {student.name}
                                </p>
                                <p className="text-gray-600 text-sm">{student.email}</p>
                                <div className="flex items-center mt-1">
                                  <ClockIcon className="w-4 h-4 text-yellow-500 mr-1" />
                                  <span className="text-xs text-yellow-600">Pending approval</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex space-x-3">
                              <button
                                onClick={() =>
                                  handleUpdateStatus(course.courseId, student.studentId, "Pending for FA")
                                }
                                className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                              >
                                <CheckCircleIcon className="w-4 h-4 mr-2" />
                                Approve
                              </button>
                              <button
                                onClick={() =>
                                  handleUpdateStatus(course.courseId, student.studentId, "Rejected")
                                }
                                className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                              >
                                <XCircleIcon className="w-4 h-4 mr-2" />
                                Reject
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {pendingEnrollments.length > 0 && (
              <div className="mt-8 flex justify-center">
                <div className="bg-white shadow rounded-lg px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ArrowLeftIcon className="w-4 h-4 mr-2" />
                      Previous
                    </button>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-700">Page</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-md">
                        {currentPage}
                      </span>
                      <span className="text-sm text-gray-700">of</span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-md">
                        {totalPages}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                      <ArrowLeftIcon className="w-4 h-4 ml-2 transform rotate-180" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </AuthenticatedRoute>
  );
};

export default CourseValidation;
