import { useState } from "react";
import ErrorAlert from "./ErrorAlert";

function toDateTimeLocal(value) {
  if (!value) return "";
  return value.slice(0, 16);
}

function RequiredMark() {
  return (
    <span className="text-danger" aria-hidden="true">
      {" "}
      *
    </span>
  );
}

function EventForm({ initialValues, submitLabel, onSubmit }) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [description, setDescription] = useState(initialValues?.description ?? "");
  const [date, setDate] = useState(toDateTimeLocal(initialValues?.date));
  const [location, setLocation] = useState(initialValues?.location ?? "");
  const [category, setCategory] = useState(initialValues?.category ?? "");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleImageChange(e) {
    const file = e.target.files?.[0] ?? null;
    setImage(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const formData = new FormData();
    formData.append("Title", title);
    formData.append("Description", description ?? "");
    formData.append("Date", date);
    formData.append("Location", location);
    formData.append("Category", category ?? "");
    if (image) {
      formData.append("Image", image);
    }

    try {
      await onSubmit(formData);
    } catch {
      setError("Failed to save this event. Please check your details and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error && <ErrorAlert message={error} />}

      <div className="mb-3">
        <label className="form-label" htmlFor="event-title">
          Title
          <RequiredMark />
        </label>
        <input
          id="event-title"
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="event-description">
          Description
        </label>
        <textarea
          id="event-description"
          className="form-control"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="row g-3 mb-3">
        <div className="col-sm-6">
          <label className="form-label" htmlFor="event-date">
            Date &amp; time
            <RequiredMark />
          </label>
          <input
            id="event-date"
            type="datetime-local"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="col-sm-6">
          <label className="form-label" htmlFor="event-category">
            Category
          </label>
          <input
            id="event-category"
            type="text"
            className="form-control"
            placeholder="e.g. Technology"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="event-location">
          Location
          <RequiredMark />
        </label>
        <input
          id="event-location"
          type="text"
          className="form-control"
          placeholder="e.g. London,GB"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <div className="form-text">Used to look up the weather forecast for this event.</div>
      </div>

      <div className="mb-4">
        <label className="form-label" htmlFor="event-image">
          Image
        </label>
        <input
          id="event-image"
          type="file"
          className="form-control"
          accept="image/png,image/jpeg"
          onChange={handleImageChange}
        />
        <div className="form-text">JPG or PNG.</div>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Selected image preview"
            className="mt-2 rounded"
            style={{ maxHeight: 140, borderRadius: "var(--eb-radius-sm)" }}
          />
        )}
      </div>

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}

export default EventForm;
