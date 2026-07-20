import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import EventForm from "../components/EventForm";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/Events/${id}`)
      .then((response) => {
        setEvent(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load this event.");
        setLoading(false);
      });
  }, [id]);

  async function handleSubmit(formData) {
    await api.put(`/Events/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    navigate(`/event/${id}`);
  }

  if (loading) return <LoadingSpinner message="Loading event..." />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <div className="container py-5 eb-fade-in">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-7">
          <div className="eb-panel p-4 p-md-5">
            <h1 className="h3 mb-1">Edit Event</h1>
            <p className="text-muted mb-4">Update the details below.</p>
            <EventForm initialValues={event} submitLabel="Save Changes" onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditEvent;
