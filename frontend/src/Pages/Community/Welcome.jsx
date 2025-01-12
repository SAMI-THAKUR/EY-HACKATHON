import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Share2, Bookmark, Users, Star, Search } from 'lucide-react';
import postsData from '../../data/posts.json';
import mentorsData from '../../data/mentors.json';
import peersData from '../../data/peers.json';

const Welcome = ({ 
  onJoinCommunity, 
  communities = [], 
  onSelectCommunity 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState(postsData.posts.slice(0, 5));
  const mentors = mentorsData.mentors.slice(0, 3);
  const peers = peersData.peers.slice(0, 3);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = postsData.posts.filter(post => 
      post.content.toLowerCase().includes(query.toLowerCase()) ||
      post.author.name.toLowerCase().includes(query.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    setPosts(filtered.slice(0, 5));
  };

  return (
    <div>
      {/* Welcome Title */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-3">Welcome to Community</h1>
        <p className="text-gray-400">Connect, learn, and grow with fellow tech enthusiasts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Posts Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search posts, people, or topics..."
              className="w-full bg-gray-700/50 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <h2 className="text-2xl font-bold mb-6">Community Posts</h2>
          {posts.map(post => (
            <div key={post.id} className="bg-gray-800/50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full" />
                <div>
                  <div className="font-medium">{post.author.name}</div>
                  <div className="text-sm text-gray-400">{post.author.role} • {post.time}</div>
                </div>
              </div>
              <p className="text-gray-200 mb-4">{post.content}</p>
              {post.tags && (
                <div className="flex gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="text-sm text-indigo-400">#{tag}</span>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-4 text-gray-400">
                <button className="flex items-center gap-2 hover:text-white">
                  <ThumbsUp className="w-5 h-5" /> {post.likes}
                </button>
                <button className="flex items-center gap-2 hover:text-white">
                  <MessageSquare className="w-5 h-5" /> {post.comments}
                </button>
                <button className="flex items-center gap-2 hover:text-white">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="flex items-center gap-2 hover:text-white ml-auto">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column - Recommendations */}
        <div className="space-y-8">
          {/* Communities Section */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" /> Communities
            </h3>
            {communities.map(community => (
              <div key={community.id} className="mb-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{community.name}</div>
                    <div className="text-sm text-gray-400">
                      {community.members.toLocaleString()} members
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onJoinCommunity(community.id);
                      onSelectCommunity(community.id);
                    }}
                    className="px-3 py-1 bg-indigo-600 text-sm rounded-lg hover:bg-indigo-700"
                  >
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5" /> Top Mentors
            </h3>
            {mentors.map((mentor) => (
              <div key={mentor.id} className="flex items-center gap-3 mb-4 p-2 hover:bg-gray-700/50 rounded-lg cursor-pointer">
                <div className="relative">
                  <img src={mentor.avatar} alt={mentor.name} className="w-10 h-10 rounded-full" />
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${mentor.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                </div>
                <div>
                  <div className="font-medium">{mentor.name}</div>
                  <div className="text-sm text-gray-400">{mentor.role}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Peers Section */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" /> Recommended Peers
            </h3>
            {peers.map((peer) => (
              <div key={peer.id} className="flex items-center gap-3 mb-4 p-2 hover:bg-gray-700/50 rounded-lg cursor-pointer">
                <img src={peer.avatar} alt={peer.name} className="w-10 h-10 rounded-full" />
                <div>
                  <div className="font-medium">{peer.name}</div>
                  <div className="text-sm text-gray-400">{peer.skills.join(' • ')}</div>
                  <div className="text-xs text-green-400">{peer.matchScore} match</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Welcome.defaultProps = {
  onJoinCommunity: () => {},
  communities: [],
  onSelectCommunity: () => {}
};

export default Welcome;
