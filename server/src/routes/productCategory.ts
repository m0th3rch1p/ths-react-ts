import express from 'express';

import ProductCategory from '../controllers/productCategory';

const router = express.Router();
router.get('/', ProductCategory.fetchAll);
router.post('/', ProductCategory.store);
router.put('/:id', ProductCategory.updateData);
router.delete('/:id', ProductCategory.destroy);
export default router;