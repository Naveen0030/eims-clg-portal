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
  ExclamationTriangleIcon,
  DocumentCheckIcon,
  EyeIcon,
  UserIcon,
  EnvelopeIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

const FAValidation = () => {
  const [pendingEnrollments, setPendingEnrollments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    approvedToday: 0
  });
  const navigate = useNavigate();

  const fetchPendingEnrollments = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/getApproved");
      if (response.data && !response.data.error) {
        // Filter out courses with no pending students
        const filteredEnrollments = response.data.pendingEnrollments.filter(
          (course) => course.pendingStudents.length > 0
        );
        setPendingEnrollments(filteredEnrollments);
        
        // Calculate stats
        const totalRequests = filteredEnrollments.reduce((total, course) => 
          total + course.pendingStudents.length, 0
        );
        setStats({
          totalRequests,
          pendingRequests: totalRequests,
          approvedToday: 0 // You can implement this based on your backend data
        });
      } else {
        console.error("Failed to fetch pending enrollments.");
      }
    } catch (error) {
      console.error("Error fetching pending enrollments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (courseId, studentId, status, faculty) => {
    try {
      const response = await axiosInstance.post("/UpdateStatus", {
        faculty,
        courseId,
        studentId,
        status,
      });
      
      if (response.data && !response.data.error) {
        // Show success message (you can replace this with a toast notification)
        alert(response.data.message);
        fetchPendingEnrollments(); // Refresh the data
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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading FA validation requests...</p>
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
                    <DocumentCheckIcon className="w-8 h-8 mr-3 text-purple-600" />
                    FA Validation Dashboard
                  </h1>
                  <p className="text-gray-600">
                    Review and approve course enrollment requests for your department
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

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <DocumentCheckIcon className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500 truncate">Total Requests</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalRequests}</p>
                      <p className="text-xs text-purple-600 flex items-center">
                        <ClockIcon className="w-3 h-3 mr-1" />
                        Pending approval
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
                        <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500 truncate">Pending Requests</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.pendingRequests}</p>
                      <p className="text-xs text-yellow-600 flex items-center">
                        <ClockIcon className="w-3 h-3 mr-1" />
                        Need attention
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
                      <p className="text-sm font-medium text-gray-500 truncate">Approved Today</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.approvedToday}</p>
                      <p className="text-xs text-green-600 flex items-center">
                        <CheckCircleIcon className="w-3 h-3 mr-1" />
                        Processed today
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            {currentCourses.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <DocumentCheckIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Pending Requests</h3>
                <p className="text-gray-600">
                  All course enrollment requests have been processed. Check back later for new requests.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {currentCourses.map((course) => (
                  <div
                    key={course.courseId}
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                  >
                    {/* Course Header */}
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 px-6 py-4 border-b border-purple-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <AcademicCapIcon className="w-6 h-6 text-purple-600 mr-3" />
                          <div>
                            <h2 className="text-xl font-semibold text-gray-900">
                              {course.courseTitle}
                            </h2>
                            <p className="text-sm text-purple-600 font-medium">
                              {course.courseCode} • FA Approval Required
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            {course.pendingStudents.length} Pending
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Students List */}
                    <div className="p-6">
                      <div className="space-y-4">
                        {course.pendingStudents.map((student) => (
                          <div
                            key={student.studentId}
                            className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-purple-300 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                  <UserIcon className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                  <h4 className="text-lg font-medium text-gray-900">
                                    {student.name}
                                  </h4>
                                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <span className="flex items-center">
                                      <EnvelopeIcon className="w-4 h-4 mr-1" />
                                      {student.email}
                                    </span>
                                    <span className="flex items-center">
                                      <BuildingOfficeIcon className="w-4 h-4 mr-1" />
                                      {student.faculty}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex space-x-3">
                                <button
                                  onClick={() =>
                                    handleUpdateStatus(
                                      course.courseId,
                                      student.studentId,
                                      "Approved",
                                      student.faculty
                                    )
                                  }
                                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                                >
                                  <CheckCircleIcon className="w-4 h-4 mr-2" />
                                  Approve
                                </button>
                                <button
                                  onClick={() =>
                                    handleUpdateStatus(
                                      course.courseId,
                                      student.studentId,
                                      "Rejected",
                                      null
                                    )
                                  }
                                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                >
                                  <XCircleIcon className="w-4 h-4 mr-2" />
                                  Reject
                                </button>
                              </div>
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
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Previous
                </button>
                
                <span className="inline-flex items-center px-4 py-2 text-sm font-medium bg-purple-100 text-purple-800 rounded-lg border border-purple-200">
                  Page {currentPage} of {totalPages}
                </span>
                
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Next
                  <ArrowLeftIcon className="w-4 h-4 ml-2 transform rotate-180" />
                </button>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </AuthenticatedRoute>
  );
};

export default FAValidation;
