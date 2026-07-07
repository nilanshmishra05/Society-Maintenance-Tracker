import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import ResidentDashboard from "./pages/ResidentDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import CreateComplaint from "./pages/CreateComplaint";
import MyComplaints from "./pages/MyComplaints";

import ComplaintList from "./pages/ComplaintList";
import ComplaintView from "./pages/ComplaintView";

import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

import AdminLayout from "./layouts/AdminLayout";
import ResidentLayout from "./layouts/ResidentLayout";

function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* ================= Admin ================= */}
      <Route element={<AdminLayout />}>

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/complaints"
          element={<ComplaintList />}
        />

        <Route
          path="/admin/complaints/:id"
          element={<ComplaintView />}
        />

        <Route
    path="/admin/profile"
    element={<Profile />}
/>

      </Route>

      {/* ================= Resident ================= */}
      <Route element={<ResidentLayout />}>

        <Route
          path="/resident/dashboard"
          element={<ResidentDashboard />}
        />

        <Route
          path="/complaint/create"
          element={<CreateComplaint />}
        />

        <Route
          path="/complaints"
          element={<MyComplaints />}
        />
        <Route
    path="/complaint/:id"
    element={<ComplaintView />}
/>

        <Route
    path="/resident/profile"
    element={<Profile />}
/>

      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;