import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  fetchPostById,
  fetchCommentsByPostId,
  fetchUserById,
} from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

/* iOS SF Symbol-style icons */
const icons = {
  back: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  forward: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
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
  ),
  mail: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  phone: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  globe: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  building: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <line x1="8" y1="6" x2="10" y2="6" />
      <line x1="14" y1="6" x2="16" y2="6" />
      <line x1="8" y1="10" x2="10" y2="10" />
      <line x1="14" y1="10" x2="16" y2="10" />
      <line x1="8" y1="14" x2="10" y2="14" />
      <line x1="14" y1="14" x2="16" y2="14" />
    </svg>
  ),
  person: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  chat: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  tag: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
      <path d="M7 7h.01" />
    </svg>
  ),
};

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPostDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const postData = await fetchPostById(id);
      setPost(postData);
      const [userData, commentsData] = await Promise.all([
        fetchUserById(postData.userId),
        fetchCommentsByPostId(id),
      ]);
      setUser(userData);
      setComments(commentsData);
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

  if (loading) return <LoadingSpinner text="Loading post..." />;
  if (error) return <ErrorMessage message={error} onRetry={loadPostDetails} />;
  if (!post) return <ErrorMessage message="Post not found" />;

  const initials = user
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "??";

  const authorInfo = user
    ? [
        { icon: icons.mail, label: "Email", value: user.email },
        { icon: icons.phone, label: "Phone", value: user.phone },
        { icon: icons.globe, label: "Website", value: user.website },
        { icon: icons.building, label: "Company", value: user.company.name },
      ]
    : [];

  return (
    <div className="animate-fade-in max-w-3xl mx-auto pb-8">
      {/* Back button - iOS style */}
      <Link
        to="/"
        className="ios-link mb-4 inline-flex text-[13px]"
        style={{ color: "var(--violet)", marginLeft: "-8px" }}
      >
        {icons.back}
        Posts
      </Link>

      {/* Article */}
      <article className="ios-panel p-5 sm:p-8 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="badge badge-muted flex items-center gap-1">
            {icons.tag}
            <span>#{post.id}</span>
          </span>
        </div>

        <h1
          className="text-[20px] sm:text-[26px] font-bold leading-snug capitalize mb-4"
          style={{ color: "var(--text-1)" }}
        >
          {post.title}
        </h1>

        {/* Author inline */}
        {user && (
          <div
            className="flex items-center gap-3 mb-5 pb-5"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{ background: "var(--violet)" }}
            >
              {initials}
            </div>
            <div>
              <p
                className="text-[14px] font-semibold"
                style={{ color: "var(--text-1)" }}
              >
                {user.name}
              </p>
              <p className="text-[12px]" style={{ color: "var(--violet)" }}>
                @{user.username}
              </p>
            </div>
          </div>
        )}

        <p
          className="text-[15px] leading-[1.75] whitespace-pre-line"
          style={{ color: "var(--text-2)" }}
        >
          {post.body}
        </p>
      </article>

      {/* Author Details */}
      {user && (
        <div className="ios-panel p-5 sm:p-6 mb-4">
          <h2
            className="text-[11px] font-bold uppercase tracking-[0.08em] mb-4 flex items-center gap-2"
            style={{ color: "var(--text-3)" }}
          >
            <span style={{ color: "var(--text-4)" }}>{icons.person}</span>
            About the Author
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {authorInfo.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 p-3.5 rounded-xl"
                style={{
                  background: "var(--violet-glow)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "var(--violet-soft)",
                    color: "var(--violet)",
                  }}
                >
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p
                    className="text-[10px] font-semibold uppercase tracking-wider"
                    style={{ color: "var(--text-4)" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-[13px] font-medium truncate"
                    style={{ color: "var(--text-2)" }}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comments */}
      <div className="ios-panel p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <h2
            className="text-[11px] font-bold uppercase tracking-[0.08em] flex items-center gap-2"
            style={{ color: "var(--text-3)" }}
          >
            <span style={{ color: "var(--text-4)" }}>{icons.chat}</span>
            Comments
          </h2>
          <span className="badge badge-subtle">{comments.length}</span>
        </div>

        {comments.length === 0 ? (
          <p
            className="text-sm text-center py-10"
            style={{ color: "var(--text-3)" }}
          >
            No comments yet.
          </p>
        ) : (
          <div className="space-y-0">
            {comments.map((comment, index) => (
              <div
                key={comment.id}
                className="py-4 animate-fade-in-up"
                style={{
                  borderBottom:
                    index < comments.length - 1
                      ? "1px solid var(--border)"
                      : "none",
                  animationDelay: `${index * 50}ms`,
                  opacity: 0,
                  animationFillMode: "forwards",
                }}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                    style={{
                      background: "var(--violet-soft)",
                      color: "var(--violet)",
                    }}
                  >
                    {comment.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-[13px] font-semibold capitalize truncate"
                      style={{ color: "var(--text-1)" }}
                    >
                      {comment.name}
                    </p>
                  </div>
                </div>
                <p
                  className="text-[13px] leading-relaxed pl-[38px]"
                  style={{ color: "var(--text-3)" }}
                >
                  {comment.body}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-5">
        {Number(id) > 1 ? (
          <Link to={`/post/${Number(id) - 1}`} className="ios-link text-[13px]">
            {icons.back}
            Previous
          </Link>
        ) : (
          <div />
        )}
        {Number(id) < 100 && (
          <Link to={`/post/${Number(id) + 1}`} className="ios-link text-[13px]">
            Next
            {icons.forward}
          </Link>
        )}
      </div>
    </div>
  );
}
