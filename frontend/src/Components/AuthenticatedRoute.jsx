import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosinstance";

const AuthenticatedRoute = ({ category, children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          localStorage.clear();
          navigate("/login");
          return;
        }

        const response = await axiosInstance.get("/get-user");
        if (response.data && response.data.user) {
          if (response.data.user.category === category) {
            setUserInfo(response.data.user);
          } else {
            alert("Unauthorized access");
            navigate("/login");
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Authentication error:", error);
        if (error.response && error.response.status === 401) {
          localStorage.clear();
          navigate("/login");
        } else {
          // Handle other errors gracefully
          console.error("Error fetching user info:", error);
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [category, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthenticatedRoute;
