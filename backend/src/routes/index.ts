import Router from 'express';
import readersRouter from './readersRouter.js';
import booksRouter from './booksRouter.js';

const router = Router();

router.use('/readers', readersRouter);
router.use('/books', booksRouter);

export default router;
