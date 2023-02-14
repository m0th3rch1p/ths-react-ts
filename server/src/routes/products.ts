import express from 'express';
import multer from 'multer';
import ProductController from '../controllers/product';

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();

router.get('/', ProductController.fetchAll);
router.get('/data', ProductController.fetchData);
router.post('/', upload.single('product_image'), ProductController.store);
router.put('/:id', ProductController.updateData);
router.delete('/:id', ProductController.destroy);

export default router;