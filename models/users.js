const { Schema, model } = require('mongoose');
const Thoughts = require('./thoughts')

const userSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        max_length: 50,
      },
      email: {
        type: String,
        required: true,
        max_length: 50,
      },
      friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thoughts' }],
    },
    {
      toJSON: {
        getters: true,
      },
    }
  );
  userSchema
  .virtual('friendcount')
  // Getter
  .get(function () {
    return this.friends.length;
  })
  

  
  const User = model('user', userSchema);
  
  module.exports = User;