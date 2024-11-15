import { Router } from 'express';
import { 
  createCustomerOrder, 
  deleteCustomerOrder, 
  getCustomerOrderInfo, 
  getCustomerOrderInfoById, 
  getCustomers, 
  getStatus, 
  getTypeOfOrder,
  updateCustomerOrder, 
} from '../controllers/customerOrder.controller.js';

const router = Router();

router.get('/', getCustomerOrderInfo);
router.get('/customers', getCustomers);
router.get('/type-of-order', getTypeOfOrder);
router.get('/status', getStatus);
router.get('/:id', getCustomerOrderInfoById);

router.post('/', createCustomerOrder)

router.patch('/:id', updateCustomerOrder)

router.delete('/:id', deleteCustomerOrder)

export default router;
