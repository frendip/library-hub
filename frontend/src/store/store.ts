import {configureStore} from '@reduxjs/toolkit';
import readersSlice from './slices/readersSlice';

const store = configureStore({
    reducer: {
        readers: readersSlice
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
