const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware'); 
const chatController = require('../controllers/chat.controller');



const router = express.Router();

// post/api/chat/
router.post('/',authMiddleware.authUser,chatController.createChat);

// get/api/chat/
router.get('/',authMiddleware.authUser,chatController.getChats);

// get/api/chat/messages/:id
router.get('/messages/:id',authMiddleware.authUser,chatController.getMessages);


module.exports = router;