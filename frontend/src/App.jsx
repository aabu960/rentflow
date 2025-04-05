import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute"; // Protected Route wrapper

const Sidebar = lazy(() => import("./components/Sidebar.jsx"));
const Dashboard = lazy(() => import("./components/admin-Dashboard.jsx"));
const Customers = lazy(() => import("./pages/Customers.jsx"));
const KanbanBoard = lazy(() => import("./Apps/KanbanBoard.jsx"));
const CalendarApp = lazy(() => import("./Apps/CalendarApp.jsx"));
const AuthForm = lazy(() => import("./components/AuthForm.jsx"));
const ForgotPassword = lazy(() => import("./components/ForgotPassword.jsx"));
const Unauthorized = lazy(() => import("./pages/Unauthorized.jsx"));
const UserDashboard = lazy(() => import("./pages/UserDashboard.jsx"));
const Properties = lazy(() => import("./pages/properties.jsx"));
// const AdminProperties = lazy(() => import("./pages/AdminProperties.jsx"));
const UserProperties = lazy(() => import("./components/UserProperties.jsx"));
const PropertyDetailPage = lazy(() => import("./components/PropertyDetailPage.jsx"));
const PaymentPage = lazy(() => import("./pages/PaymentPage.jsx"));
const LandingPage = lazy(() => import("./pages/LandingPage.jsx"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
        <div className="flex">
          {/* <Sidebar /> Sidebar only loads when needed */}
          <main className="flex-1 p-4">
            <Routes>
              {/* Public Routes */}
              <Route path="/authenticate" element={<AuthForm />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/" element={<LandingPage />} />

              {/* User Protected Routes */}
              <Route element={<ProtectedRoute allowedRoles={["user","owner", "admin"]} />}>
                <Route path="/userdashboard" element={<UserDashboard />} />
                <Route path="/userproperties" element={<UserProperties />} />
                <Route path="/property/:id" element={<PropertyDetailPage />} />

              </Route>

              {/* Admin Protected Routes */}
              <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                {/* <Route path="/adminproperties" element={<AdminProperties />} /> */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/customers" element={<Customers />} />
              </Route>

              {/* Owner Protected Routes */}
              <Route element={<ProtectedRoute allowedRoles={["owner"]} />}>
                <Route path="/properties" element={<Properties />} />
              </Route>

              {/* General App Routes */}
              <Route path="/kanban" element={<KanbanBoard />} />
              <Route path="/calendar" element={<CalendarApp />} />
              <Route path="/payment/:id" element={<PaymentPage />} />

              {/* Unauthorized Route */}
              <Route path="/unauthorized" element={<Unauthorized />} />
            </Routes>
          </main>
        </div>
      </Suspense>
    </Router>
  );
};

export default App;
