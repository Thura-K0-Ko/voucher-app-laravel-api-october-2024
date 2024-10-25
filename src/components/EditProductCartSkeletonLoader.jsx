import React from "react";

const EditProductCartSkeletonLoader = () => {
  return (
    <div className="animate-pulse">
      {/* Skeleton for Product Name */}
      <div className="mb-5">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-10 bg-gray-300 rounded w-full"></div>
      </div>

      {/* Skeleton for Product Price */}
      <div className="mb-5">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-10 bg-gray-300 rounded w-full"></div>
      </div>

      {/* Skeleton for Checkbox */}
      <div className="flex items-start mb-5">
        <div className="w-4 h-4 bg-gray-300 rounded"></div>
        <div className="ml-2 h-4 bg-gray-200 rounded w-1/2"></div>
      </div>

      {/* Skeleton for Button */}                                                                                                                               
      <div className="flex gap-2 justify-start">
        <div className="h-10 w-20 bg-gray-300 rounded"></div>
        <div className="h-10 w-32 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default EditProductCartSkeletonLoader;
