const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');
const User = require('./users')

const thoughtsSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
        required: true,
    },
    userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: 'true'
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);
thoughtsSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  })

const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;