import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosinstance';
import { Dialog } from '@headlessui/react';
import AuthenticatedRoute from '../../../Components/AuthenticatedRoute';
import DashboardLayout from '../../../Components/DashboardLayout';
import { 
  BookOpenIcon,
  PlusCircleIcon,
  AcademicCapIcon,
  UserIcon,
  CalendarIcon,
  ClockIcon,
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const EnrollCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [instructorName, setInstructorName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const getAllCourses = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/available-courses?page=${page}&limit=10`);
      if (response.data && response.data.courses) {
        setCourses(response.data.courses);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.log('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchInstructorName = async (instructorId) => {
    try {
      if (!instructorId) {
        setInstructorName('Unknown Instructor');
        return;
      }

      const response = await axiosInstance.get(`/view-user/${instructorId}`);
      if (response.data && !response.data.error && response.data.userDetails) {
        setInstructorName(response.data.userDetails.fullName || 'Unknown Instructor');
      } else {
        setInstructorName('Unknown Instructor');
      }
    } catch (error) {
      console.error('Error fetching instructor details:', error);
      setInstructorName('Unknown Instructor');
    }
  };

  useEffect(() => {
    getAllCourses(currentPage);
  }, [currentPage]);

  const handleSendRequest = async (courseId) => {
    try {
      const response = await axiosInstance.post(`/enroll-course`, { courseId });
      if (response.data && !response.data.error) {
        alert('Request sent to the instructor successfully.');
        setShowPopup(false);
        getAllCourses(currentPage);
      } else {
        alert(response.data.message || 'Failed to send the request.');
      }
    } catch (error) {
      console.error('Error sending request:', error);
      alert(error.response?.data?.message || 'Failed to send the request. Please try again later.');
    }
  };

  const filteredCourses = courses.filter(course =>
    course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.courseCode?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <AuthenticatedRoute category="Student">
        <DashboardLayout category="Student">
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading available courses...</p>
            </div>
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
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                    <BookOpenIcon className="w-8 h-8 mr-3 text-blue-600" />
                    Available Courses
                  </h1>
                  <p className="text-gray-600">
                    Browse and enroll in courses offered by our instructors
                  </p>
                </div>
                <button
                  onClick={() => navigate('/student-dashboard')}
                  className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search courses by title or code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Courses Grid */}
            {filteredCourses.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <BookOpenIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Courses Available</h3>
                <p className="text-gray-600">
                  {searchTerm ? 'No courses match your search criteria.' : 'No courses available at the moment. Please check back later.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredCourses.map((course) => (
                  <div key={course._id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300">
                    <div className="p-6">
                      {/* Course Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <BookOpenIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="text-right">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircleIcon className="w-3 h-3 mr-1" />
                            Available
                          </span>
                        </div>
                      </div>

                      {/* Course Info */}
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                          {course.title}
                        </h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <AcademicCapIcon className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="font-medium">Course ID:</span>
                            <span className="ml-1 font-mono">{course.courseCode}</span>
                          </div>
                          {course.department && (
                            <div className="flex items-center">
                              <UserIcon className="w-4 h-4 mr-2 text-gray-400" />
                              <span className="font-medium">Department:</span>
                              <span className="ml-1">{course.department}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={async () => {
                          setSelectedCourse(course);
                          await fetchInstructorName(course.instructor);
                          setShowPopup(true);
                        }}
                        className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      >
                        <PlusCircleIcon className="w-4 h-4 mr-2" />
                        Enroll Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center space-x-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <ChevronLeftIcon className="w-4 h-4 mr-2" />
                  Previous
                </button>
                
                <span className="inline-flex items-center px-4 py-2 text-sm font-medium bg-blue-100 text-blue-800 rounded-lg border border-blue-200">
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
                  <ChevronRightIcon className="w-4 h-4 ml-2" />
                </button>
              </div>
            )}
          </div>

          {/* Popup Dialog */}
          {showPopup && selectedCourse && (
            <Dialog open={showPopup} onClose={() => setShowPopup(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <BookOpenIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Confirm Enrollment</h2>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <BookOpenIcon className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="text-gray-700"><strong>Course:</strong> {selectedCourse.title}</span>
                  </div>
                  <div className="flex items-center">
                    <UserIcon className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="text-gray-700"><strong>Instructor:</strong> {instructorName}</span>
                  </div>
                  <div className="flex items-center">
                    <AcademicCapIcon className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="text-gray-700"><strong>Course ID:</strong> {selectedCourse.courseCode}</span>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowPopup(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSendRequest(selectedCourse._id.toString())}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Confirm Enrollment
                  </button>
                </div>
              </div>
            </Dialog>
          )}
        </div>
      </DashboardLayout>
    </AuthenticatedRoute>
  );
};

export default EnrollCourse;
