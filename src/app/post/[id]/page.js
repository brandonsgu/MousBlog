import CommentSection from '@/components/CommentSection';
import { getPostById } from '@/lib/posts-data';

export default async function PostPage({ params }) {
  const post = await getPostById(params.id);

  return (
    <div className="max-w-2xl mx-auto">
      <article className="mb-8">
        <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-600 mb-4">Written by: {post.author || 'Anonymous'}</p>
        <p className="whitespace-pre-line">{post.content}</p>
      </article>

      <CommentSection postId={params.id} />
    </div>
  );
}