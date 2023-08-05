import { Router } from 'express';
import signupController from '../controller/auth.users';

const router = Router();

// Create a new user registration
router.post('/signup', signupController);

// Export the router instance
export default router;