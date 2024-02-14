import React, {useState} from 'react';
import {SubmitHandler} from 'react-hook-form';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import ReadersList from '../../components/ReadersList/ReadersList';
import classes from '../pages.module.scss';
import {CommonButton} from '../../components/UI/Button/Button';
import Popup from '../../components/Popup/Popup';
import {IReader} from '../../types/IReader';
import {createReader} from '../../store/slices/readersSlice';
import ReadersForm from '../../components/UI/Form/ReadersForm';

const Readers = () => {
    const dispatch = useAppDispatch();
    const [popupActive, setPopupActive] = useState(false);

    const {status, errorMessage} = useAppSelector((state) => state.readers);

    const addReaderHandler: SubmitHandler<IReader> = (newReader) => {
        dispatch(createReader(newReader));
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
            <CommonButton className={classes.pages__addBtn} size="medium" onClick={() => setPopupActive(true)}>
                Добавить нового читателя
            </CommonButton>
            <Popup popupActive={popupActive} setPopupActive={setPopupActive}>
                <ReadersForm setPopupActive={setPopupActive} onSubmitHandler={addReaderHandler} />
            </Popup>
            {status === 'loading' ? <div>Loading</div> : <ReadersList />}
        </div>
    );
};

export default Readers;
