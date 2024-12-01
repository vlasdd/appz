import { Router } from 'express';
import { getAllTasks } from '../controllers/task.controller.js';

const router = Router();

router.get('/', getAllTasks);

export default router;
