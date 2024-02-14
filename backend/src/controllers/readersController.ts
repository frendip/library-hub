import type {NextFunction, Response, Request} from 'express';
import ReadersConnection from '../db/readersConnection.js';
import ApiError from '../error/ApiError.js';
import {IReader, IReaderRaw} from '../types/IReader.js';

class ReadersController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const readers = await ReadersConnection.getReaders();

            res.status(200).json({readers, message: 'Readers get successfully'});
        } catch (error) {
            console.error('Error executing SELECT query,', error);

            return next(ApiError.internal('Internal Server Error'));
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = +req.params.id;
            const reader = await ReadersConnection.getReaders(id);

            if (reader === undefined) {
                return next(ApiError.badRequest('Non-existent reader id'));
            }

            res.status(200).json({reader, message: 'Reader get successfully'});
        } catch (error) {
            console.error('Error executing SELECT query,', error);

            return next(ApiError.internal('Internal Server Error'));
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const readerData: IReaderRaw = req.body;
            const newReader = await ReadersConnection.insertReader(readerData);

            res.status(200).json({reader: newReader, message: 'Reader inserted successfully'});
        } catch (error) {
            console.error('Error creating reader,', error);

            return next(ApiError.internal('Internal Server Error'));
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const newReaderData: IReader = req.body;
            const reader = await ReadersConnection.updateReader(newReaderData);

            res.status(200).json({reader, message: 'Reader updated successfully'});
        } catch (error) {
            console.error('Error updating reader,', error);

            return next(ApiError.internal('Internal Server Error'));
        }
    }

    async deleteAll(req: Request, res: Response, next: NextFunction) {
        try {
            const deleteCount = await ReadersConnection.deleteReaders();

            if (!deleteCount) {
                return next(ApiError.badRequest('Nothing to delete'));
            }

            res.status(200).json({message: 'All readers have been deleted successfully'});
        } catch (error) {
            console.error('Error deleting readers,', error);

            return next(ApiError.internal('Internal Server Error'));
        }
    }

    async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = +req.params.id;

            const deleteCount = await ReadersConnection.deleteReaders(id);

            if (!deleteCount) {
                return next(ApiError.badRequest('Nothing to delete'));
            }

            res.status(200).json({message: 'Reader was successfully deleted'});
        } catch (error) {
            console.error('Error deleting reader,', error);

            return next(ApiError.internal('Internal Server Error'));
        }
    }
}

export default new ReadersController();
