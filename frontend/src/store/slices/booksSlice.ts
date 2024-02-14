import {UnknownAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {IBook} from '../../types/IBook';
import BooksService from '../../API/BooksService';

export const fetchBooks = createAsyncThunk<IBook[]>('books/fetchBooks', async (_, {rejectWithValue}) => {
    try {
        const response = await BooksService.getBooks();
        const data = response.books as IBook[];
        return data;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const createBook = createAsyncThunk<IBook, IBook>('books/createBook', async (newBook, {rejectWithValue}) => {
    try {
        const response = await BooksService.createBook(newBook);
        const data = response.book as IBook;
        return data;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const updateBook = createAsyncThunk<IBook, IBook>('books/updateBook', async (updatedBook, {rejectWithValue}) => {
    try {
        const response = await BooksService.updateBook(updatedBook);
        const data = response.book as IBook;
        return data;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const deleteBook = createAsyncThunk<number, number>('books/deleteBook', async (book_id, {rejectWithValue}) => {
    try {
        await BooksService.deleteBook(book_id);
        return book_id;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface booksState {
    books: IBook[];
    errorMessage: string;
    status: Status;
}

const initialState: booksState = {
    books: [],
    errorMessage: '',
    status: Status.LOADING
};

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.books = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(fetchBooks.pending, (state) => {
                state.status = Status.LOADING;
                state.books = [];
            })

            .addCase(createBook.fulfilled, (state, action) => {
                state.books = [...state.books, action.payload];
                state.status = Status.SUCCESS;
            })
            .addCase(createBook.pending, (state) => {
                state.status = Status.LOADING;
            })

            .addCase(updateBook.fulfilled, (state, action) => {
                state.books = state.books.map((book) =>
                    book.book_id === action.payload.book_id ? action.payload : book
                );
                state.status = Status.SUCCESS;
            })
            .addCase(updateBook.pending, (state) => {
                state.status = Status.LOADING;
            })

            .addCase(deleteBook.fulfilled, (state, action) => {
                state.books = state.books.filter((book) => book.book_id !== action.payload);
                state.status = Status.SUCCESS;
            })
            .addCase(deleteBook.pending, (state) => {
                state.status = Status.LOADING;
            })

            .addMatcher(isError, (state, action: UnknownAction) => {
                state.status = Status.ERROR;
                state.errorMessage = action.payload as string;
                state.books = [];
            });
    }
});

const isError = (action: UnknownAction) => {
    return action.type.endsWith('rejected');
};

export default booksSlice.reducer;
