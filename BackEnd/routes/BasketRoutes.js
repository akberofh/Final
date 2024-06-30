const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware.js');
const { addToBasket, removeFromBasket, getBasket ,basketPost} = require('../controllers/BasketController.js');

router.post('/post', auth, basketPost);
router.delete('/delete', auth, removeFromBasket);
router.get('/get', auth, getBasket);

module.exports = router;