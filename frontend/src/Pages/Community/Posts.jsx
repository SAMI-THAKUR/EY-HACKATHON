import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Share2, Bookmark, Image, Paperclip } from 'lucide-react';
import postsData from '../../data/posts.json';

const Posts = ({ currentChannel }) => {
  const [posts, setPosts] = useState(postsData.posts);
  const [newPost, setNewPost] = useState("");

  const handlePost = () => {
    if (!newPost.trim()) return;
    
    const post = {
      id: posts.length + 1,
      author: {
        name: "Current User",
        role: "Member",
        avatar: "/profile.webp"
      },
      content: newPost,
      time: "Just now",
      likes: 0,
      comments: 0,
      tags: []
    };

    setPosts([post, ...posts]);
    setNewPost("");
  };

  return (
    <div className="space-y-6">
      {/* Create Post */}
      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
        <div className="flex gap-4 mb-4">
          <img src="/profile.webp" alt="user" className="w-10 h-10 rounded-full" />
          <input
            type="text"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share your thoughts..."
            className="flex-1 bg-gray-700/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-700/50 rounded-lg">
              <Image className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-700/50 rounded-lg">
              <Paperclip className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={handlePost}
            className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            Post
          </button>
        </div>
      </div>

      {/* Posts List */}
      {posts.map((post) => (
        <div key={post.id} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-4 mb-4">
            <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full" />
            <div>
              <h4 className="font-semibold">{post.author.name}</h4>
              <p className="text-sm text-gray-400">{post.author.role} • {post.time}</p>
            </div>
          </div>
          
          <p className="mb-4">{post.content}</p>
          
          {post.images && (
            <div className="mb-4">
              <img src={post.images[0]} alt="Post content" className="rounded-lg w-full" />
            </div>
          )}
          
          {post.tags && (
            <div className="flex gap-2 mb-4">
              {post.tags.map((tag, index) => (
                <span key={index} className="text-sm text-indigo-400">
                  #{tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex gap-6 pt-4 border-t border-gray-700">
            <button className="flex items-center gap-2 text-gray-400 hover:text-white">
              <ThumbsUp className="w-4 h-4" /> {post.likes}
            </button>
            <button className="flex items-center gap-2 text-gray-400 hover:text-white">
              <MessageSquare className="w-4 h-4" /> {post.comments}
            </button>
            <button className="flex items-center gap-2 text-gray-400 hover:text-white">
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button className="flex items-center gap-2 text-gray-400 hover:text-white ml-auto">
              <Bookmark className="w-4 h-4" /> Save
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
