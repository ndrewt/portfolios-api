import { Router } from 'express';
import { getFeed } from '../controllers/feedController';
import { schemaValidator } from '../helpers/validator';

const router = Router();

/**
 * @swagger
 * /feed:
 *   get:
 *     summary: Get image feed.
 *     tags: [Images Feed]
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

router.get('/feed', schemaValidator('/get-list', 'query', true), getFeed);

export default router;
