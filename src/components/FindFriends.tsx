 import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { MessageModal } from './MessageModal';
import { UserCard } from './UserCard';
import { fetchUsers, fetchUserById, followUser, unfollowUser, sendMessage } from '../services/userService';

interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  careerHubId: string;
  username: string;
  photo?: string;
  biography?: string;
}
interface UserResult extends RegisteredUser {
  isFollowing: boolean;
}


interface FindFriendsProps {
  currentUser: {
    id: string;
    careerHubId: string;
  } | null;
}
export function FindFriends({ currentUser }: FindFriendsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UserResult[]>([]);
  const [following, setFollowing] = useState<string[]>([]); // IDs of users being followed
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [selectedUserIdForMessage, setSelectedUserIdForMessage] = useState<string | null>(null);
  const [selectedUserForMessage, setSelectedUserForMessage] = useState<RegisteredUser | null>(null);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const users: RegisteredUser[] = await fetchUsers();
        console.log('Current User in useEffect:', currentUser);
        // Filter out the current user and map to UserResult
        const initialResults = users
          .filter(user => {
            return true;
          })
          .map(user => ({
            ...user,
            isFollowing: following.includes(user.id) // This will be updated by actual follow data
          }));

        setSearchResults(initialResults);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }    };

    fetchUsersData();

    fetchUsersData();

    if (currentUser) {
      const fetchFollowing = async () => {
        try {
          const userData = await fetchUserById(currentUser.id);
          if (userData && userData.following) {
            setFollowing(userData.following);
          }        } catch (error) {
          console.error('Failed to fetch following list:', error);
        }      };
      fetchFollowing();
    }  }, [currentUser, following]); // Added 'following' to dependency array

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase().replace(/^@/, ''); // Remove '@' if present
    console.log('Search query:', query);

    try {
      const users: RegisteredUser[] = await fetchUsers(); // Fetch all users again for search

      const filteredResults = users
        .filter(user =>

          (user.name.toLowerCase().includes(query) ||
           user.username.toLowerCase().includes(query) ||
           user.careerHubId.toLowerCase().includes(query))
        )
        .map(user => ({
          ...user,
          isFollowing: following.includes(user.id)
        }));

      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Failed to search users:', error);
    }  };

  const handleConnect = async (userId: string) => {
    if (!currentUser) {
      alert('Please sign in to connect with other users');
      return;
    }
    try {
      const isCurrentlyFollowing = following.includes(userId);
      if (isCurrentlyFollowing) {
        const updatedUser = await unfollowUser(userId, currentUser.id);
        setFollowing(updatedUser.currentUser.following); // Update following state from backend response
      } else {
        const updatedUser = await followUser(userId, currentUser.id);
        setFollowing(updatedUser.currentUser.following); // Update following state from backend response
      }

    } catch (error) {
      console.error(`Failed to update follow status:`, error);
      alert('Failed to update follow status. Please try again.');
    }
    setSearchResults(results =>
      results.map(user =>
        user.id === userId
          ? { ...user, isFollowing: !user.isFollowing }          : user
      )
    );
  };

  const handleMessageClick = (userId: string) => {
    if (!currentUser) {
      alert('Please log in to send messages.');
      return;
    }
    
    // Find the user object from search results
    const userToMessage = searchResults.find(user => user.id === userId);
    if (userToMessage) {
      setSelectedUserIdForMessage(userId);
      setSelectedUserForMessage(userToMessage);
      setIsMessageModalOpen(true);
    }
  };

  const handleSendMessage = async (messageContent: string) => {
    if (!currentUser || !selectedUserIdForMessage) {
      alert('Error: No user selected for message or not logged in.');
      return;
    }

    try {
      await sendMessage(selectedUserIdForMessage, currentUser.id, messageContent);
      alert('Message sent successfully!');
      setIsMessageModalOpen(false);
      setSelectedUserIdForMessage(null);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('An error occurred while sending the message.');
    }
  };

  const handleCloseMessageModal = () => {
    setIsMessageModalOpen(false);
    setSelectedUserIdForMessage(null);
    setSelectedUserForMessage(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Find Friends</h2>
        
        {/* Search Form */}        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by username or Career Hub ID"
                value={searchQuery}                onChange={(e) => setSearchQuery(e.target.value)}                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Search className="h-5 w-5 mr-2" />
              Search
            </button>
          </div>
        </form>

        {/* Search Results */}        <div className="space-y-4">
          {searchResults.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onConnect={handleConnect}
              onMessageClick={handleMessageClick}
            />
          ))}        </div>

        {searchResults.length === 0 && searchQuery && (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              No users found matching "{searchQuery}". Try a different search term.
            </p>
          </div>
        )}

        {searchResults.length === 0 && !searchQuery && (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              Search for users by username or Career Hub ID.
            </p>
          </div>
        )}
      </div>
      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={handleCloseMessageModal}
        onSend={handleSendMessage}
        recipientName={selectedUserForMessage?.name}
      />
    </div>
  );
}
