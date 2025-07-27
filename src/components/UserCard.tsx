import React from 'react';
import { User, X, UserPlus, MessageCircle } from 'lucide-react';

interface UserResult {
  id: string;
  name: string;
  username: string;
  careerHubId: string;
  photo?: string;
  biography?: string;
  isFollowing: boolean;
}

interface UserCardProps {
  user: UserResult;
  onConnect: (userId: string) => void;
  onMessageClick: (userId: string) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onConnect, onMessageClick }) => {
  return (
    <div
      key={user.id}
      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
    >
      <div className="flex items-center space-x-4">
        {user.photo ? (
          <img
            src={user.photo}
            alt={user.name}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="h-12 w-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </div>
        )}
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">{user.name}</h3>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>@{user.username}</p>
            <p>ID: {user.careerHubId}</p>
            {user.biography && (
              <p className="mt-1 text-gray-600 dark:text-gray-300">{user.biography}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onConnect(user.id)}
          className={`p-2 rounded-lg transition-colors flex items-center ${
            user.isFollowing
              ? 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
              : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
          }`}
        >
          {user.isFollowing ? (
            <>
              <X className="h-5 w-5 mr-2" />
              Unfollow
            </>
          ) : (
            <>
              <UserPlus className="h-5 w-5 mr-2" />
              Follow
            </>
          )}
        </button>
        <button
          onClick={() => onMessageClick(user.id)}
          className="p-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg transition-colors flex items-center"
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          Message
        </button>
      </div>
    </div>
  );
};