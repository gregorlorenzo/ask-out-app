import React from 'react';

const DashboardContent = () => (
    <>
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p className="mb-2">Welcome to the admin dashboard. Here you can manage various aspects of the system.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold mb-2">User Management</h2>
                <p>Manage user accounts and permissions.</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold mb-2">Content Management</h2>
                <p>Create, edit, and publish content.</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold mb-2">Analytics</h2>
                <p>View site statistics and user engagement data.</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold mb-2">Settings</h2>
                <p>Configure system settings and preferences.</p>
            </div>
        </div>
    </>
);

export default DashboardContent;