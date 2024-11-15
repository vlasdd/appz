import { Router } from 'express';
import { 
  getAreaType,
  getTrafficDensity,
} from '../controllers/deliveryReport.controller.js';

const router = Router();

router.get('/traffic-density', getTrafficDensity);
router.get('/area-type', getAreaType);

export default router;
