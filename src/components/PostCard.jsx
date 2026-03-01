import { Link } from "react-router-dom";

export default function PostCard({ post, index }) {
  return (
    <Link
      to={`/post/${post.id}`}
      className="ios-card block p-5 group animate-fade-in-up"
      style={{
        animationDelay: `${Math.min(index * 25, 500)}ms`,
        opacity: 0,
        animationFillMode: "forwards",
      }}
    >
      {/* Visual accent bar */}
      <div
        className="w-10 h-1 rounded-full mb-4"
        style={{ background: "var(--violet)", opacity: 0.6 }}
      />

      {/* Title */}
      <h3
        className="text-[15px] font-semibold mb-2 line-clamp-2 capitalize leading-snug group-hover:text-violet-500 transition-colors duration-150"
        style={{ color: "var(--text-1)" }}
      >
        {post.title}
      </h3>

      {/* Body preview */}
      <p
        className="text-[13px] leading-relaxed line-clamp-2 mb-4"
        style={{ color: "var(--text-3)" }}
      >
        {post.body}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* User avatar */}
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
            style={{ background: "var(--violet)" }}
          >
            U{post.userId}
          </div>
          <span
            className="text-[12px] font-medium"
            style={{ color: "var(--text-3)" }}
          >
            User {post.userId}
          </span>
        </div>

        {/* Arrow */}
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150"
          style={{ background: "var(--violet-soft)" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5"
            style={{ color: "var(--violet)" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
