import {urlPath} from './backendUrl';
import {IBook} from '../types/IBook';

export default class BooksService {
    private static _url = urlPath + 'books/';
    static async getBooks() {
        const response = await fetch(this._url);

        if (!response.ok) {
            throw new Error(`Error fetching books: ${response.statusText}`);
        }

        return await response.json();
    }

    static async createBook(newBook: IBook) {
        const response = await fetch(this._url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        });

        if (!response.ok) {
            throw new Error(`Error creating book: ${response.statusText}`);
        }

        return await response.json();
    }

    static async updateBook(updatedBook: IBook) {
        const response = await fetch(this._url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBook)
        });

        if (!response.ok) {
            throw new Error(`Error updating book: ${response.statusText}`);
        }

        return await response.json();
    }

    static async deleteBook(book_id: number) {
        const response = await fetch(this._url + book_id, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Error deleting book: ${response.statusText}`);
        }

        return await response.json();
    }
}
