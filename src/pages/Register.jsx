import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ErrorAlert from "../components/ErrorAlert";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await register(name, email, password);
      navigate("/");
    } catch (err) {
      const status = err.response?.status;
      if (status === 409) {
        setError("An account with this email already exists.");
      } else if (status === 400) {
        setError("Please check your details and try again (password needs at least 6 characters).");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container py-5 eb-fade-in">
      <div className="row justify-content-center">
        <div className="col-md-5 col-lg-4">
          <div className="eb-panel p-4 p-md-5">
            <h1 className="h3 mb-1 text-center">Create an account</h1>
            <p className="text-muted text-center mb-4">Create events and RSVP to others</p>

            {error && <ErrorAlert message={error} />}

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label className="form-label" htmlFor="register-name">
                  Name
                </label>
                <input
                  id="register-name"
                  type="text"
                  className="form-control"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="register-email">
                  Email
                </label>
                <input
                  id="register-email"
                  type="email"
                  className="form-control"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="form-label" htmlFor="register-password">
                  Password
                </label>
                <input
                  id="register-password"
                  type="password"
                  className="form-control"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  required
                />
                <div className="form-text">At least 6 characters.</div>
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
                {submitting ? "Creating account…" : "Register"}
              </button>
            </form>
          </div>
          <p className="text-center text-muted mt-3 mb-0">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
