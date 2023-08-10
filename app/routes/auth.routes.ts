import { Router } from 'express';
import authController from '../controller/auth.users';
import validateUser from '../middleware/auth.guard';

const router = Router();


// Create a new user registration
router.post('/signup', authController.signupController);

//login User
router.post('/login', authController.loginController);

console.log("middleware",validateUser);

//delete account
router.delete("/delete",validateUser,authController.deactivateController)

// Export the router instance
export default router;