import Router from 'express';
import booksController from '../controllers/booksController.js';

const router = Router();

router.get('/', booksController.getAll);
router.get('/:id', booksController.getById);
router.post('/', booksController.create);
router.put('/', booksController.update);
router.delete('/', booksController.deleteAll);
router.delete('/:id', booksController.deleteById);

export default router;
