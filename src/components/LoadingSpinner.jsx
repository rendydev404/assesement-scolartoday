export default function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-28 animate-fade-in">
      <div className="relative w-10 h-10">
        <div
          className="absolute inset-0 border-2 rounded-full"
          style={{ borderColor: "var(--border)" }}
        ></div>
        <div
          className="absolute inset-0 border-2 border-transparent rounded-full animate-spin"
          style={{ borderTopColor: "var(--violet)" }}
        ></div>
      </div>
      <p
        className="mt-4 text-[13px] font-medium"
        style={{ color: "var(--text-3)" }}
      >
        {text}
      </p>
    </div>
  );
}
