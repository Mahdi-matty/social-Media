const {Thoughts, users, reaction} = require('../models');

module.exports = {
    // Get all courses
    async getThoughts(req, res) {
      try {
        const thought = await Thoughts.find();
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    async getSinglethought(req, res) {
        try {
          const thought = await Thoughts.findOne({ _id: req.params.thoughtId })

    
          if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
          }
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },

      async createThought(req, res) {
        try {
          const { text, username, userId } = req.body;
          const thought = await Thoughts.create({ text, username, userId });
          res.json(thought);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },

      async deletethought(req, res) {
        try {
          const thought = await Thoughts.findOneAndDelete({ _id: req.params.thoughtId });
    
          if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
          }
    
          await users.deleteMany({ _id: { $in: thought.user } });
          res.json({ message: 'thought and users deleted!' });
        } catch (err) {
          res.status(500).json(err);
        }
      },
      async updatethought(req, res) {
        try {
          const thought = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!thought) {
            res.status(404).json({ message: 'No thought with this id!' });
          }
    
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      async createReaction(req, res){
        try {
          const thoughtwant = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
          );
    
          if (!thoughtwant) {
            return res
              .status(404)
              .json({ message: 'No thought found with that ID :(' });
          }
    
          res.json(thoughtwant);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      async removeReaction(req, res) {
        try {
          const thoughtWithReaction = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
          );
      
          if (!thoughtWithReaction) {
            return res.status(404).json({ message: 'No thought found with that ID :(' });
          }
      
          res.json(thoughtWithReaction);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    
    
    };
    