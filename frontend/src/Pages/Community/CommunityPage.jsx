import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, ThumbsUp, Share2, Bookmark, Send, Search, Filter, Users, Hash, Star, Rocket } from 'lucide-react';
import Welcome from './Welcome';
import Posts from './Posts';
import mentorsData from '../../data/mentors.json';
import peersData from '../../data/peers.json';
import communitiesData from '../../data/communities.json';
import chatsData from '../../data/chats.json';

const CommunityPage = () => {
  const [hasJoinedCommunities, setHasJoinedCommunities] = useState(false);
  const [currentChannel, setCurrentChannel] = useState('general');
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef(null);

  // Use data from JSON files
  const [mentors] = useState(mentorsData.mentors);
  const [peers] = useState(peersData.peers);
  const [communities] = useState(communitiesData.communities);
  const [chats, setChats] = useState(chatsData.chats);

  const handleJoinCommunity = (groupId) => {
    setJoinedGroups([...joinedGroups, groupId]);
    if (!hasJoinedCommunities) {
      setHasJoinedCommunities(true);
    }
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChannel, chats]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const newMessageObj = {
      id: Date.now(),
      author: {
        name: "Current User",
        avatar: "/profile.webp"
      },
      content: newMessage,
      timestamp: new Date().toISOString()
    };

    // Add new message to current chat
    const updatedChats = chats.map(chat => {
      if (chat.channel === currentChannel) {
        return {
          ...chat,
          messages: [...(chat.messages || []), newMessageObj]
        };
      }
      return chat;
    });

    setChats(updatedChats);
    setNewMessage('');
    scrollToBottom();
  };

  if (selectedCommunity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <button 
          onClick={() => setSelectedCommunity(null)} 
          className="absolute top-4 left-4 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
        >
          ← Back to Feed
        </button>
        
        <div className="flex h-screen pt-16">
          {/* Left Sidebar - Channels */}
          <div className="w-64 bg-gray-800/50 border-r border-gray-700 overflow-y-auto">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" /> Communities
              </h2>
            </div>
            {communities.map((community) => (
              <div key={community.id} className="px-2 mb-4">
                <div className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700/50 rounded-lg cursor-pointer">
                  <span className="mr-2">{community.icon}</span>
                  <span>{community.name}</span>
                </div>
                <div className="ml-4">
                  {community.channels.map((channel) => (
                    <div
                      key={channel}
                      onClick={() => setCurrentChannel(channel)}
                      className={`flex items-center px-4 py-2 text-sm rounded-lg cursor-pointer ${
                        currentChannel === channel ? 'bg-indigo-600' : 'hover:bg-gray-700/50'
                      }`}
                    >
                      <Hash className="w-4 h-4 mr-2" />
                      {channel}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Middle Section - Posts Feed */}
          <div className="flex-1 flex flex-col bg-gray-800/30">
            <div className="h-16 border-b border-gray-700 flex items-center px-6 bg-gray-800/50">
              <Hash className="w-5 h-5 mr-2" />
              <span className="font-semibold">{currentChannel}</span>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <Posts currentChannel={currentChannel} />
            </div>
          </div>

          {/* Right Section - Chat */}
          <div className="w-80 bg-gray-800/50 border-l border-gray-700 flex flex-col">
            <div className="h-16 border-b border-gray-700 flex items-center px-6">
              <h3 className="font-semibold">Community Chat - {currentChannel}</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {chats.find(chat => chat.channel === currentChannel)?.messages ? (
                  chats.find(chat => chat.channel === currentChannel).messages.map(message => (
                    <div key={message.id} className="flex gap-3">
                      <img src={message.author.avatar} className="w-8 h-8 rounded-full" alt="" />
                      <div className="flex-1">
                        <div className="bg-gray-700/50 rounded-lg p-3 inline-block max-w-[85%]">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{message.author.name}</span>
                            <span className="text-xs text-gray-400">
                              {formatTimestamp(message.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300 mt-1">{message.content}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-400">
                    No messages in this channel yet. Start the conversation!
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            </div>

            <div className="p-4 border-t border-gray-700">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-700/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button 
                  onClick={handleSendMessage}
                  className="p-2 bg-indigo-600 rounded-lg hover:bg-indigo-700"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!hasJoinedCommunities) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="h-16 bg-gray-800/50 border-b border-gray-700 flex items-center px-6">
          <div className="flex-1 flex items-center max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search communities, mentors, or posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-700/50 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <button className="ml-2 p-2 hover:bg-gray-700 rounded-lg">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
    
              <Welcome 
                onJoinCommunity={handleJoinCommunity} 
                communities={communities}
                mentors={mentors}
                peers={peers}
                onSelectCommunity={(id) => setSelectedCommunity(id)}
              />
            </div>


      </div>
    );
  }

  // Main feed when user has joined communities
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Your Feed</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                Latest
              </button>
              <button className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                Popular
              </button>
            </div>
          </div>
          <Posts currentChannel={currentChannel} />
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
