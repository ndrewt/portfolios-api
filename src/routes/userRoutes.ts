import { Router } from 'express';
import { signup, login, deleteUser, getUserDetails } from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';
import { schemaValidator } from '../helpers/validator';

const router = Router();

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user.
 *     tags: [Users]
 *     description: Password must contain at least 6 characters
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Bad request.
 *       409:
 *         description: User already exists by email or username
 *       422:
 *         description: Validation error.
 *       500:
 *         description: Server-side error.
 */
router.post('/signup', schemaValidator('/signup', 'body', true), signup);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user.
 *     tags: [Users]
 *     description: Password must contain at least 6 characters
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized - invalid credentials.
 *       422:
 *         description: Validation error.
 *       500:
 *         description: Server-side error.
 */
router.post('/login', schemaValidator('/login', 'body', true), login);

/**
 * @swagger
 * /get-user-details:
 *   get:
 *     summary: Gets user details by userId.
 *     tags: [Users]
 *     description: Auth is required. Use Baerer for authentication.
 *     parameters:
 *        - in: query
 *          name: userId
 *          required: true
 *          description: userId is required.
 *     responses:
 *       200:
 *         description: Success.
 *       401:
 *         description: Unauthorized - invalid token.
 *       404:
 *         description: User not found or unauthorized.
 *       500:
 *         description: Server-side error.
 */
router.get('/get-user-details', schemaValidator('/get-user-details', 'query', true), authMiddleware, getUserDetails);
/**
 * @swagger
 * /delete-user:
 *   delete:
 *     summary: Delete user profile.
 *     description: Auth is required. Use Baerer for authentication.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile deleted successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized - invalid token.
 *       404:
 *         description: User not found or unauthorized.
 *       422:
 *         description: Validation error.
 *       500:
 *         description: Server-side error.
 */

router.delete('/delete-user', authMiddleware, deleteUser);

export default router;
