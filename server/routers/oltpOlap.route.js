import { Router } from 'express';
import { 
  generateOlapCube, 
  runEtl, 
  uploadOltpFromDatasets,
} from '../controllers/oltpOlap.controller.js';

const router = Router();

router.post('/upload-oltp', uploadOltpFromDatasets);
router.post('/run-etl', runEtl);
router.post('/generate-cube', generateOlapCube);

export default router;
