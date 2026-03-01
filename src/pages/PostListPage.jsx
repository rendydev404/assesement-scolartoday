import { useState, useEffect, useMemo } from "react";
import { fetchPosts } from "../services/api";
import PostCard from "../components/PostCard";
import GlassDropdown from "../components/GlassDropdown";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

export default function PostListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState("all");

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPosts();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const userIds = useMemo(
    () => [...new Set(posts.map((p) => p.userId))].sort((a, b) => a - b),
    [posts],
  );

  const userOptions = useMemo(
    () => [
      { value: "all", label: "All Users" },
      ...userIds.map((id) => ({ value: String(id), label: `User ${id}` })),
    ],
    [userIds],
  );

  const filteredPosts = useMemo(
    () =>
      posts.filter((post) => {
        const matchesSearch =
          searchQuery === "" ||
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.body.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesUser =
          selectedUser === "all" || post.userId === Number(selectedUser);
        return matchesSearch && matchesUser;
      }),
    [posts, searchQuery, selectedUser],
  );

  if (loading) return <LoadingSpinner text="Loading posts..." />;
  if (error) return <ErrorMessage message={error} onRetry={loadPosts} />;

  return (
    <div className="animate-fade-in">
      {/* iOS-style large title header */}
      <div className="pt-6 pb-2 sm:pt-10 sm:pb-4">
        <p
          className="text-[13px] font-semibold uppercase tracking-wider mb-1"
          style={{ color: "var(--violet)" }}
        >
          JSONPlaceholder
        </p>
        <h1
          className="text-[28px] sm:text-[34px] font-extrabold tracking-tight leading-tight"
          style={{ color: "var(--text-1)" }}
        >
          Explore Posts
        </h1>
        <p
          className="text-[13px] sm:text-[14px] mt-1"
          style={{ color: "var(--text-3)" }}
        >
          {posts.length} posts · {userIds.length} users
        </p>
      </div>

      {/* iOS search + filter bar */}
      <div
        className="sticky top-12 sm:top-14 z-30 py-3"
        style={{
          background: "var(--bg)",
        }}
      >
        <div className="flex flex-col sm:flex-row gap-2.5">
          {/* Search */}
          <div className="relative flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              style={{ color: "var(--text-4)" }}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ios-search"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: "var(--text-4)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>

          <GlassDropdown
            value={selectedUser}
            onChange={setSelectedUser}
            options={userOptions}
            placeholder="All Users"
          />
        </div>

        {/* Filter info */}
        {(searchQuery || selectedUser !== "all") && (
          <div className="flex items-center justify-between mt-2.5 text-[12px]">
            <span style={{ color: "var(--text-3)" }}>
              <span style={{ color: "var(--violet)", fontWeight: 700 }}>
                {filteredPosts.length}
              </span>{" "}
              results
            </span>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedUser("all");
              }}
              className="font-semibold"
              style={{ color: "var(--violet)" }}
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Posts */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-4xl mb-3">🔍</div>
          <h3
            className="text-base font-semibold mb-1"
            style={{ color: "var(--text-1)" }}
          >
            No Results
          </h3>
          <p className="text-sm" style={{ color: "var(--text-3)" }}>
            Try a different search term or filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 pb-8">
          {filteredPosts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
