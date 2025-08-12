import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import LoadingSpinner from "../../Components/LoadingSpinner";

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
        // Redirect to appropriate dashboard
        const { category } = response.data.user;
        if (category === "Student") {
          navigate("/student-dashboard");
        } else if (category === "Instructor") {
          navigate("/instructor-dashboard");
        } else if (category === "Admin") {
          navigate("/admin-dashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  // If no user info, redirect to login
  if (!userInfo) {
    navigate("/login");
    return null;
  }

  return null; // This should not be reached as we redirect above
};

export default Home;
