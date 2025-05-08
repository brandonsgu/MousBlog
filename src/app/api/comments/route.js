import { getComments, addComment } from '@/lib/comments-data';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');
  const comments = await getComments(postId);
  return Response.json(comments);
}

export async function POST(request) {
  const { postId, content } = await request.json();
  const newComment = await addComment(postId, content);
  return Response.json(newComment);
}