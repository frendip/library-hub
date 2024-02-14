import {IReaderBook} from './IReaderBook.js';

export interface IReaderRaw {
    full_name: string;
    books: IReaderBook[];
}

export interface IReader extends IReaderRaw {
    reader_id: number;
}
