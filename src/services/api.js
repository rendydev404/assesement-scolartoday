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

/**
 * Fetch all users
 * @returns {Promise<Array>} Array of user objects
 */
export async function fetchAllUsers() {
  const response = await fetch(`${BASE_URL}/users`);
  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status}`);
  }
  return response.json();
}

/**
 * Fetch photos for a specific album (we use postId as albumId for demo)
 * Uses picsum.photos for reliable image loading since via.placeholder.com is often down
 * @param {number|string} albumId - Album ID (mapped from post)
 * @returns {Promise<Array>} Array of photo objects with working URLs
 */
export async function fetchPhotosByAlbumId(albumId) {
  const response = await fetch(`${BASE_URL}/photos?albumId=${albumId}&_limit=1`);
  if (!response.ok) {
    throw new Error(`Failed to fetch photos: ${response.status}`);
  }
  const photos = await response.json();
  // Replace broken via.placeholder.com URLs with picsum.photos
  return photos.map((photo) => ({
    ...photo,
    url: `https://picsum.photos/seed/${photo.id}/600/400`,
    thumbnailUrl: `https://picsum.photos/seed/${photo.id}/150/150`,
  }));
}
