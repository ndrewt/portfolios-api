import { Router } from 'express';
import { addComment, deleteComment, getList } from '../controllers/commentController';
import authMiddleware from '../middleware/authMiddleware';
import { schemaValidator } from '../helpers/validator';

const router = Router();

/**
 * @swagger
 * /comments/add:
 *   post:
 *     summary: Add a comment to an image.
 *     description: Auth is required. Use Baerer for authentication.
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               imageId:
 *                 type: number
 *             required:
 *               - content
 *               - imageId
 *     responses:
 *       201:
 *         description: Comment added successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized - invalid token.
 *       404:
 *         description: Image not found or unauthorized.
 *       422:
 *         description: Validation error.
 *       500:
 *         description: Server-side error.
 */

router.post('/add', schemaValidator('/comments/add', 'body', true), authMiddleware, addComment);

/**
 * @swagger
 * /comments/list:
 *   get:
 *     summary: Get image feed.
 *     tags: [Comments]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: per_page
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: imageId
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comments fetched successfully.
 *       400:
 *         description: Bad request.
 *       422:
 *         description: Validation error.
 *       500:
 *         description: Server-side error.
 */

router.get('/list', schemaValidator('/comments/list', 'query', true), getList);

/**
 * @swagger
 * /comments/delete/{id}:
 *   delete:
 *     summary: Delete a comment by ID.
 *     description: Auth is required. Use Baerer for authentication.
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized - invalid token.
 *       404:
 *         description: Comment not found or unauthorized.
 *       422:
 *         description: Validation error.
 *       500:
 *         description: Server-side error.
 */
router.delete('/delete/:id', schemaValidator('/get-only-id', 'params', true), authMiddleware, deleteComment);

export default router;
