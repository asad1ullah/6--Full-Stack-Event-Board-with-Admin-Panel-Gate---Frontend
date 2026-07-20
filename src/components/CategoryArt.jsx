import { getCategoryArt, FALLBACK_ART } from "../utils/categoryArtData";

function CategoryArt({ category, style, className }) {
  const { from, to, Icon } = getCategoryArt(category);
  const isFallback = from === FALLBACK_ART.from;

  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${from}, ${to})`,
        color: isFallback ? "var(--eb-text-muted)" : "rgba(255, 255, 255, 0.92)",
        ...style,
      }}
      aria-hidden="true"
    >
      <Icon width="20%" height="20%" style={{ minWidth: 40, minHeight: 40, maxWidth: 88, maxHeight: 88 }} />
    </div>
  );
}

export function CategoryBadge({ category, className = "" }) {
  if (!category) return null;
  const { from, to } = getCategoryArt(category);
  return (
    <span
      className={`badge text-nowrap ${className}`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})`, color: "#fff" }}
    >
      {category}
    </span>
  );
}

export default CategoryArt;
