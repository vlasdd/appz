import { Router } from 'express';
import { 
  getVehicleType, 
  createDeliveryOrder, 
  getDeliveryPerson, 
  getDeliveryOrderInfo,
  getDeliveryOrderInfoById,
  updateDeliveryOrder,
  deleteDeliveryOrder,
} from '../controllers/deliveryOrder.controller.js';

const router = Router();

router.get('/', getDeliveryOrderInfo);
router.get('/vehicle-type', getVehicleType);
router.get('/delivery-person', getDeliveryPerson);
router.get('/:id', getDeliveryOrderInfoById);

router.post('/', createDeliveryOrder);

router.patch('/:id', updateDeliveryOrder);

router.delete('/:id', deleteDeliveryOrder)

export default router;
