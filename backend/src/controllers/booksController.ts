import type {NextFunction, Response, Request} from 'express';
import BooksConnection from '../db/booksConnection.js';
import ApiError from '../error/ApiError.js';
import {IBook, IBookRaw} from '../types/IBook.js';

class BooksController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const books = await BooksConnection.getBooks();

            res.status(200).json({books, message: 'Books get successfully'});
        } catch (error) {
            console.error('Error executing SELECT query,', error);

            return next(ApiError.internal('Internal Server Error'));
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = +req.params.id;
            const book = await BooksConnection.getBooks(id);

            if (book === undefined) {
                return next(ApiError.badRequest('Non-existent book id'));
            }

            res.status(200).json({book, message: 'Book get successfully'});
        } catch (error) {
            console.error('Error executing SELECT query,', error);

            return next(ApiError.internal('Internal Server Error'));
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const bookData: IBookRaw = req.body;
            const newBook = await BooksConnection.insertBook(bookData);

            res.status(200).json({book: newBook, message: 'Book inserted successfully'});
        } catch (error) {
            console.error('Error creating book,', error);

            return next(ApiError.internal('Internal Server Error'));
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const newBookData: IBook = req.body;
            const book = await BooksConnection.updateBook(newBookData);

            res.status(200).json({book, message: 'Book updated successfully'});
        } catch (error) {
            console.error('Error updating book,', error);

            return next(ApiError.internal('Internal Server Error'));
        }
    }

    async deleteAll(req: Request, res: Response, next: NextFunction) {
        try {
            const deleteCount = await BooksConnection.deleteBooks();

            if (!deleteCount) {
                return next(ApiError.badRequest('Nothing to delete'));
            }

            res.status(200).json({message: 'All books have been deleted successfully'});
        } catch (error) {
            console.error('Error deleting books,', error);

            return next(ApiError.internal('Internal Server Error'));
        }
    }

    async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = +req.params.id;

            const deleteCount = await BooksConnection.deleteBooks(id);

            if (!deleteCount) {
                return next(ApiError.badRequest('Nothing to delete'));
            }

            res.status(200).json({message: 'Book was successfully deleted'});
        } catch (error) {
            console.error('Error deleting books,', error);

            return next(ApiError.internal('Internal Server Error'));
        }
    }
}

export default new BooksController();
