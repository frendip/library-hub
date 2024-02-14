import {IReaderBook} from './IReaderBook.js';

export interface IReader {
    reader_id: number;
    full_name: string;
    books: IReaderBook[];
}

export interface IReaderCheckboxBooks extends Omit<IReader, 'books'> {
    books: Record<number, boolean>[];
}
