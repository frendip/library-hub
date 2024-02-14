import {useEffect} from 'react';
import AppRouter from './components/AppRouter/AppRouter';
import {useAppDispatch} from './hooks/useAppDispatch';
import './styles/styles.module.scss';
import {BrowserRouter} from 'react-router-dom';
import {fetchReaders} from './store/slices/readersSlice';
import {fetchBooks} from './store/slices/booksSlice';

const App = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchReaders());
        dispatch(fetchBooks());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
};

export default App;
