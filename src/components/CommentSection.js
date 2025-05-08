'use client';
import { useEffect, useState } from 'react';

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);

  const loadComments = async () => {
    const res = await fetch(`/api/comments?postId=${postId}`);
    const data = await res.json();
    setComments(data);
  };

  useEffect(() => {
    loadComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, content: newComment, parentId: replyTo }),
    });
    setNewComment('');
    setReplyTo(null);
    loadComments();
  };

  const getCommentById = (id) => comments.find((c) => c.id === id);

  const renderComments = (parentId = null, level = 0) => {
    return comments
      .filter(comment => comment.parent_id === parentId)
      .map(comment => (
        <div key={comment.id} className={`mt-4 ${level > 0 ? 'ml-6 border-l-2 border-blue-400 pl-4' : ''}`}>
          <div className={`bg-gray-800 text-white p-3 rounded-md shadow-md border border-gray-700`}>

            {level > 0 && (
              <p className="text-xs text-gray-500 mb-1">
                ↳ <em>Replying to:</em> {getCommentById(comment.parent_id)?.content.slice(0, 50) || 'Comment'}
              </p>
            )}
            <p>{comment.content}</p>
            <button
              onClick={() => setReplyTo(comment.id)}
              className="text-xs text-blue-600 hover:underline mt-1"
            >
              Reply
            </button>
          </div>
          {renderComments(comment.id, level + 1)}
        </div>
      ));
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="mb-4">
        {replyTo && (
          <div className="mb-3 p-3 bg-gray-800 text-white rounded-md">
            <p className="text-sm text-blue-300">Replying to:</p>
            <blockquote className="text-xs italic text-gray-300 border-l-4 border-blue-500 pl-3 my-2">
              {getCommentById(replyTo)?.content || 'Comment not found'}
            </blockquote>
            <button
              type="button"
              onClick={() => setReplyTo(null)}
              className="text-sm text-red-400 hover:underline"
            >
              Cancel
            </button>
          </div>
        )}
        <textarea
          placeholder="Leave a comment..."
          className="w-full p-3 border border-gray-500 bg-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={3}
        />
        <button
          type="submit"
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Post
        </button>
      </form>

      <div>{renderComments()}</div>
    </div>
  );
}
