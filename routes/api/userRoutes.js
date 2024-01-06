const router = require('express').Router();
const {
  getusers,
  getSingleUser,
  createuser,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend
} = require('../../controllers/usercontroller');

// /api/courses
router.route('/').get(getusers).post(createuser);

// /api/courses/:courseId
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

  router
  .route('/:userId/friends/:friendId')
  .post(createFriend)
  .delete(deleteFriend)

module.exports = router;

