import {IReader, IReaderRaw} from '../types/IReader.js';
import dbPool from './config.js';
import {IReaderBook} from '../types/IReaderBook.js';
import BooksConnection from './booksConnection.js';

export default class ReadersConnection {
    static async getReaders(id?: number): Promise<IReader | IReader[]> {
        const client = await dbPool.connect();

        try {
            if (id === undefined) {
                const query = 'SELECT * FROM readers';
                const result = await client.query(query);
                const readers = result.rows as IReader[];

                for (const reader of readers) {
                    const books = await this.getReaderBooks(reader.reader_id);
                    reader.books = books;
                }

                return readers;
            } else {
                const query = `SELECT * FROM readers WHERE reader_id=${id}`;
                const result = await client.query(query);
                const reader = result.rows[0] as IReader;
                const books = await this.getReaderBooks(id);
                reader.books = books;

                return reader;
            }
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }

    static async insertReader(reader: IReaderRaw): Promise<IReader> {
        const client = await dbPool.connect();

        try {
            await client.query('BEGIN');

            const query = `INSERT INTO readers (full_name)
                VALUES ('${reader.full_name}')
                RETURNING reader_id;`;

            const result = await client.query(query);
            const reader_id = result.rows[0]['reader_id'];
            const newReader = {...reader, reader_id} as IReader;

            await client.query('COMMIT');

            console.log(reader.books);
            if (reader.books) {
                for (const book of reader.books) {
                    this.insertReaderBook(reader_id, book.book_id);
                }
            }

            return newReader;
        } catch (error) {
            await client.query('ROLLBACK');

            throw error;
        } finally {
            client.release();
        }
    }

    static async updateReader(newReaderData: IReader): Promise<IReader> {
        const client = await dbPool.connect();
        try {
            await client.query('BEGIN');

            const query = `
            UPDATE readers
            SET full_name='${newReaderData.full_name}'
            WHERE reader_id=${newReaderData.reader_id}`;
            await client.query(query);

            await this.deleteReaderBooks(newReaderData.reader_id);
            if (newReaderData.books) {
                for (const book of newReaderData.books) {
                    this.insertReaderBook(newReaderData.reader_id, book.book_id);
                }
            }

            await client.query('COMMIT');

            return newReaderData;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    static async deleteReaders(id?: number): Promise<number> {
        const client = await dbPool.connect();

        try {
            await client.query('BEGIN');

            let deletedReaders = await this.getReaders(id);
            if (!Array.isArray(deletedReaders)) {
                deletedReaders = [deletedReaders];
            }

            for (const deletedReader of deletedReaders) {
                await this.deleteReaderBooks(deletedReader.reader_id);
            }

            const query = id === undefined ? 'DELETE FROM readers' : `DELETE FROM readers WHERE reader_id=${id}`;
            const deleteCount = (await client.query(query)).rowCount;

            await client.query('COMMIT');

            return deleteCount;
        } catch (error) {
            await client.query('ROLLBACK');

            throw error;
        } finally {
            client.release();
        }
    }

    static async getReaderBooks(id: number): Promise<IReaderBook[]> {
        const client = await dbPool.connect();

        try {
            const query = `SELECT books.book_id, books.title, books.author_name
                FROM readers
                JOIN issued_books ON readers.reader_id = issued_books.reader_id
                JOIN books ON issued_books.book_id = books.book_id
                WHERE readers.reader_id = ${id};`;

            const result = await client.query(query);

            return result.rows;
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }

    static async insertReaderBook(reader_id: number, book_id: number): Promise<void> {
        const client = await dbPool.connect();

        try {
            await client.query('BEGIN');

            const query = `INSERT INTO issued_books (reader_id, book_id)
            VALUES (${reader_id}, ${book_id});`;
            await client.query(query);

            await BooksConnection.updateBookQuantity(book_id, false);

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    static async deleteReaderBooks(reader_id: number, book_id?: number): Promise<void> {
        const client = await dbPool.connect();

        try {
            await client.query('BEGIN');

            const oldReaderBooks = book_id ? [{book_id}] : await this.getReaderBooks(reader_id);
            for (const book of oldReaderBooks) {
                await BooksConnection.updateBookQuantity(book.book_id, true);
            }

            const query =
                book_id === undefined
                    ? `DELETE FROM issued_books
            WHERE reader_id = ${reader_id};`
                    : `DELETE FROM issued_books
            WHERE reader_id = ${reader_id} AND book_id = ${book_id};`;
            await client.query(query);

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }
}
