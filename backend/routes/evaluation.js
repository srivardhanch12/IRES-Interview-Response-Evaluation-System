import express from 'express';
import { evaluateCandidate } from '../controllers/evaluationController.js';

const router = express.Router();

router.post('/', evaluateCandidate);

export default router;
