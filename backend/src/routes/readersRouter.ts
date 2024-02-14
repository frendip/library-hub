import Router from 'express';
import readerController from '../controllers/readersController.js';

const router = Router();

router.get('/', readerController.getAll);
router.get('/:id', readerController.getById);
router.post('/', readerController.create);
router.put('/', readerController.update);
router.delete('/', readerController.deleteAll);
router.delete('/:id', readerController.deleteById);

export default router;
