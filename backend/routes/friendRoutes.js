const express = require('express');
const authMiddleware = require('../middlewares/auth');
const {
  friendReq,
  friendAccept,
  friendDecline,
  block,
  unblock,
} = require('../controllers/friendControllers');

const router = express.Router();

router.route('/request/:id').post(authMiddleware, friendReq);
router.route('/accept/:id').post(authMiddleware, friendAccept);
router.route('/decline/:id').post(authMiddleware, friendDecline);
router.route('/block/:id').post(authMiddleware, block);
router.route('/unblock/:id').post(authMiddleware, unblock);

module.exports = router;
