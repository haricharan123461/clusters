const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); 

mongoose.connect('mongodb://localhost:27017/usersDB') 
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true }
});
const User = mongoose.model('User', userSchema);


app.get('/', (req, res) => {
  res.send('Server is running');
});


app.post('/users', async (req, res) => {
  try {
    const { name, age } = req.body;
    const newUser = new User({ name, age });
    await newUser.save();
    res.status(201).json({ message: 'User created', user: newUser });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
});


app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching user', error });
  }
});

app.patch('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated', user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted', user: deletedUser });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting user', error });
  }
});



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
