import { useEffect, useState, useCallback } from "react";
import api from "../../services/api";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorAlert from "../../components/ErrorAlert";

function UserAvatar({ name }) {
  return (
    <span
      className="d-inline-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
      style={{
        width: 32,
        height: 32,
        backgroundColor: "var(--eb-primary-soft)",
        color: "var(--eb-primary)",
        fontSize: "0.8rem",
        fontWeight: 700,
      }}
      aria-hidden="true"
    >
      {name?.charAt(0).toUpperCase()}
    </span>
  );
}

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const loadUsers = useCallback(() => {
    api
      .get("/admin/users")
      .then((response) => {
        setUsers(response.data ?? []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load users.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  async function toggleRole(user) {
    setBusyId(user.id);
    const newRole = user.role === "Admin" ? "User" : "Admin";
    try {
      await api.put(`/admin/users/${user.id}/role`, { role: newRole });
      loadUsers();
    } catch {
      setError("Failed to update role.");
    } finally {
      setBusyId(null);
    }
  }

  async function toggleStatus(user) {
    setBusyId(user.id);
    try {
      await api.put(`/admin/users/${user.id}/status`, { isActive: !user.isActive });
      loadUsers();
    } catch {
      setError("Failed to update status.");
    } finally {
      setBusyId(null);
    }
  }

  if (loading) return <LoadingSpinner message="Loading users..." />;

  return (
    <div>
      {error && <ErrorAlert message={error} />}

      {users.length === 0 ? (
        <div className="eb-empty-state">
          <p className="mb-0">No users yet.</p>
        </div>
      ) : (
        <div className="eb-panel">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <UserAvatar name={user.name} />
                        <span className="fw-semibold">{user.name}</span>
                      </div>
                    </td>
                    <td className="text-muted">{user.email}</td>
                    <td>
                      <span className={`badge ${user.role === "Admin" ? "bg-primary" : "bg-secondary"}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${user.isActive ? "bg-success" : "bg-danger"}`}>
                        {user.isActive ? "Active" : "Disabled"}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-2 justify-content-end">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          disabled={busyId === user.id}
                          onClick={() => toggleRole(user)}
                        >
                          {user.role === "Admin" ? "Demote" : "Promote"}
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          disabled={busyId === user.id}
                          onClick={() => toggleStatus(user)}
                        >
                          {user.isActive ? "Disable" : "Enable"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;
