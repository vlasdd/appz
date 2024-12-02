import { Router } from 'express';
import { getAllTasks, getTaskById, getTaskStatistics } from '../controllers/task.controller.js';

const router = Router();

router.get('/:id/statistics', getTaskStatistics);
router.get('/:id', getTaskById);
router.get('/', getAllTasks);

export default router;
