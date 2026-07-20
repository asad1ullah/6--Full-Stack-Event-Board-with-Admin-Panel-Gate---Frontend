import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api, { assetUrl } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import CategoryArt, { CategoryBadge } from "./CategoryArt";
import LoadingSpinner from "./LoadingSpinner";
import ErrorAlert from "./ErrorAlert";
import WeatherWidget from "./WeatherWidget";
import RsvpButtons from "./RsvpButtons";

function MetaItem({ icon, label, value }) {
  return (
    <div className="d-flex align-items-center gap-2 text-muted">
      <span className="d-inline-flex" aria-hidden="true">
        {icon}
      </span>
      <span>
        <strong className="text-body">{label}:</strong> {value}
      </span>
    </div>
  );
}

const CalendarIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3 9.5h18" stroke="currentColor" strokeWidth="1.6" />
    <path d="M8 3v3.5M16 3v3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const PinIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const PersonIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M5 20c1-3.5 4-5.5 7-5.5s6 2 7 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  const loadEvent = useCallback(() => {
    api
      .get(`/Events/${id}`)
      .then((response) => {
        setEvent(response.data ?? null);
        setError("");
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load this event. Please try again later.");
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    loadEvent();
  }, [loadEvent]);

  async function handleDelete() {
    if (!window.confirm("Delete this event? This cannot be undone.")) return;
    setDeleting(true);
    try {
      await api.delete(`/Events/${id}`);
      navigate("/");
    } catch {
      setError("Failed to delete this event.");
      setDeleting(false);
    }
  }

  if (loading) return <LoadingSpinner message="Loading event..." />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <div className="container py-4 eb-fade-in" style={{ maxWidth: 760 }}>
      <button
        type="button"
        className="btn btn-outline-secondary btn-sm mb-4"
        onClick={() => navigate("/")}
      >
        &larr; Back to events
      </button>

      {!event ? (
        <div className="eb-empty-state">
          <h5>Event not found</h5>
          <p className="mb-0">It may have been removed by an admin.</p>
        </div>
      ) : (
        <div className="card event-card">
          {event.imageUrl ? (
            <img
              src={assetUrl(event.imageUrl)}
              alt={`${event.title} banner`}
              className="event-card-thumb"
              style={{ aspectRatio: "21 / 9" }}
            />
          ) : (
            <CategoryArt category={event.category} style={{ aspectRatio: "21 / 9" }} />
          )}
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
              <h1 className="card-title mb-0 h2">{event.title}</h1>
              {isAdmin && (
                <div className="d-flex gap-2 flex-shrink-0">
                  <Link to={`/event/${id}/edit`} className="btn btn-sm btn-secondary">
                    Edit
                  </Link>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={handleDelete}
                    disabled={deleting}
                  >
                    {deleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              )}
            </div>

            <CategoryBadge category={event.category} className="mb-3" />

            <p className="card-text mb-4">{event.description ?? "No description provided."}</p>

            <div className="d-flex flex-column gap-2 mb-4 pb-4" style={{ borderBottom: "1px solid var(--eb-border)" }}>
              <MetaItem icon={CalendarIcon} label="Date" value={new Date(event.date).toLocaleString()} />
              <MetaItem icon={PinIcon} label="Location" value={event.location} />
              {event.ownerName && (
                <MetaItem icon={PersonIcon} label="Organised by" value={event.ownerName} />
              )}
            </div>

            <WeatherWidget location={event.location} />
            <RsvpButtons eventId={id} counts={event.rsvpCounts} onCountsChange={loadEvent} />
          </div>
        </div>
      )}
    </div>
  );
}

export default EventDetail;
