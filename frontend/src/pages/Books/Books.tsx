import React, {useState} from 'react';
import {SubmitHandler} from 'react-hook-form';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import classes from '../pages.module.scss';
import {CommonButton} from '../../components/UI/Button/Button';
import Popup from '../../components/Popup/Popup';
import {IBook} from '../../types/IBook';
import {createBook} from '../../store/slices/booksSlice';
import BooksList from '../../components/BooksList/BooksList';
import BooksForm from '../../components/UI/Form/BooksForm';
import Loading from '../../components/Loading/Loading';

const Books = () => {
    const dispatch = useAppDispatch();
    const [popupActive, setPopupActive] = useState(false);

    const {status, errorMessage} = useAppSelector((state) => state.books);

    const addBookHandler: SubmitHandler<IBook> = (newBook) => {
        dispatch(createBook(newBook));
    };

    if (status === 'error') {
        return (
            <div className={classes.pages}>
                <div className={classes.pages__title}>Книги</div>
                <div className={classes.error}>
                    <h2 className={classes.error__title}>Произошла ошибка.</h2>
                    <div className={classes.error__description}>
                        K сожалению, не удалось получить список книг. {errorMessage}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={classes.pages}>
            <div className={classes.pages__title}>Книги</div>
            <CommonButton className={classes.pages__addBtn} size="medium" onClick={() => setPopupActive(true)}>
                Добавить новую книгу
            </CommonButton>
            <Popup popupActive={popupActive} setPopupActive={setPopupActive}>
                <BooksForm setPopupActive={setPopupActive} onSubmitHandler={addBookHandler} />
            </Popup>
            {status === 'loading' ? <Loading /> : <BooksList />}
        </div>
    );
};

export default Books;
