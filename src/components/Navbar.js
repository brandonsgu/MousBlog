'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="text-xl font-bold">MouseBlog</Link>
        <Link href="/create" className="px-4 py-2 bg-blue-500 rounded">
          Create Post
        </Link>
      </div>
    </nav>
  );
}