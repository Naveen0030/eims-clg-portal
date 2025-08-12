import React from 'react';

const SkeletonLoader = ({ type = 'card', lines = 3, className = '' }) => {
  const renderCardSkeleton = () => (
    <div className={`card ${className}`}>
      <div className="skeleton-title w-3/4"></div>
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className="skeleton-text w-full"></div>
      ))}
      <div className="skeleton-text w-1/2 mt-4"></div>
    </div>
  );

  const renderTableSkeleton = () => (
    <div className="table-container">
      <div className="p-6">
        <div className="skeleton-title w-1/3 mb-6"></div>
        <div className="space-y-4">
          {Array.from({ length: lines }).map((_, index) => (
            <div key={index} className="flex space-x-4">
              <div className="skeleton-text w-1/4"></div>
              <div className="skeleton-text w-1/3"></div>
              <div className="skeleton-text w-1/4"></div>
              <div className="skeleton-text w-1/6"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderListSkeleton = () => (
    <div className="space-y-4">
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="skeleton-text w-2/3 mb-2"></div>
          <div className="skeleton-text w-1/2"></div>
        </div>
      ))}
    </div>
  );

  switch (type) {
    case 'table':
      return renderTableSkeleton();
    case 'list':
      return renderListSkeleton();
    case 'card':
    default:
      return renderCardSkeleton();
  }
};

export default SkeletonLoader; 