import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorAlert from "../../components/ErrorAlert";

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const loadEvents = useCallback(() => {
    api
      .get("/Events")
      .then((response) => {
        setEvents(response.data ?? []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load events.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  async function handleDelete(event) {
    if (!window.confirm(`Delete "${event.title}"? This cannot be undone.`)) return;
    setBusyId(event.id);
    try {
      await api.delete(`/Events/${event.id}`);
      loadEvents();
    } catch {
      setError("Failed to delete this event.");
    } finally {
      setBusyId(null);
    }
  }

  if (loading) return <LoadingSpinner message="Loading events..." />;

  return (
    <div>
      {error && <ErrorAlert message={error} />}

      {events.length === 0 ? (
        <div className="eb-empty-state">
          <p className="mb-0">No events yet.</p>
        </div>
      ) : (
        <div className="eb-panel">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Owner</th>
                  <th>RSVPs (Y/M/N)</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td>
                      <Link to={`/event/${event.id}`} className="fw-semibold">
                        {event.title}
                      </Link>
                    </td>
                    <td className="text-muted">{new Date(event.date).toLocaleDateString()}</td>
                    <td className="text-muted">{event.ownerName}</td>
                    <td className="text-muted">
                      {event.rsvpCounts.yes} / {event.rsvpCounts.maybe} / {event.rsvpCounts.no}
                    </td>
                    <td>
                      <div className="d-flex gap-2 justify-content-end">
                        <Link to={`/event/${event.id}/edit`} className="btn btn-sm btn-secondary">
                          Edit
                        </Link>
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          disabled={busyId === event.id}
                          onClick={() => handleDelete(event)}
                        >
                          Delete
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

export default AdminEvents;
