import React, {useState} from 'react';
import {SubmitHandler} from 'react-hook-form';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import ReadersList from '../../components/ReadersList/ReadersList';
import classes from '../pages.module.scss';
import {CommonButton} from '../../components/UI/Button/Button';
import Popup from '../../components/Popup/Popup';
import {IReader} from '../../types/IReader';
import {createReader, setMaxCountBooks} from '../../store/slices/readersSlice';
import ReadersForm from '../../components/UI/Form/ReadersForm';
import MaxCountBooksForm from '../../components/UI/Form/MaxCountBooksForm';
import Loading from '../../components/Loading/Loading';

const Readers = () => {
    const dispatch = useAppDispatch();
    const [popupActive, setPopupActive] = useState(false);

    const {maxCountBooks, status, errorMessage} = useAppSelector((state) => state.readers);

    const addReaderHandler: SubmitHandler<IReader> = (newReader) => {
        dispatch(createReader(newReader));
    };

    const setMaxCountBooksHandler: SubmitHandler<{maxCountBooks: number}> = (data) => {
        alert('Количество книг, которые читатель может взять одновременно обновлено');
        dispatch(setMaxCountBooks(+data.maxCountBooks));
    };

    if (status === 'error') {
        return (
            <div className={classes.pages}>
                <div className={classes.pages__title}>Читатели</div>
                <div className={classes.error}>
                    <h2 className={classes.error__title}>Произошла ошибка.</h2>
                    <div className={classes.error__description}>
                        K сожалению, не удалось получить список читателей. {errorMessage}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={classes.pages}>
            <div className={classes.pages__title}>Читатели</div>
            <div className={classes.pages__section}>
                <CommonButton size="medium" onClick={() => setPopupActive(true)}>
                    Добавить нового читателя
                </CommonButton>
                <MaxCountBooksForm onSubmitHandler={setMaxCountBooksHandler} maxCountBooks={maxCountBooks} />
            </div>
            <Popup popupActive={popupActive} setPopupActive={setPopupActive}>
                <ReadersForm setPopupActive={setPopupActive} onSubmitHandler={addReaderHandler} />
            </Popup>
            {status === 'loading' ? <Loading /> : <ReadersList />}
        </div>
    );
};

export default Readers;
