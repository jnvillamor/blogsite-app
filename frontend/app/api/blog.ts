'use server'

const API_ENDPOINT = process.env.API_URL;

export const getBlogPosts = async (page: number, limit: number) => {
  const response = await fetch(`${API_ENDPOINT}/blogs?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  console.log('Fetching blog posts from:', `${API_ENDPOINT}/blog/posts?page=${page}&limit=${limit}`);

  if (!response.ok) {
    throw new Error('Failed to fetch blog posts');
  }

  const data = await response.json();
  return data;
}