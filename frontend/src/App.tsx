import {useEffect} from 'react';
import AppRouter from './components/AppRouter/AppRouter';
import {useAppDispatch} from './hooks/useAppDispatch';
import './styles/styles.module.scss';
import {BrowserRouter} from 'react-router-dom';
import {fetchReaders} from './store/slices/readersSlice';

const App = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchReaders());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
};

export default App;
