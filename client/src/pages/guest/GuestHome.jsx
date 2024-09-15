// src/pages/guest/GuestHome.jsx
import React from 'react';

const GuestHome = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Guest Home</h1>
      <p className="mb-2">This is the home page for guest users.</p>
      <ul className="list-disc list-inside">
        <li>View available content</li>
        <li>Explore guest features</li>
        <li>Contact support</li>
      </ul>
    </div>
  );
};

export default GuestHome;