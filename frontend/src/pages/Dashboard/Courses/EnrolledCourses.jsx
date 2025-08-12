import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosinstance';
import AuthenticatedRoute from '../../../Components/AuthenticatedRoute';
import DashboardLayout from '../../../Components/DashboardLayout';
import { 
  BookOpenIcon,
  UserIcon,
  AcademicCapIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ArrowLeftIcon,
  EyeIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const EnrolledCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/enrolled-courses');
      if (response.data && response.data.enrolledCourses) {
        const courses = response.data.enrolledCourses;
        setEnrolledCourses(courses);
        
        // Calculate stats
        setStats({
          total: courses.length,
          approved: courses.filter(c => c.status === 'Approved' || c.status === 'Enrolled').length,
          pending: courses.filter(c => c.status === 'Pending' || c.status === 'Pending for FA').length,
          rejected: courses.filter(c => c.status === 'Rejected').length
        });
      }
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
      case 'Enrolled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircleIcon className="w-3 h-3 mr-1" />
            {status}
          </span>
        );
      case 'Pending':
      case 'Pending for FA':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <ClockIcon className="w-3 h-3 mr-1" />
            {status}
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircleIcon className="w-3 h-3 mr-1" />
            {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  if (loading) {
    return (
      <AuthenticatedRoute category="Student">
        <DashboardLayout category="Student">
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your enrolled courses...</p>
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
                    <AcademicCapIcon className="w-8 h-8 mr-3 text-green-600" />
                    My Enrolled Courses
                  </h1>
                  <p className="text-gray-600">
                    Track your course enrollments and academic progress
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

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                      <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
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
                      <p className="text-sm font-medium text-gray-500">Approved</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
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
                      <p className="text-sm font-medium text-gray-500">Pending</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <XCircleIcon className="w-6 h-6 text-red-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Rejected</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Courses List */}
            {enrolledCourses.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <BookOpenIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Enrolled Courses</h3>
                <p className="text-gray-600 mb-4">
                  You haven't enrolled in any courses yet.
                </p>
                <button
                  onClick={() => navigate('/enroll-course')}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <BookOpenIcon className="w-4 h-4 mr-2" />
                  Browse Available Courses
                </button>
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                    <ChartBarIcon className="w-5 h-5 mr-2 text-blue-600" />
                    Course Enrollments
                  </h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {enrolledCourses.map((enrollment) => (
                    <div key={enrollment._id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                              <BookOpenIcon className="w-5 h-5 mr-2 text-blue-600" />
                              {enrollment.title || 'Course Title Not Available'}
                            </h4>
                            {getStatusBadge(enrollment.status)}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <AcademicCapIcon className="w-4 h-4 mr-2 text-gray-400" />
                              <span className="font-medium">Course ID:</span>
                              <span className="ml-1 font-mono">
                                {enrollment.courseCode || 'N/A'}
                              </span>
                            </div>
                            
                            <div className="flex items-center">
                              <UserIcon className="w-4 h-4 mr-2 text-gray-400" />
                              <span className="font-medium">Instructor:</span>
                              <span className="ml-1">
                                {enrollment.instructorName || 'Unknown Instructor'}
                              </span>
                            </div>
                            
                            <div className="flex items-center">
                              <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                              <span className="font-medium">Enrolled:</span>
                              <span className="ml-1">
                                {enrollment.enrollmentDate ? 
                                  new Date(enrollment.enrollmentDate).toLocaleDateString() : 'N/A'}
                              </span>
                            </div>
                          </div>

                          {enrollment.status === 'Pending' || enrollment.status === 'Pending for FA' ? (
                            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                              <div className="flex items-center">
                                <ExclamationTriangleIcon className="w-4 h-4 text-yellow-600 mr-2" />
                                <span className="text-sm text-yellow-800">
                                  Your enrollment request is being reviewed. You'll be notified once it's approved.
                                </span>
                              </div>
                            </div>
                          ) : enrollment.status === 'Rejected' ? (
                            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                              <div className="flex items-center">
                                <XCircleIcon className="w-4 h-4 text-red-600 mr-2" />
                                <span className="text-sm text-red-800">
                                  Your enrollment request was not approved. Please contact the instructor for more details.
                                </span>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </AuthenticatedRoute>
  );
};

export default EnrolledCourses;
