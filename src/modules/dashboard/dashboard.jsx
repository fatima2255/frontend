import React from 'react';

const Dashboard = () => {
  const username = localStorage.getItem('username');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800">Hello, {username}!</h1>
        <p className="mt-4 text-gray-600">Welcome to your dashboard 🎉</p>
      </div>
    </div>
  );
};

export default Dashboard;
