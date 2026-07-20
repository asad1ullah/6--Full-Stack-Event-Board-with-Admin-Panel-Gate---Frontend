function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5">
      <div
        className="spinner-border"
        style={{ color: "var(--eb-primary)", width: "2.25rem", height: "2.25rem" }}
        role="status"
      >
        <span className="visually-hidden">{message}</span>
      </div>
      <p className="mt-3 text-muted mb-0">{message}</p>
    </div>
  );
}

export default LoadingSpinner;
