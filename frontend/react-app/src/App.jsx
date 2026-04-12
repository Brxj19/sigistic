import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

// Core Components
import Navbar from './components/Navbar';
import Sidebar from './components/layout/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import RoleRoute from './components/RoleRoute';

// Auth Pages
import UserLogin from './pages/auth/UserLogin';
import UserSignup from './pages/auth/UserSignup';
import StaffLogin from './pages/auth/StaffLogin';
import DeliverySignup from './pages/auth/DeliverySignup';
import VerifyOtp from './pages/auth/VerifyOtp';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import OAuthSuccess from './pages/auth/OAuthSuccess';

// User Dashboards & Profiles
import UserDashboard from './pages/user/UserDashboard';
import UserProfile from './pages/user/UserProfile';

// Delivery Dashboards & Profiles
import DeliveryDashboard from './pages/delivery/DeliveryDashboard';
import DeliveryProfile from './pages/delivery/DeliveryProfile';

// Admin Modules
import AdminDashboard from './pages/AdminDashboard';
import AdminProfile from './pages/AdminProfile';
import AgentManagement from './pages/AgentManagement';
import ShipmentManagement from './pages/ShipmentManagement';
import LocationManagement from './pages/LocationManagement';
import RuleManagement from './pages/RuleManagement';
import AllUsers from './pages/AllUsers';

function App() {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const getHomeRoute = () => {
    if (!isAuthenticated) return '/login';
    if (role === 'admin') return '/admin';
    if (role === 'delivery') return '/delivery/dashboard';
    return '/dashboard'; // default user dashboard
  };

  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col relative overflow-hidden font-sans">
        {/* Background Effects (Reference Style) */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent/20 blur-[120px] rounded-full pointer-events-none"></div>

        <Navbar onMenuToggle={() => setMobileSidebarOpen((o) => !o)} />

        <div className="flex flex-1 overflow-hidden">

          {/* Conditional Admin Sidebar */}
          <Routes>
            <Route
              path="/admin/*"
              element={
                <Sidebar
                  mobileOpen={mobileSidebarOpen}
                  onMobileClose={() => setMobileSidebarOpen(false)}
                />
              }
            />
          </Routes>

          {/* Main content area - removed p-4 to fix the gap */}
          <main className="flex-1 relative overflow-x-hidden overflow-y-auto">
            <Routes>
              {/* Public Redirection */}
              <Route path="/" element={<Navigate to={getHomeRoute()} replace />} />
              <Route path="/oauth-success" element={<OAuthSuccess />} />

              {/* Authentication Routes */}
              <Route path="/login" element={<UserLogin />} />
              <Route path="/signup" element={<UserSignup />} />
              <Route path="/staff/login" element={<StaffLogin />} />
              <Route path="/delivery/signup" element={<DeliverySignup />} />
              <Route path="/verify-otp" element={<VerifyOtp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* User Routes */}
              <Route
                path="/dashboard"
                element={
                  <RoleRoute allowedRoles={['user', 'Vendar']}>
                    <UserDashboard />
                  </RoleRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <RoleRoute allowedRoles={['user', 'Vendar']}>
                    <UserProfile />
                  </RoleRoute>
                }
              />

              {/* Delivery Routes */}
              <Route
                path="/delivery/dashboard"
                element={
                  <RoleRoute allowedRoles={['delivery']}>
                    <DeliveryDashboard />
                  </RoleRoute>
                }
              />
              <Route
                path="/delivery/profile"
                element={
                  <RoleRoute allowedRoles={['delivery']}>
                    <DeliveryProfile />
                  </RoleRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <RoleRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </RoleRoute>
                }
              />
              <Route
                path="/admin/dashboard"
                element={
                  <RoleRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </RoleRoute>
                }
              />
              <Route
                path="/admin/profile"
                element={
                  <RoleRoute allowedRoles={['admin']}>
                    <AdminProfile />
                  </RoleRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <RoleRoute allowedRoles={['admin']}>
                    <AllUsers />
                  </RoleRoute>
                }
              />
              <Route
                path="/admin/agents"
                element={
                  <RoleRoute allowedRoles={['admin']}>
                    <AgentManagement />
                  </RoleRoute>
                }
              />
              <Route
                path="/admin/locations"
                element={
                  <RoleRoute allowedRoles={['admin']}>
                    <LocationManagement />
                  </RoleRoute>
                }
              />
              <Route
                path="/admin/rules"
                element={
                  <RoleRoute allowedRoles={['admin']}>
                    <RuleManagement />
                  </RoleRoute>
                }
              />
              <Route
                path="/admin/shipments"
                element={
                  <RoleRoute allowedRoles={['admin']}>
                    <ShipmentManagement />
                  </RoleRoute>
                }
              />

              {/* Catch-All Fallback */}
              <Route path="*" element={<Navigate to={getHomeRoute()} replace />} />
            </Routes>
          </main>
        </div>

        <footer className="relative z-10 py-6 text-center text-gray-500 font-medium text-sm border-t border-gray-200/50 bg-white/50 backdrop-blur-md">
          &copy; {new Date().getFullYear()} Sigistics. All rights reserved.
        </footer>
      </div>
      <Toaster position="top-right" containerClassName="mt-16" />
    </Router>
  );
}

export default App;