import { Router } from 'express';
import { uploadImage, deleteImage, getImageLocal } from '../controllers/imageController';
import authMiddleware from '../middleware/authMiddleware';
import multer from 'multer';
import { schemaValidator } from '../helpers/validator';

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
});

const router = Router();

/**
 * @swagger
 * /images/add:
 *   post:
 *     summary: Upload an image to a portfolio.
 *     description: Auth is required. Use Baerer for authentication.
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               portfolioId:
 *                 type: number
 *             required:
 *               - image
 *               - portfolioId
 *               - name
 *     responses:
 *       201:
 *         description: Image uploaded successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized - invalid token.
 *       404:
 *         description: Portfolio not found or unauthorized.
 *       422:
 *         description: Validation error.
 *       500:
 *         description: Server-side error.
 */
router.post('/add', upload.single('image'), schemaValidator('/images/add', 'body', true, true), authMiddleware, uploadImage);

/**
 * @swagger
 * /images/{filename}:
 *   get:
 *     summary: Gets image by filename.
 *     tags: [Images]
 *     description: Gets image by filename. Auth is required. Use Baerer for authentication.
 *     parameters:
 *        - in: path
 *          name: filename
 *          required: true
 *          description: filename is required.
 *     responses:
 *       200:
 *         description: Success.
 *       404:
 *         description: Not found.
 *       422:
 *         description: Validation error.
 *       500:
 *         description: Server-side error.
 */

// return images from local
router.get('/:filename', getImageLocal);

/**
 * @swagger
 * /images/delete/{id}:
 *   delete:
 *     summary: Delete an image by ID.
 *     description: Auth is required. Use Baerer for authentication.
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Image ID
 *     responses:
 *       200:
 *         description: Image deleted successfully.
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
router.delete('/delete/:id', schemaValidator('/get-only-id', 'params', true), authMiddleware, deleteImage);

export default router;
