import { useNavigate } from "react-router-dom";
import api from "../services/api";
import EventForm from "../components/EventForm";

function CreateEvent() {
  const navigate = useNavigate();

  async function handleSubmit(formData) {
    const response = await api.post("/Events", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    navigate(`/event/${response.data.id}`);
  }

  return (
    <div className="container py-5 eb-fade-in">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-7">
          <div className="eb-panel p-4 p-md-5">
            <h1 className="h3 mb-1">Create Event</h1>
            <p className="text-muted mb-4">Share what's happening with your community.</p>
            <EventForm submitLabel="Create Event" onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
