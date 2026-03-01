import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  fetchPostById,
  fetchCommentsByPostId,
  fetchUserById,
  fetchPhotosByAlbumId,
} from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

/* Threads-style icons */
const HeartIcon = ({ filled }) => (
  <svg
    width="20"
    height="20"
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
    width="20"
    height="20"
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
    width="20"
    height="20"
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
    width="20"
    height="20"
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

const BackIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H5" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const MoreIcon = () => (
  <svg
    width="20"
    height="20"
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

// Avatar colors
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

function getCommentAvatarColor(index) {
  return avatarColors[index % avatarColors.length];
}

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const loadPostDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const postData = await fetchPostById(id);
      setPost(postData);
      setLikeCount(Math.floor(Math.random() * 100) + 10);

      const [userData, commentsData] = await Promise.all([
        fetchUserById(postData.userId),
        fetchCommentsByPostId(id),
      ]);
      setUser(userData);
      setComments(commentsData);

      // Try to fetch a photo
      try {
        const photos = await fetchPhotosByAlbumId(postData.userId);
        if (photos.length > 0) setPhoto(photos[0]);
      } catch {
        // No photo available, that's fine
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPostDetails();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  if (loading) return <LoadingSpinner text="Loading post..." />;
  if (error) return <ErrorMessage message={error} onRetry={loadPostDetails} />;
  if (!post) return <ErrorMessage message="Post not found" />;

  const initials = user ? getInitials(user.name) : "??";
  const repostCount = Math.floor(Number(id) / 2) + 3;

  return (
    <div className="animate-fade-in thread-feed pb-8">
      {/* Threads-style top bar */}
      <div
        className="flex items-center justify-between py-3"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <Link
          to="/"
          className="thread-action-btn"
          style={{ color: "var(--text-1)", padding: "6px" }}
        >
          <BackIcon />
        </Link>
        <span
          className="text-[15px] font-semibold"
          style={{ color: "var(--text-1)" }}
        >
          PostExplorer
        </span>
        <span
          className="thread-action-btn"
          style={{ color: "var(--text-3)", padding: "6px" }}
        >
          <MoreIcon />
        </span>
      </div>

      {/* Main Post - Threads style */}
      <div className="thread-detail-post">
        <div style={{ display: "flex", gap: "12px" }}>
          {/* Avatar */}
          <div className="thread-left" style={{ width: "auto" }}>
            <div
              className="thread-avatar thread-avatar-lg"
              style={{
                background: user ? getAvatarColor(user.id) : "var(--violet)",
              }}
            >
              {initials}
            </div>
          </div>

          {/* Content */}
          <div className="thread-content">
            {/* Header */}
            <div className="thread-header" style={{ marginBottom: "2px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="thread-username" style={{ fontSize: "15px" }}>
                  {user ? user.name : "Unknown"}
                </span>
                {/* Verified badge */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="var(--violet)"
                  style={{ marginLeft: "4px", flexShrink: 0 }}
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="thread-time" style={{ fontSize: "13px" }}>
                {Math.floor(Math.random() * 12) + 1}h
              </span>
            </div>

            {user && (
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--text-3)",
                  marginBottom: "8px",
                }}
              >
                @{user.username}
              </p>
            )}
          </div>
        </div>

        {/* Post title */}
        <h1
          style={{
            fontSize: "16px",
            fontWeight: 700,
            color: "var(--text-1)",
            marginBottom: "8px",
            marginTop: "12px",
            textTransform: "capitalize",
            lineHeight: 1.4,
          }}
        >
          {post.title}
        </h1>

        {/* Post body */}
        <p
          className="thread-body"
          style={{ fontSize: "15px", lineHeight: 1.7 }}
        >
          {post.body}
        </p>

        {/* Post image */}
        {photo && (
          <img
            src={photo.url}
            alt={photo.title}
            className="thread-image"
            style={{ maxHeight: "400px" }}
          />
        )}

        {/* Stats row */}
        <div className="thread-stats">
          <span className="thread-stat">
            <strong>{likeCount}</strong> likes
          </span>
          <span className="thread-stat">
            <strong>{comments.length}</strong> replies
          </span>
          <span className="thread-stat">
            <strong>{repostCount}</strong> reposts
          </span>
        </div>

        {/* Action bar */}
        <div
          className="thread-actions"
          style={{
            padding: "8px 0",
            justifyContent: "space-around",
            marginLeft: 0,
            borderBottom: "1px solid var(--border)",
          }}
        >
          <button
            className={`thread-action-btn ${liked ? "liked" : ""}`}
            onClick={handleLike}
          >
            <HeartIcon filled={liked} />
          </button>
          <span className="thread-action-btn">
            <CommentIcon />
          </span>
          <span className="thread-action-btn">
            <RepostIcon />
          </span>
          <span className="thread-action-btn">
            <ShareIcon />
          </span>
        </div>
      </div>

      {/* Replies / Comments */}
      {comments.length > 0 && (
        <div>
          {comments.map((comment, index) => (
            <div key={comment.id}>
              <div
                className="thread-reply animate-fade-in-up"
                style={{
                  animationDelay: `${index * 40}ms`,
                  opacity: 0,
                  animationFillMode: "forwards",
                }}
              >
                {/* Reply avatar + thread line */}
                <div className="thread-left">
                  <div
                    className="thread-avatar thread-avatar-sm"
                    style={{ background: getCommentAvatarColor(index) }}
                  >
                    {comment.name.charAt(0).toUpperCase()}
                  </div>
                  {index < comments.length - 1 && (
                    <div className="thread-line" />
                  )}
                </div>

                {/* Reply content */}
                <div className="thread-reply-content">
                  <div
                    className="thread-header"
                    style={{ marginBottom: "4px" }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <span
                        className="thread-username"
                        style={{
                          fontSize: "13px",
                          display: "block",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          textTransform: "capitalize",
                        }}
                      >
                        {comment.name}
                      </span>
                    </div>
                    <span className="thread-time">
                      {Math.floor(Math.random() * 8) + 1}h
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: "13px",
                      lineHeight: 1.55,
                      color: "var(--text-2)",
                      marginBottom: "8px",
                    }}
                  >
                    {comment.body}
                  </p>

                  {/* Reply actions */}
                  <div className="thread-actions" style={{ gap: "0" }}>
                    <span
                      className="thread-action-btn"
                      style={{ padding: "4px 8px" }}
                    >
                      <HeartIcon filled={false} />
                    </span>
                    <span
                      className="thread-action-btn"
                      style={{ padding: "4px 8px" }}
                    >
                      <CommentIcon />
                    </span>
                    <span
                      className="thread-action-btn"
                      style={{ padding: "4px 8px" }}
                    >
                      <RepostIcon />
                    </span>
                    <span
                      className="thread-action-btn"
                      style={{ padding: "4px 8px" }}
                    >
                      <ShareIcon />
                    </span>
                  </div>
                </div>
              </div>
              {index < comments.length - 1 && <hr className="thread-divider" />}
            </div>
          ))}
        </div>
      )}

      {/* Navigation */}
      <div
        className="flex items-center justify-between mt-6 pt-4"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        {Number(id) > 1 ? (
          <Link
            to={`/post/${Number(id) - 1}`}
            className="ios-link text-[13px]"
            style={{ color: "var(--violet)" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Previous
          </Link>
        ) : (
          <div />
        )}
        {Number(id) < 100 && (
          <Link
            to={`/post/${Number(id) + 1}`}
            className="ios-link text-[13px]"
            style={{ color: "var(--violet)" }}
          >
            Next
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}
