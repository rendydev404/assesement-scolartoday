const BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Fetch all posts from JSONPlaceholder API
 * @returns {Promise<Array>} Array of post objects
 */
export async function fetchPosts() {
  const response = await fetch(`${BASE_URL}/posts`);
  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.status}`);
  }
  return response.json();
}

/**
 * Fetch a single post by ID
 * @param {number|string} id - Post ID
 * @returns {Promise<Object>} Post object
 */
export async function fetchPostById(id) {
  const response = await fetch(`${BASE_URL}/posts/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch post: ${response.status}`);
  }
  return response.json();
}

/**
 * Fetch comments for a specific post
 * @param {number|string} postId - Post ID
 * @returns {Promise<Array>} Array of comment objects
 */
export async function fetchCommentsByPostId(postId) {
  const response = await fetch(`${BASE_URL}/posts/${postId}/comments`);
  if (!response.ok) {
    throw new Error(`Failed to fetch comments: ${response.status}`);
  }
  return response.json();
}

/**
 * Fetch user info by ID
 * @param {number|string} userId - User ID
 * @returns {Promise<Object>} User object
 */
export async function fetchUserById(userId) {
  const response = await fetch(`${BASE_URL}/users/${userId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.status}`);
  }
  return response.json();
}
