const connection = require('../config/connection');
const {User, Thought } = require('../models/index');
const {users,thoughts} = require ('./data')

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
  
    // Drop existing courses
    await User.deleteMany({});
  
    // Drop existing students
    await Thought.deleteMany({});

    await User.insertMany(users);
    await Thought.insertMany(thoughts);
    console.log("database seeded")
})  

