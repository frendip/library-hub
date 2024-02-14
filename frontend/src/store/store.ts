import {configureStore} from '@reduxjs/toolkit';
import readersSlice from './slices/readersSlice';
import booksSlice from './slices/booksSlice';

const store = configureStore({
    reducer: {
        readers: readersSlice,
        books: booksSlice
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
