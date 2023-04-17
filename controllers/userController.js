const User =require('../models/User')
module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    console.log("Get user ");
    User.findOne({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((answer) => res.json(answer))
      .catch((err) => res.status(500).json(err));
  },

  //update user
  updateUser(req, res) {
    User.findOneAndUpdate({_id: req.params.userId},
       {username: req.body.username, email: req.body.email},
        { new: true})
    .then((answer) => {
      console.log(answer);
      return res.json(answer)
    })
    .catch((err) => res.status(500).json(err));
  },
  //delete user

  removeUser(req,res){
    User.findOneAndDelete({_id:req.params.userId})
    .then((answer)=>res.json(answer))
    .catch((err)=> res.status(500).json(err))
  },
    //Create Friend
  addFriend(req, res) {
      User.findOneAndUpdate(
        
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true,new: true }
        
      )
      .then((answer) => res.json(answer))
      .catch((err) => res.status(500).json(err));
  },

  //remove Friend
  removeFriend(req,res){
    User.findOneAndUpdate({_id: req.params.userId},
       { $pull: { friends: req.params.friendId } },
        { new: true})
    .then((answer) => res.json(answer))
    .catch((err) => res.status(500).json(err));
  }
};

