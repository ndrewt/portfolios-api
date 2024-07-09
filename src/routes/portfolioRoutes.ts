import { Router } from 'express';
import { createPortfolio, deletePortfolio, getList } from '../controllers/portfolioController';
import authMiddleware from '../middleware/authMiddleware';
import { schemaValidator } from '../helpers/validator';

const router = Router();

/**
 * @swagger
 * /portfolios/add:
 *   post:
 *     summary: Create a new portfolio.
 *     tags: [Portfolios]
 *     description: Auth is required. Use Baerer for authentication.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Portfolio created successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized - invalid token.
 *       422:
 *         description: Validation error.
 *       500:
 *         description: Server-side error.
 */
router.post('/add', schemaValidator('/portfolios/add', 'body', true), authMiddleware, createPortfolio);

/**
 * @swagger
 * /portfolios/list:
 *   get:
 *     summary: Get portfolios list.
 *     tags: [Portfolios]
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
 *     responses:
 *       200:
 *         description: Image feed fetched successfully.
 *       400:
 *         description: Bad request.
 *       422:
 *         description: Validation error.
 *       500:
 *         description: Server-side error.
 */

router.get('/list', schemaValidator('/get-list', 'query', true), getList);

/**
 * @swagger
 * /portfolios/delete/{id}:
 *   delete:
 *     summary: Delete a portfolio by ID.
 *     tags: [Portfolios]
 *     description: Auth is required. Use Baerer for authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Portfolio ID
 *     responses:
 *       200:
 *         description: Portfolio deleted successfully.
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
router.delete('/delete/:id', schemaValidator('/get-only-id', 'params', true), authMiddleware, deletePortfolio);

export default router;
