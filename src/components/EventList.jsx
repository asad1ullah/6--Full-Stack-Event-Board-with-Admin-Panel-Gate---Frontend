import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { assetUrl } from "../services/api";
import CategoryArt, { CategoryBadge } from "./CategoryArt";
import LoadingSpinner from "./LoadingSpinner";
import ErrorAlert from "./ErrorAlert";

function EventThumb({ event }) {
  if (event?.imageUrl) {
    return (
      <img
        src={assetUrl(event.imageUrl)}
        alt={`${event.title} thumbnail`}
        className="event-card-thumb"
        loading="lazy"
      />
    );
  }

  return <CategoryArt category={event?.category} className="event-card-thumb" />;
}

function EmptyEventsState() {
  return (
    <div className="eb-empty-state">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 9.5h18" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 3v3.5M16 3v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <h5>No events yet</h5>
      <p className="mb-0">Be the first to add one — click "Create Event" to get started.</p>
    </div>
  );
}

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/Events")
      .then((response) => {
        setEvents(response.data ?? []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load events. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner message="Loading events..." />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <div className="container py-4 eb-fade-in">
      <h1 className="mb-1 page-title">Event Board</h1>
      <p className="page-subtitle">Discover what's happening nearby</p>

      {events.length === 0 ? (
        <EmptyEventsState />
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {events.map((event) => (
            <div className="col" key={event?.id}>
              <div className="card event-card h-100">
                <EventThumb event={event} />
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start gap-2 mb-1">
                    <h5 className="card-title mb-0">{event?.title ?? "Untitled event"}</h5>
                    <CategoryBadge category={event?.category} />
                  </div>
                  <p className="card-text flex-grow-1 text-muted">
                    {event?.description ?? "No description provided."}
                  </p>
                  <p className="card-text mb-1 small">
                    <strong>Date:</strong>{" "}
                    {event?.date ? new Date(event.date).toLocaleString() : "N/A"}
                  </p>
                  <p className="card-text mb-3 small">
                    <strong>Location:</strong> {event?.location ?? "N/A"}
                  </p>
                  <Link
                    to={`/event/${event?.id}`}
                    className="btn btn-primary mt-auto"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EventList;
