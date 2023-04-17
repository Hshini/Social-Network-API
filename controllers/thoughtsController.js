const {Thought,User} = require ("../models")

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    Thought.create(req.body)
    .then((thought) => {
        return User.findOneAndUpdate(
          { username: thought.username },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Thought created',
            })
          : res.json('Created the thought')
      )
      .catch((err) => res.status(500).json(err));
  },

    //update 
    updateThought(req, res) {
      Thought.findOneAndUpdate({_id: req.params.thoughtId},
         { thoughtText: req.body.thoughtText }, { new: true})
      .then((answer) => res.json(answer))
      .catch((err) => res.status(500).json(err));
    },
    //Delete
    removeThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err))
    },
    //create a reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
          )
            .then((thought) =>
              !thought
                ? res.status(404).json(thought)
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
      },

    //remove  reaction
    removeReaction(req, res) {
        Thought.findOneAndDelete({ _id: req.params.reactionId },
            { $pull: { reactions: req.params.reactionId } },
            {  runValidators: true,new: true }
            )
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err))
    },
}