const CATEGORY_ART = [
  {
    keywords: ["tech", "software", "developer", "code", "hack"],
    from: "#4338ca",
    to: "#6366f1",
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <rect x="8" y="8" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M8 4v2.5M16 4v2.5M8 17.5V20M16 17.5V20M4 8h2.5M4 16h2.5M17.5 8H20M17.5 16H20"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    keywords: ["social", "party", "meetup", "networking", "community"],
    from: "#be185d",
    to: "#f472b6",
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <circle cx="8.5" cy="9" r="2.8" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="16" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M3.5 19c.6-3 2.7-4.7 5-4.7s4.4 1.7 5 4.7M13.8 19c.4-2.3 1.8-3.8 3.7-3.8 1.7 0 3 1.2 3.5 3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    keywords: ["music", "concert", "band", "gig", "festival"],
    from: "#7e22ce",
    to: "#a78bfa",
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <circle cx="7" cy="17.5" r="2.2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17" cy="15.5" r="2.2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9.2 17.5V6.5L19.2 4v11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    keywords: ["food", "picnic", "dinner", "cook", "restaurant", "brunch"],
    from: "#c2410c",
    to: "#fb923c",
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path
          d="M7 3v7a2 2 0 0 0 4 0V3M7 3v18M11 3v6M17 3c-1.7 0-3 2-3 5s1.3 5 3 5v7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    keywords: ["sport", "game", "match", "fitness", "run", "gym"],
    from: "#15803d",
    to: "#4ade80",
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M12 4c2 2.5 2 11.5 0 16M6 8c2.5 1.5 9.5 1.5 12 0M6 16c2.5-1.5 9.5-1.5 12 0"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </svg>
    ),
  },
  {
    keywords: ["business", "networking", "conference", "startup", "career"],
    from: "#334155",
    to: "#64748b",
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <rect x="4" y="8.5" width="16" height="10.5" rx="1.8" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 8.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2.5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    keywords: ["art", "design", "exhibit", "craft", "paint"],
    from: "#a21caf",
    to: "#e879f9",
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path
          d="M12 4a8 8 0 1 0 0 16c1.1 0 1.6-.7 1.6-1.5 0-.4-.2-.8-.4-1.1-.3-.4-.1-1 .4-1.1.9-.2 1.4-1 1.4-1.9 0-1.4-1.5-2.4-3-2.4h-1a2 2 0 0 1 0-4h4"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="8" cy="10" r="1" fill="currentColor" />
        <circle cx="9.5" cy="14.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    keywords: ["health", "wellness", "yoga", "medical", "mind"],
    from: "#0f766e",
    to: "#5eead4",
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path
          d="M12 20s-7-4.4-7-9.5A4 4 0 0 1 12 8a4 4 0 0 1 7 2.5C19 15.6 12 20 12 20Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path d="M5 12h3l1.5-3 2 5 1.5-2.5H19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    keywords: ["education", "workshop", "class", "learn", "training", "school"],
    from: "#3730a3",
    to: "#818cf8",
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path d="M3 8l9-4 9 4-9 4-9-4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M7 10.5V15c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-4.5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    keywords: ["outdoor", "hike", "nature", "camp", "adventure"],
    from: "#166534",
    to: "#86efac",
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path d="M4 19 10 8l3 5 2-3 5 9H4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export const FALLBACK_ART = {
  from: "var(--eb-surface-alt)",
  to: "var(--eb-primary-soft)",
  Icon: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 9.5h18" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 3v3.5M16 3v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

export function getCategoryArt(category) {
  if (!category) return FALLBACK_ART;
  const normalized = category.toLowerCase();
  const match = CATEGORY_ART.find((entry) => entry.keywords.some((keyword) => normalized.includes(keyword)));
  return match ?? FALLBACK_ART;
}
