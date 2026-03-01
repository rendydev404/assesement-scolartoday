import { Link } from "react-router-dom";
import { useState } from "react";

/* Threads-style action icons */
const HeartIcon = ({ filled }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const CommentIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const RepostIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 1l4 4-4 4" />
    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <path d="M7 23l-4-4 4-4" />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </svg>
);

const ShareIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </svg>
);

const MoreIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
);

// Generate avatar colors based on userId
const avatarColors = [
  "#8b5cf6",
  "#3b82f6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#8b5cf6",
  "#6366f1",
  "#14b8a6",
];

function getAvatarColor(userId) {
  return avatarColors[(userId - 1) % avatarColors.length];
}

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getTimeAgo(postId) {
  // Simulate time ago based on post id
  const hours = [2, 5, 8, 12, 1, 3, 6, 9, 14, 18];
  const h = hours[(postId - 1) % hours.length];
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}

export default function PostCard({ post, user, photo, isLast }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(
    Math.floor(Math.random() * 50) + 1,
  );

  const initials = user ? getInitials(user.name) : `U${post.userId}`;
  const username = user ? user.name : `User ${post.userId}`;
  const handle = user ? `@${user.username}` : `@user${post.userId}`;

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const commentCount = (post.id % 8) + 1;
  const repostCount = Math.floor(post.id / 3) + 1;

  return (
    <>
      <Link
        to={`/post/${post.id}`}
        className="thread-post animate-fade-in-up"
        style={{ textDecoration: "none" }}
      >
        {/* Left: Avatar + Thread line */}
        <div className="thread-left">
          <div
            className="thread-avatar"
            style={{ background: getAvatarColor(post.userId) }}
          >
            {initials}
          </div>
          {!isLast && <div className="thread-line" />}
        </div>

        {/* Right: Content */}
        <div className="thread-content">
          {/* Header */}
          <div className="thread-header">
            <div style={{ display: "flex", alignItems: "center", minWidth: 0 }}>
              <span className="thread-username">{username}</span>
              <span className="thread-handle">{handle}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span className="thread-time">{getTimeAgo(post.id)}</span>
              <span style={{ color: "var(--text-4)" }}>
                <MoreIcon />
              </span>
            </div>
          </div>

          {/* Title as bold text */}
          <p
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--text-1)",
              marginBottom: "4px",
              textTransform: "capitalize",
            }}
          >
            {post.title}
          </p>

          {/* Body */}
          <p
            className="thread-body"
            style={{ marginBottom: photo ? "12px" : "10px" }}
          >
            {post.body}
          </p>

          {/* Post Image (if available from API) */}
          {photo && (
            <img
              src={photo.url}
              alt={photo.title}
              className="thread-image"
              loading="lazy"
            />
          )}

          {/* Action bar */}
          <div className="thread-actions">
            <button
              className={`thread-action-btn ${liked ? "liked" : ""}`}
              onClick={handleLike}
            >
              <HeartIcon filled={liked} />
              <span>{likeCount}</span>
            </button>
            <span className="thread-action-btn">
              <CommentIcon />
              <span>{commentCount}</span>
            </span>
            <span className="thread-action-btn">
              <RepostIcon />
              <span>{repostCount}</span>
            </span>
            <span className="thread-action-btn">
              <ShareIcon />
            </span>
          </div>
        </div>
      </Link>
      {!isLast && <hr className="thread-divider" />}
    </>
  );
}
