import pool from './db';

export async function getComments(postId) {
  const [comments] = await pool.query(
    'SELECT * FROM comments WHERE post_id = ? ORDER BY created_at DESC',
    [postId]
  );
  return comments;
}

export async function addComment(postId, content) {
  const [result] = await pool.query(
    'INSERT INTO comments (post_id, content) VALUES (?, ?)',
    [postId, content]
  );
  return { id: result.insertId, content };
}