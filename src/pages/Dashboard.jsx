import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";

const RSVP_BADGE_CLASS = {
  Yes: "bg-success",
  Maybe: "bg-warning text-dark",
  No: "bg-danger",
};

function SectionEmptyState({ message }) {
  return (
    <div className="eb-empty-state py-4">
      <p className="mb-0">{message}</p>
    </div>
  );
}

function Dashboard() {
  const [myEvents, setMyEvents] = useState([]);
  const [myRsvps, setMyRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([api.get("/Events/mine"), api.get("/rsvps/mine")])
      .then(([eventsRes, rsvpsRes]) => {
        setMyEvents(eventsRes.data ?? []);
        setMyRsvps(rsvpsRes.data ?? []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load your dashboard.");
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner message="Loading your dashboard..." />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <div className="container py-4 eb-fade-in">
      <h1 className="mb-1 page-title">My Dashboard</h1>
      <p className="page-subtitle">Everything you've created and RSVP'd to</p>

      <section className="mb-5">
        <h2 className="h5 mb-3">My Events</h2>
        {myEvents.length === 0 ? (
          <SectionEmptyState message="You haven't created any events yet." />
        ) : (
          <div className="eb-panel">
            <ul className="list-group list-group-flush">
              {myEvents.map((event) => (
                <li
                  key={event.id}
                  className="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2 py-3"
                >
                  <span>
                    <Link to={`/event/${event.id}`} className="fw-semibold">
                      {event.title}
                    </Link>{" "}
                    <span className="text-muted">
                      &mdash; {new Date(event.date).toLocaleDateString()}
                    </span>
                  </span>
                  <span className="badge bg-light text-dark border">
                    {event.rsvpCounts.yes} yes / {event.rsvpCounts.maybe} maybe /{" "}
                    {event.rsvpCounts.no} no
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section>
        <h2 className="h5 mb-3">My RSVPs</h2>
        {myRsvps.length === 0 ? (
          <SectionEmptyState message="You haven't RSVP'd to any events yet." />
        ) : (
          <div className="eb-panel">
            <ul className="list-group list-group-flush">
              {myRsvps.map((rsvp) => (
                <li
                  key={rsvp.eventId}
                  className="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2 py-3"
                >
                  <span>
                    <Link to={`/event/${rsvp.eventId}`} className="fw-semibold">
                      {rsvp.eventTitle}
                    </Link>{" "}
                    <span className="text-muted">
                      &mdash; {new Date(rsvp.eventDate).toLocaleDateString()}
                    </span>
                  </span>
                  <span className={`badge ${RSVP_BADGE_CLASS[rsvp.status] ?? "bg-secondary"}`}>
                    {rsvp.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
