import express from 'express';
import {
    authUser,
    registerUser,
    logoutUser,
    updateUserProfile,
    getUserProfile,
    getUser,
    deleteByIdUser,
} from '../controllers/userController.js';
import { userControlAuth } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/register', upload.single('photo'), registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.get('/', getUser);
router.delete('/:id', deleteByIdUser);
router
    .route('/profile')
    .get(userControlAuth, getUserProfile)
    .put(userControlAuth, upload.single('photo'), updateUserProfile);

export default router;
