import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ErrorAlert from "../components/ErrorAlert";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      navigate(location.state?.from ?? "/");
    } catch (err) {
      const status = err.response?.status;
      setError(
        status === 401
          ? "Invalid email or password."
          : "Login failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container py-5 eb-fade-in">
      <div className="row justify-content-center">
        <div className="col-md-5 col-lg-4">
          <div className="eb-panel p-4 p-md-5">
            <h1 className="h3 mb-1 text-center">Welcome back</h1>
            <p className="text-muted text-center mb-4">Log in to create events and RSVP</p>

            {error && <ErrorAlert message={error} />}

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label className="form-label" htmlFor="login-email">
                  Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  className="form-control"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="form-label" htmlFor="login-password">
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  className="form-control"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
                {submitting ? "Logging in…" : "Log in"}
              </button>
            </form>
          </div>
          <p className="text-center text-muted mt-3 mb-0">
            No account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
