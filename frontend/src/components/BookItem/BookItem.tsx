import {FC, useState} from 'react';
import classes from './BookItem.module.scss';
import {clsx} from 'clsx';
import Popup from '../Popup/Popup';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import deleteIcon from '../../assets/img/deleteIcon.svg';
import editIcon from '../../assets/img/editIcon.svg';
import {SubmitHandler} from 'react-hook-form';
import {deleteBook, updateBook} from '../../store/slices/booksSlice';
import {IBook} from '../../types/IBook';
import BooksForm from '../UI/Form/BooksForm';

interface BookItemProps {
    book: IBook;
}

const BookItem: FC<BookItemProps> = ({book}) => {
    const dispatch = useAppDispatch();
    const [popupActive, setPopupActive] = useState(false);

    const updateBookHandler: SubmitHandler<IBook> = (updatedBook) => {
        dispatch(updateBook(updatedBook));
    };

    const deleteBookHandler = () => {
        if (window.confirm('Вы действительно хотите удалить книгу?')) {
            dispatch(deleteBook(book.book_id));
        }
    };

    return (
        <>
            <div className={clsx(classes.bookItem, classes.bookName)}>{book.title}</div>
            <div className={clsx(classes.bookItem)}>{book.author_name}</div>
            <div className={clsx(classes.bookItem)}>{book.quantity}</div>
            <div className={clsx(classes.bookItem, classes.modify)}>
                <div className={classes.modify__icon} onClick={() => setPopupActive(true)}>
                    <img src={editIcon} alt="edit" />
                </div>
                <div className={classes.modify__icon} onClick={deleteBookHandler}>
                    <img src={deleteIcon} alt="delete" />
                </div>
            </div>
            <Popup popupActive={popupActive} setPopupActive={setPopupActive}>
                <BooksForm setPopupActive={setPopupActive} onSubmitHandler={updateBookHandler} book={book} />
            </Popup>
        </>
    );
};

export default BookItem;
