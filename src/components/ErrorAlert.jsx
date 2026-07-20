function ErrorAlert({ message = "Something went wrong. Please try again." }) {
  return (
    <div className="alert alert-danger d-flex align-items-start gap-2" role="alert">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-1" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 8v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="16" r="0.9" fill="currentColor" />
      </svg>
      <span>{message}</span>
    </div>
  );
}

export default ErrorAlert;
