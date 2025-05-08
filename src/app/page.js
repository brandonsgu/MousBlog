import Link from 'next/link';
import { getPosts } from '@/lib/posts-data';

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Recent Posts</h1>
      {posts.map(post => (
        <div key={post.id} className="border p-4 rounded">
          <Link href={`/post/${post.id}`}>
            <h2 className="text-xl font-semibold hover:underline">{post.title}</h2>
          </Link>
          <p className="text-gray-600">By {post.author || 'Anonymous'}</p>
        </div>
      ))}
    </div>
  );
}