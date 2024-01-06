const { ObjectId } = require('mongoose').Types;
const { users, Thoughts, reaction } = require('../models');

module.exports = {
    // Get all students
    async getusers(req, res) {
      try {
        const user = await users.find();
  
        const userobj = {
          user,
          // headCount: await headCount(),
        };
  
        res.json(userobj);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // Get a single user
    async getSingleUser(req, res) {
      try {
        const user = await users.findOne({ _id: req.params.userId })
          .select('-__v');
  
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' })
        }
  
        res.json( user );
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    async createuser(req, res) {
        try {
          const user = await users.create(req.body);
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },

   async updateUser(req, res) {
        try {
          const user = await users.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
          }
    
          res.json(user);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
      // Delete a user and remove them from the course
      async deleteUser(req, res) {
        try {
          const user = await users.findOneAndDelete({ _id: req.params.userId });
    
          if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
          }
    
          const thought = await Thoughts.findOneAndUpdate(
            { user: req.params.userId },
            { $pull: { user: req.params.userId } },
            { new: true }
          );
    
          if (!thought) {
            return res.status(404).json({
              message: 'user deleted, but no thoughtcourses found',
            });
          }
    
          res.json({ message: 'user successfully deleted' });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },

      async createFriend(req, res){
        try {
          const CurentUser = await users.findById({_id: req.params.userId});
          if (!CurentUser) {
            return res.status(404).json({ message: 'No such user exists' });
          }
          const friendToAdd = await users.findById( req.params.friendId );
    
          if (!friendToAdd) {
            return res.status(404).json({
              message: 'no user found found',
            });
          }
          if (CurentUser.friends.includes(friendToAdd._id)) {
            return res.status(400).json({ message: 'User is already a friend' });
          }CurentUser.friends.push(friendToAdd._id);
          await CurentUser.save();
      
          res.status(200).json({ message: 'Friend added successfully', user: CurentUser });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
      async deleteFriend(req, res) {
        try {
          const currentUser = await users.findById(req.params.userId);
      
          if (!currentUser) {
            return res.status(404).json({ message: 'No such user exists' });
          }
      
          const friendToRemove = await users.findById(req.body.friendId); 
      
          if (!friendToRemove) {
            return res.status(404).json({ message: 'Friend user not found' });
          }
          const index = currentUser.friends.indexOf(friendToRemove._id);
            if (index === -1) {
              return res.status(400).json({ message: 'User is not a friend' });
            }
            currentUser.friends.splice(index, 1);
            await currentUser.save();

                res.status(200).json({ message: 'Friend removed successfully', user: currentUser });
              } catch (err) {
                console.log(err);
                res.status(500).json(err);
              }
            }
        }
