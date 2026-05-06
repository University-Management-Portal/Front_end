import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userType'); // In Login.jsx it's saved as userType (lowercase)

    // If no token, redirect to login page
    if (!token) {
        return <Navigate to="/" replace />;
    }

    // Checking roles
    if (allowedRoles && userRole) {
        const normalizedUserRole = userRole.toUpperCase();
        const normalizedAllowedRoles = allowedRoles.map(r => r.toUpperCase());

        if (!normalizedAllowedRoles.includes(normalizedUserRole)) {
            // Redirect to their respective dashboard instead of letting them see it
            if (normalizedUserRole === 'ADMIN') return <Navigate to="/admin-dashboard" replace />;
            if (normalizedUserRole === 'STAFF') return <Navigate to="/staff-dashboard" replace />;
            if (normalizedUserRole === 'STUDENT') return <Navigate to="/student-dashboard" replace />;
            return <Navigate to="/" replace />;
        }
    }

    // Authorized: render the child routes
    return <Outlet />;
};

export default ProtectedRoute;
