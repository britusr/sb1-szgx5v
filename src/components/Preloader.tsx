import React from 'react';

const Preloader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Loading 3D World</h2>
        <div className="w-64 h-4 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300 ease-out"
            style={{ width: '100%' }}
          ></div>
        </div>
        <p className="mt-2 text-xl">100%</p>
      </div>
    </div>
  );
};

export default Preloader;