import {IBook, IBookRaw} from '../types/IBook.js';
import dbPool from './config.js';

export default class BooksConnection {
    static async getBooks(id?: number): Promise<IBook | IBook[]> {
        const client = await dbPool.connect();

        try {
            if (id === undefined) {
                const query = 'SELECT * FROM books';
                const result = await client.query(query);

                return result.rows;
            } else {
                const query = `SELECT * FROM books WHERE book_id=${id}`;
                const result = await client.query(query);

                return result.rows[0];
            }
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }

    static async insertBook(book: IBookRaw): Promise<IBook> {
        const client = await dbPool.connect();

        try {
            await client.query('BEGIN');

            const query = `
            INSERT INTO books (author_name, title, quantity)
            VALUES('${book.author_name}', '${book.title}', '${book.quantity}')
            RETURNING book_id`;

            const result = await client.query(query);
            const book_id = result.rows[0]['book_id'];
            const newBook = {...book, book_id} as IBook;

            await client.query('COMMIT');

            return newBook;
        } catch (error) {
            await client.query('ROLLBACK');

            throw error;
        } finally {
            client.release();
        }
    }

    static async updateBook(newBookData: IBook): Promise<IBook> {
        const client = await dbPool.connect();
        try {
            await client.query('BEGIN');

            const query = `
            UPDATE books
            SET author_name='${newBookData.author_name}', title='${newBookData.title}', quantity='${newBookData.quantity}'
            WHERE book_id=${newBookData.book_id}`;
            await client.query(query);

            await client.query('COMMIT');

            return newBookData;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    static async deleteBooks(id?: number): Promise<number> {
        const client = await dbPool.connect();

        try {
            await client.query('BEGIN');

            const query = id === undefined ? 'DELETE FROM books' : `DELETE FROM books WHERE book_id=${id}`;
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

    static async updateBookQuantity(book_id: number, plus: boolean): Promise<void> {
        const client = await dbPool.connect();

        try {
            await client.query('BEGIN');

            const query = `UPDATE books
            SET quantity=quantity${plus ? '+' : '-'}1
            WHERE book_id=${book_id};`;
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
