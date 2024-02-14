import {urlPath} from './backendUrl';
import {IReader} from '../types/IReader';

export default class ReadersService {
    private static _url = urlPath + 'readers/';
    static async getReaders() {
        const response = await fetch(this._url);

        if (!response.ok) {
            throw new Error(`Error fetching readers: ${response.statusText}`);
        }

        return await response.json();
    }

    static async createReader(newReader: IReader) {
        const response = await fetch(this._url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newReader)
        });

        if (!response.ok) {
            throw new Error(`Error creating reader: ${response.statusText}`);
        }

        return await response.json();
    }

    static async updateReader(updatedReader: IReader) {
        const response = await fetch(this._url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedReader)
        });

        if (!response.ok) {
            throw new Error(`Error updating reader: ${response.statusText}`);
        }

        return await response.json();
    }

    static async deleteReader(reader_id: number) {
        const response = await fetch(this._url + reader_id, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Error deleting reader: ${response.statusText}`);
        }

        return await response.json();
    }
}
