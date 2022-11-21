const express = require('express');
const authMiddleware = require('../middlewares/auth');
const {
  getRoomList,
  getRoomInfo,
  getStatus,
  createGroup,
} = require('../controllers/roomControllers');

const router = express.Router();

router.route('/').get(authMiddleware, getRoomList);
router.route('/:roomId').get(authMiddleware, getRoomInfo);
router.route('/getStatus/:roomId').get(authMiddleware, getStatus);
router.route('/createGroup').post(authMiddleware, createGroup);

module.exports = router;
