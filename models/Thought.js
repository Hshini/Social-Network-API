const reactionSchema = require ('./Reaction')
const { Schema, model } = require('mongoose');


// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength:1,
      maxLength: 280
    },
    createdAt: {
      type:Date,
      default:Date.now,
      // get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
     
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("formatDate").get(function () {
	const date = new Date(this.createdAt);
	return date.toLocaleString();
});

thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

const Thought = model('thought', thoughtSchema);

module.exports = Thought
