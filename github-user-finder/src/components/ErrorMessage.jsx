import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-500/20 border border-red-500 text-white p-4 rounded-md my-4 max-w-md mx-auto">
      <p className="font-medium">Error</p>
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default ErrorMessage;