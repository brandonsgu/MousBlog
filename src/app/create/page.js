'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreatePage() {
  const [formData, setFormData] = useState({ 
    title: '', 
    author: '', 
    content: '' 
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">What's your name?</h2>
          <input
            type="text"
            placeholder="Type here..."
            className="w-full p-2 border rounded"
            value={formData.author}
            onChange={(e) => setFormData({...formData, author: e.target.value})}
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Choose a title!</h2>
          <input
            type="text"
            placeholder="Type here..."
            className="w-full p-2 border rounded"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">What's in your mind?</h2>
          <textarea
            placeholder="Type here..."
            className="w-full p-2 border rounded h-32"
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            required
          />
        </div>

        {showConfirm ? (
          <div className="space-y-2">
            <p>Are you sure?</p>
            <div className="flex gap-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => setShowConfirm(false)}
              >
                No
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleSubmit}
              >
                Yes
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded"
              onClick={() => router.push('/')}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setShowConfirm(true)}
              disabled={!formData.title || !formData.content}
            >
              Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
}