const router = require('express').Router();
const {
  getThoughts,
  getSinglethought,
  createThought,
  updatethought,
  deletethought,
  createReaction,
  removeReaction,
} = require('../../controllers/thoughtscontroller');

// /api/courses
router.route('/').get(getThoughts).post(createThought);

// /api/courses/:courseId
router
  .route('/:thoughtId')
  .get(getSinglethought)
  .put(updatethought)
  .delete(deletethought);

  router
  .route('/:thoughtId/reactions')
  .post(createReaction)

  router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction)

module.exports = router;

// 6599b1a17763e76107cfbd71

