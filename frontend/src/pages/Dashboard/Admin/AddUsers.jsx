import React, { useState } from "react";
import axiosInstance from "../../../utils/axiosinstance";
import { useNavigate, Link } from "react-router-dom";
import AuthenticatedRoute from "../../../Components/AuthenticatedRoute";
import DashboardLayout from "../../../Components/DashboardLayout";
import { 
  UserPlusIcon, 
  CheckCircleIcon, 
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';

const AddUser = () => {
    const [user, setUser] = useState({
        fullName: "",
        email: "",
        password: "",
        category: "",
        department: "",
        fa: false,
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUser({
            ...user,
            [name]: type === "checkbox" ? checked : value,
        });
        // Clear error when user starts typing
        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axiosInstance.post("/add-user", user);
            if (response.data && !response.data.error) {
                setSuccess(true);
                // Reset form
                setUser({
                    fullName: "",
                    email: "",
                    password: "",
                    category: "",
                    department: "",
                    fa: false,
                });
                
                // Redirect after 2 seconds
                setTimeout(() => {
                    navigate("/manage-users");
                }, 2000);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Failed to add user. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const departments = [
        "Computer Science",
        "Electrical Engineering", 
        "Mechanical Engineering",
        "Civil Engineering",
        "Chemical Engineering",
        "Information Technology",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
        "Other"
    ];

    return (
        <AuthenticatedRoute category="Admin">
            <DashboardLayout category="Admin">
                <div className="min-h-screen bg-gray-50 py-8">
                    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">Add New User</h1>
                                    <p className="mt-2 text-gray-600">Create a new user account with appropriate permissions</p>
                                </div>
                                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                                    <UserPlusIcon className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </div>

                        {/* Success Message */}
                        {success && (
                            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                                <div className="flex items-center">
                                    <CheckCircleIcon className="w-5 h-5 text-green-400 mr-3" />
                                    <div>
                                        <h3 className="text-sm font-medium text-green-800">User Created Successfully!</h3>
                                        <p className="text-sm text-green-700 mt-1">Redirecting to manage users...</p>
                                    </div>
                                </div>
                            </div>
                        )}

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

                        {/* Form */}
                        <div className="bg-white shadow-lg rounded-lg p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={user.fullName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Enter full name"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Enter email address"
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password *
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={user.password}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            placeholder="Enter password"
                                            minLength="6"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            {showPassword ? (
                                                <EyeSlashIcon className="w-5 h-5 text-gray-400" />
                                            ) : (
                                                <EyeIcon className="w-5 h-5 text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">Minimum 6 characters</p>
                                </div>

                                {/* Category and Department Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Category */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Role *
                                        </label>
                                        <select
                                            name="category"
                                            value={user.category}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        >
                                            <option value="">Select a role</option>
                                            <option value="Admin">Admin</option>
                                            <option value="Instructor">Instructor</option>
                                            <option value="Student">Student</option>
                                        </select>
                                    </div>

                                    {/* Department */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Department *
                                        </label>
                                        <select
                                            name="department"
                                            value={user.department}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        >
                                            <option value="">Select department</option>
                                            {departments.map((dept) => (
                                                <option key={dept} value={dept}>{dept}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Faculty Advisor Checkbox */}
                                {user.category === "Instructor" && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="fa"
                                                checked={user.fa}
                                                onChange={handleChange}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <label className="ml-3 text-sm font-medium text-blue-900">
                                                Faculty Advisor
                                            </label>
                                        </div>
                                        <p className="mt-2 text-sm text-blue-700">
                                            Faculty Advisors can approve course enrollments for their department.
                                        </p>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                                    <Link
                                        to="/manage-users"
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="inline-flex items-center px-6 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                Creating...
                                            </>
                                        ) : (
                                            <>
                                                <UserPlusIcon className="w-4 h-4 mr-2" />
                                                Create User
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </AuthenticatedRoute>
    );
};

export default AddUser;
