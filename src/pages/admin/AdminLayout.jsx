import { NavLink, Outlet } from "react-router-dom";

function navLinkClass({ isActive }) {
  return `nav-link${isActive ? " active" : ""}`;
}

function AdminLayout() {
  return (
    <div className="container py-4 eb-fade-in">
      <h1 className="mb-1 page-title">Admin</h1>
      <p className="page-subtitle">Manage users, events, and see platform activity</p>
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <NavLink className={navLinkClass} to="/admin" end>
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={navLinkClass} to="/admin/users">
            Users
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={navLinkClass} to="/admin/events">
            Events
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default AdminLayout;
