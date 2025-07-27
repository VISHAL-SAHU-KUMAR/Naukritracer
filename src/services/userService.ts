const API_BASE_URL = 'http://localhost:5000';

export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/api/users`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const fetchUserById = async (userId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/users/${userId}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const followUser = async (userIdToFollow: string, currentUserId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/users/${userIdToFollow}/follow`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ currentUserId }),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message);
  }
  return response.json();
};

export const unfollowUser = async (userIdToUnfollow: string, currentUserId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/users/${userIdToUnfollow}/unfollow`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ currentUserId }),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message);
  }
  return response.json();
};

export const sendMessage = async (targetUserId: string, senderId: string, messageContent: string) => {
  const response = await fetch(`${API_BASE_URL}/api/users/${targetUserId}/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ senderId, messageContent }),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message);
  }
  return response.json();
};

// Update user profile
export const updateUserProfile = async (userId: string, profileData: any) => {
  const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profileData),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message);
  }
  return response.json();
};

// Check username availability
export const checkUsernameAvailability = async (username: string, currentUserId?: string) => {
  const response = await fetch(`${API_BASE_URL}/api/check-username`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, currentUserId }),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message);
  }
  return response.json();
};

// Get user messages
export const fetchUserMessages = async (userId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/users/${userId}/messages`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};