import React, { useState, useEffect } from 'react';
import { MessageCircle, User, Clock, Inbox, Send, Trash2, MailOpen, Mail } from 'lucide-react';
import { fetchUserMessages } from '../services/userService';
import { LoadingSpinner } from './LoadingSpinner';

interface Message {
  senderId: string;
  senderUsername: string;
  message: string;
  timestamp: string;
}

interface MessagesProps {
  currentUser: {
    id: string;
    name: string;
  } | null;
}

export function Messages({ currentUser }: MessagesProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    if (currentUser?.id) {
      fetchMessages();
    }
  }, [currentUser]);

  const fetchMessages = async () => {
    if (!currentUser?.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetchUserMessages(currentUser.id);
      setMessages(response.messages || []);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      setError('Failed to load messages. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    if (diffInMinutes < 43200) return `${Math.floor(diffInMinutes / 1440)}d ago`;
    
    return date.toLocaleDateString();
  };

  const truncateMessage = (message: string, maxLength: number = 60) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
  };

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
          <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Sign In Required
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please sign in to view your messages.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <LoadingSpinner />
          <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
            Loading your messages...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
          <div className="text-red-500 mb-4">
            <MessageCircle className="h-16 w-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Error Loading Messages
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <button
            onClick={fetchMessages}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Inbox className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Messages
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {messages.length} message{messages.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="p-6 text-center">
                  <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    No messages yet
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                    Messages from other users will appear here
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedMessage(message)}
                      className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                        selectedMessage === message ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {message.senderUsername ? message.senderUsername.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              @{message.senderUsername || 'Unknown User'}
                            </p>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatTimestamp(message.timestamp)}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {truncateMessage(message.message)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg h-full">
            {selectedMessage ? (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {selectedMessage.senderUsername ? selectedMessage.senderUsername.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        @{selectedMessage.senderUsername || 'Unknown User'}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(selectedMessage.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        // TODO: Implement reply functionality
                        alert('Reply functionality coming soon!');
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors"
                      title="Reply"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => {
                        // TODO: Implement delete functionality  
                        alert('Delete functionality coming soon!');
                      }}
                      className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-center p-8">
                <div>
                  <MailOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Select a message
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Choose a message from the list to view its content
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}