import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";

const OPTIONS = [
  { value: "Yes", label: "Yes", activeClass: "btn-success" },
  { value: "Maybe", label: "Maybe", activeClass: "btn-warning" },
  { value: "No", label: "No", activeClass: "btn-danger" },
];

function RsvpButtons({ eventId, counts, onCountsChange }) {
  const { user } = useAuth();
  const [myStatus, setMyStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    api
      .get(`/events/${eventId}/rsvp/mine`)
      .then((response) => setMyStatus(response.data?.status ?? null))
      .catch(() => setMyStatus(null));
  }, [eventId, user]);

  async function handleRsvp(status) {
    setError("");
    setSubmitting(true);
    try {
      await api.post(`/events/${eventId}/rsvp`, { status });
      setMyStatus(status);
      onCountsChange?.();
    } catch {
      setError("Could not save your RSVP. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="eb-panel p-3 p-md-4">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <h2 className="h5 mb-0">RSVP</h2>
        {counts && (
          <span className="text-muted small">
            {counts.yes} yes &middot; {counts.maybe} maybe &middot; {counts.no} no
          </span>
        )}
      </div>
      {!user ? (
        <p className="text-muted mb-0">
          <Link to="/login">Log in</Link> to let the organiser know you're coming.
        </p>
      ) : (
        <div className="btn-group eb-rsvp-group" role="group" aria-label="RSVP status">
          {OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`btn ${
                myStatus === option.value ? option.activeClass : "btn-outline-secondary"
              }`}
              disabled={submitting}
              aria-pressed={myStatus === option.value}
              onClick={() => handleRsvp(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
      {error && (
        <p className="text-danger mt-2 mb-0 small">{error}</p>
      )}
    </div>
  );
}

export default RsvpButtons;
