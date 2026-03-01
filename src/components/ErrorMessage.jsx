export default function ErrorMessage({
  message = "Something went wrong",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-28 animate-fade-in">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: "var(--violet-soft)" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: "var(--violet)" }}
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h3
        className="text-base font-semibold mb-1"
        style={{ color: "var(--text-1)" }}
      >
        Something Went Wrong
      </h3>
      <p
        className="text-[13px] mb-5 text-center max-w-sm"
        style={{ color: "var(--text-3)" }}
      >
        {message}
      </p>
      {onRetry && (
        <button onClick={onRetry} className="ios-btn text-[13px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
          Try Again
        </button>
      )}
    </div>
  );
}
