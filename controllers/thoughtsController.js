const Thought = require ("../models/Thought")
module.exports = {
    //get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    //get by id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    //post
    createThought(req, res) {
        Thought.create(req.body)
            .then((answer) => res.json(answer))
            .catch((err) => res.status(500).json(err));
    },

    //update 
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId })
            .then((answer) => res.json(answer))
            .catch((err) => res.status(500).json(err));
    },
    //Delete
    removeThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((answer) => res.json(answer))
            .catch((err) => res.status(500).json(err))
    },
    //create a reaction
    createReaction(req, res) {
        Thought.create({ _id: req.params.reactionId })
            .then((answer) => res.json(answer))
            .catch((err) => res.status(500).json(err));
    },

    //remove  reaction
    removeReaction(req, res) {
        Thought.findOneAndDelete({ _id: req.params.reactionId })
            .then((answer) => res.json(answer))
            .catch((err) => res.status(500).json(err))
    },
}