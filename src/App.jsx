import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import PostListPage from "./pages/PostListPage";
import PostDetailPage from "./pages/PostDetailPage";

function AppContent() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6">
        <Routes>
          <Route path="/" element={<PostListPage />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
        </Routes>
      </main>

      <footer className="mt-6" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <span
              className="text-[12px] font-semibold"
              style={{ color: "var(--text-4)" }}
            >
              PostExplorer
            </span>
            <p className="text-[11px]" style={{ color: "var(--text-4)" }}>
              React + Tailwind CSS · Data from{" "}
              <a
                href="https://jsonplaceholder.typicode.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--violet)" }}
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                JSONPlaceholder
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
