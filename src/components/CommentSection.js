'use client';
import { useEffect, useState } from 'react';

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const loadComments = async () => {
    const res = await fetch(`/api/comments?postId=${postId}`);
    const data = await res.json();
    setComments(data);
  };

  useEffect(() => {
    loadComments(); // Load on initial mount
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, content: newComment })
    });
    setNewComment('');
    loadComments(); // Reload after posting
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          placeholder="Leave a comment!"
          className="w-full p-2 border rounded"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button 
          type="submit" 
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Post
        </button>
      </form>

      <div className="space-y-2">
        {comments.map(comment => (
          <p key={comment.id} className="p-2 bg-white text-black rounded shadow">
  {comment.content}
          </p>
        ))}
      </div>
    </div>
  );
}
