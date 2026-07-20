import { useEffect, useState } from "react";
import api, { API_ORIGIN } from "../services/api";

function WeatherWidget({ location }) {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`${API_ORIGIN}/weatherforecast`, { params: { city: location } })
      .then((response) => {
        setWeather(response.data);
        setError("");
        setLoading(false);
      })
      .catch(() => {
        setError("Weather forecast is unavailable right now.");
        setLoading(false);
      });
  }, [location]);

  return (
    <div className="eb-panel p-3 p-md-4 mb-4">
      <h2 className="h5 mb-3">Weather in {location}</h2>

      {loading && <p className="text-muted mb-0 small">Loading forecast&hellip;</p>}
      {!loading && error && <p className="text-muted mb-0 small">{error}</p>}

      {!loading && !error && weather && (
        <>
          <div className="d-flex align-items-baseline gap-2 mb-3">
            <span className="fw-bold" style={{ fontSize: "2rem", lineHeight: 1 }}>
              {weather.current.temperature}&deg;C
            </span>
            <span className="text-muted text-capitalize">{weather.current.description}</span>
          </div>
          {weather.forecast?.length > 0 && (
            <div className="d-flex flex-wrap gap-3 gap-md-4">
              {weather.forecast.map((day) => (
                <div key={day.date} className="text-center" style={{ minWidth: 64 }}>
                  <div className="small text-muted mb-1">
                    {new Date(day.date).toLocaleDateString(undefined, { weekday: "short" })}
                  </div>
                  <div className="fw-semibold">{day.temperatureC}&deg;C</div>
                  <div className="small text-muted text-capitalize">{day.summary}</div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default WeatherWidget;
