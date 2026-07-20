import { useEffect, useState } from "react";
import api from "../../services/api";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorAlert from "../../components/ErrorAlert";

function StatCard({ label, value }) {
  return (
    <div className="col-md-4">
      <div className="eb-panel p-4 h-100">
        <div className="text-muted small text-uppercase fw-semibold mb-2" style={{ letterSpacing: "0.04em" }}>
          {label}
        </div>
        <div className="fw-bold" style={{ fontSize: "2.25rem", color: "var(--eb-primary)" }}>
          {value}
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/admin/stats")
      .then((response) => {
        setStats(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load stats.");
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner message="Loading stats..." />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <div>
      <div className="row g-3 mb-4">
        <StatCard label="Total Users" value={stats.totalUsers} />
        <StatCard label="Total Events" value={stats.totalEvents} />
        <StatCard label="Total RSVPs" value={stats.totalRsvps} />
      </div>

      <h2 className="h5 mb-3">RSVPs per event</h2>
      <div className="eb-panel">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>Event</th>
                <th className="text-end">Yes</th>
                <th className="text-end">Maybe</th>
                <th className="text-end">No</th>
              </tr>
            </thead>
            <tbody>
              {stats.rsvpsPerEvent.map((row) => (
                <tr key={row.eventId}>
                  <td>{row.title}</td>
                  <td className="text-end">{row.yes}</td>
                  <td className="text-end">{row.maybe}</td>
                  <td className="text-end">{row.no}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
