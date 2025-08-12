import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosinstance';
import SkeletonLoader from './SkeletonLoader';

const DynamicTable = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/get-user');
        if (response.data && response.data.user) {
          setData(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <SkeletonLoader type="card" lines={4} className="mx-4 my-8" />;
  }

  if (!data) {
    return (
      <div className="mx-4 my-8">
        <div className="card">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Data Available</h3>
            <p className="text-gray-500">Unable to load user information.</p>
          </div>
        </div>
      </div>
    );
  }

  const excludedFields = ['createdOn', '_id', "__v", "password"];

  const formatKey = (key) => {
    return key
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/^./, (str) => str.toUpperCase());
  };

  const getStatusBadge = (key, value) => {
    if (key === 'fa') {
      return (
        <span className={`badge ${value ? 'badge-success' : 'badge-pending'}`}>
          {value ? 'Yes' : 'No'}
        </span>
      );
    }
    return value;
  };

  const filteredData = Object.entries(data)
    .filter(([key]) => !excludedFields.includes(key) && (data.category === 'Instructor' || key !== 'fa'));

  return (
    <div className="mx-4 my-8">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">{data.category} Profile</h2>
          <p className="card-subtitle">Your account information and details</p>
        </div>
        
        <div className="table-container">
          <table className="table">
            <tbody className="table-body">
              {filteredData.map(([key, value], index) => (
                <tr key={index} className="table-row">
                  <td className="table-cell font-medium text-gray-700 w-1/3">
                    {formatKey(key)}
                  </td>
                  <td className="table-cell">
                    {getStatusBadge(key, value)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DynamicTable;
