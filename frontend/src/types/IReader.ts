import { IReaderBook } from './IReaderBook.js'

export interface IReader {
	reader_id: number
	full_name: string
	books: IReaderBook[]
}
