import {UnknownAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {IReader} from '../../types/IReader';
import ReaderService from '../../API/ReadersService';
import {fetchBooks} from './booksSlice';

export const fetchReaders = createAsyncThunk<IReader[]>('readers/fetchReaders', async (_, {rejectWithValue}) => {
    try {
        const response = await ReaderService.getReaders();
        const data = response.readers as IReader[];
        return data;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const createReader = createAsyncThunk<IReader, IReader>(
    'readers/createReader',
    async (newReader, {rejectWithValue, dispatch}) => {
        try {
            const response = await ReaderService.createReader(newReader);
            const data = response.reader as IReader;

            dispatch(fetchBooks());

            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateReader = createAsyncThunk<IReader, IReader>(
    'readers/updateReader',
    async (updatedReader, {rejectWithValue, dispatch}) => {
        try {
            const response = await ReaderService.updateReader(updatedReader);
            const data = response.reader as IReader;

            dispatch(fetchBooks());

            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteReader = createAsyncThunk<number, number>(
    'readers/deleteReader',
    async (reader_id, {rejectWithValue, dispatch}) => {
        try {
            await ReaderService.deleteReader(reader_id);

            dispatch(fetchBooks());

            return reader_id;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface readersState {
    readers: IReader[];
    errorMessage: string;
    status: Status;
}

const initialState: readersState = {
    readers: [],
    errorMessage: '',
    status: Status.LOADING
};

const readersSlice = createSlice({
    name: 'readers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReaders.fulfilled, (state, action) => {
                state.readers = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(fetchReaders.pending, (state) => {
                state.status = Status.LOADING;
                state.readers = [];
            })

            .addCase(createReader.fulfilled, (state, action) => {
                state.readers = [...state.readers, action.payload];
                state.status = Status.SUCCESS;
            })
            .addCase(createReader.pending, (state) => {
                state.status = Status.LOADING;
            })

            .addCase(updateReader.fulfilled, (state, action) => {
                state.readers = state.readers.map((reader) =>
                    reader.reader_id === action.payload.reader_id ? action.payload : reader
                );
                state.status = Status.SUCCESS;
            })
            .addCase(updateReader.pending, (state) => {
                state.status = Status.LOADING;
            })

            .addCase(deleteReader.fulfilled, (state, action) => {
                state.readers = state.readers.filter((reader) => reader.reader_id !== action.payload);
                state.status = Status.SUCCESS;
            })
            .addCase(deleteReader.pending, (state) => {
                state.status = Status.LOADING;
            })

            .addMatcher(isError, (state, action: UnknownAction) => {
                state.status = Status.ERROR;
                state.errorMessage = action.payload as string;
                state.readers = [];
            });
    }
});

const isError = (action: UnknownAction) => {
    return action.type.endsWith('rejected');
};

export default readersSlice.reducer;
