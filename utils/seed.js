const connection = require('../config/connection');
const {User, Thought } = require('../models');




connection.once('open', async () => {
    console.log('connected');
  
    // Drop existing courses
    await Course.deleteMany({});
  
    // Drop existing students
    await Student.deleteMany({});
})  