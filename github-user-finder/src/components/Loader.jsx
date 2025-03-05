import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loader = ({ size = 40 }) => {
  return (
    <div className="flex justify-center items-center py-8">
      <ClipLoader color="#3b82f6" size={size} />
    </div>
  );
};

export default Loader;