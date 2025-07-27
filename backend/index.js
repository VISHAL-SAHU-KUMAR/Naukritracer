const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/careerhub', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  careerHubId: { type: String, required: true, unique: true },
  accountPrivacy: { type: String, default: 'public' },
  followers: { type: Array, default: [] },
  following: { type: Array, default: [] },
  messages: { type: Array, default: [] },
  username: { type: String, required: true, unique: true },
  usernameStatus: { type: String, default: 'available' },
  photo: { type: String },
  bannerImage: { type: String },
  gender: { type: String },
  dateOfBirth: { type: String },
  biography: { type: String },
  skills: { type: Array, default: [] },
  experience: { type: String },
  education: { type: String },
  location: { type: String },
  state: { type: String },
  country: { type: String },
  phone: { type: String },
  githubUrl: { type: String },
  linkedinUrl: { type: String },
  telegramId: { type: String },
  instagramId: { type: String },
  discordId: { type: String },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/api/register', async (req, res) => {
  try {
    const { password, ...userData } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ ...userData, password: hashedPassword });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if user.password is defined before comparing
    if (!user.password) {
      console.error('User found but password field is undefined for email:', email);
      return res.status(500).json({ message: 'User password data is invalid. Please try registering again.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/users/:id/follow', async (req, res) => {
  try {
    const { id } = req.params;
    const { currentUserId } = req.body; // Assuming current user's ID is sent in the request body

    const userToFollow = await User.findById(id);
    const currentUser = await User.findById(currentUserId);

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add to following list of current user
    if (!currentUser.following.includes(id)) {
      currentUser.following.push(id);
      await currentUser.save();
    }

    // Add to followers list of user being followed
    if (!userToFollow.followers.includes(currentUserId)) {
      userToFollow.followers.push(currentUserId);
      await userToFollow.save();
    }

    res.status(200).json({ message: 'User followed successfully', currentUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/users/:id/unfollow', async (req, res) => {
  try {
    const { id } = req.params;
    const { currentUserId } = req.body; // Assuming current user's ID is sent in the request body

    const userToUnfollow = await User.findById(id);
    const currentUser = await User.findById(currentUserId);

    if (!userToUnfollow || !currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove from following list of current user
    currentUser.following = currentUser.following.filter(followId => followId !== id);
    await currentUser.save();

    // Remove from followers list of user being unfollowed
    userToUnfollow.followers = userToUnfollow.followers.filter(followerId => followerId !== currentUserId);
    await userToUnfollow.save();

    res.status(200).json({ message: 'User unfollowed successfully', currentUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user messages
app.get('/api/users/:id/messages', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Sort messages by timestamp (newest first)
    const sortedMessages = user.messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    res.status(200).json({ messages: sortedMessages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/users/:id/message', async (req, res) => {
  try {
    const { id } = req.params; // Receiver's ID
    const { senderId, messageContent } = req.body;

    const receiver = await User.findById(id);
    const sender = await User.findById(senderId);

    if (!receiver || !sender) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newMessage = {
      senderId: sender._id,
      senderUsername: sender.username,
      message: messageContent,
      timestamp: new Date(),
    };

    receiver.messages.push(newMessage);
    sender.messages.push(newMessage);

    await receiver.save();
    await sender.save();

    res.status(200).json({ message: 'Message sent successfully', receiverMessages: receiver.messages, senderMessages: sender.messages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Remove password from update data if it exists and is empty
    if (updateData.password === '') {
      delete updateData.password;
    }
    
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { 
      new: true, 
      runValidators: true 
    });
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(updatedUser);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ message: `${field} already exists` });
    }
    res.status(400).json({ message: error.message });
  }
});

// Check username availability
app.post('/api/check-username', async (req, res) => {
  try {
    const { username, currentUserId } = req.body;
    
    if (!username || username.length < 3) {
      return res.status(400).json({ status: 'invalid', message: 'Username must be at least 3 characters' });
    }
    
    const existingUser = await User.findOne({ username, _id: { $ne: currentUserId } });
    
    if (existingUser) {
      return res.status(200).json({ status: 'taken', message: 'Username is already taken' });
    }
    
    res.status(200).json({ status: 'available', message: 'Username is available' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    console.log('Users fetched from DB:', users.map(user => ({ id: user.id, name: user.name, careerHubId: user.careerHubId, username: user.username })));
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Application Schema
const applicationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  jobId: { type: String, required: true },
  status: { type: String, enum: ['pending', 'reviewed', 'accepted', 'rejected'], default: 'pending' },
  appliedDate: { type: Date, default: Date.now },
  job: {
    id: String,
    title: String,
    company: String,
    location: String,
    type: String,
    salary: String,
    description: String,
    requirements: [String],
    benefits: [String],
    postedDate: String,
    logo: String,
    isRemote: Boolean,
    experienceLevel: String,
    category: String,
    applicants: Number
  }
});

const Application = mongoose.model('Application', applicationSchema);

// Get user's applications
app.get('/api/applications/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const applications = await Application.find({ userId });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit new application
app.post('/api/applications', async (req, res) => {
  try {
    const newApplication = new Application(req.body);
    await newApplication.save();
    res.status(201).json(newApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete application
app.delete('/api/applications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Application.findByIdAndDelete(id);
    res.status(200).json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update application status
app.patch('/api/applications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});