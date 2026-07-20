import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute, AdminRoute } from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import EventList from "./components/EventList";
import EventDetail from "./components/EventDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import Dashboard from "./pages/Dashboard";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminEvents from "./pages/admin/AdminEvents";
import "./App.css";

function NotFound() {
  return (
    <div className="container py-5">
      <div className="eb-empty-state">
        <h1 className="h3">Page not found</h1>
        <p className="mb-0">The page you're looking for doesn't exist.</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route path="/event/:id/edit" element={<EditEvent />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="events" element={<AdminEvents />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </AuthProvider>
  );
}

export default App;
