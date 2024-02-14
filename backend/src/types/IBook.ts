export interface IBookRaw {
    author_name: string,
    title: string,
    quantity: number
}

export interface IBook extends IBookRaw {
    book_id: number
}