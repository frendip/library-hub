import {FC, useState} from 'react';
import {IReader} from '../../types/IReader';
import classes from './ReaderItem.module.scss';
import {clsx} from 'clsx';
import {SubmitHandler} from 'react-hook-form';
import Popup from '../Popup/Popup';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {deleteReader, updateReader} from '../../store/slices/readersSlice';
import deleteIcon from '../../assets/img/deleteIcon.svg';
import editIcon from '../../assets/img/editIcon.svg';
import ReadersForm from '../UI/Form/ReadersForm';

interface ReaderItemProps {
    reader: IReader;
}

const ReaderItem: FC<ReaderItemProps> = ({reader}) => {
    const dispatch = useAppDispatch();
    const [popupActive, setPopupActive] = useState(false);

    const updateReaderHandler: SubmitHandler<IReader> = (updatedReader) => {
        dispatch(updateReader(updatedReader));
    };

    const deleteReaderHandler = () => {
        if (window.confirm('Вы действительно хотите удалить читателя?')) {
            dispatch(deleteReader(reader.reader_id));
        }
    };

    return (
        <>
            <div className={clsx(classes.readerItem, classes.fullName)}>{reader.full_name}</div>
            <div className={clsx(classes.readerItem, classes.books)}>
                {reader.books.map((book) => (
                    <div key={book.book_id} className={classes.bookItem}>
                        <div className={classes.bookItem__name}>{`"${book.title}"`}</div> -
                        <div className={classes.bookItem__author}>{book.author_name}</div>
                    </div>
                ))}
            </div>
            <div className={clsx(classes.readerItem, classes.modify)}>
                <div className={classes.modify__icon} onClick={() => setPopupActive(true)}>
                    <img src={editIcon} alt="edit" />
                </div>
                <div className={classes.modify__icon} onClick={deleteReaderHandler}>
                    <img src={deleteIcon} alt="delete" />
                </div>
            </div>
            <Popup popupActive={popupActive} setPopupActive={setPopupActive}>
                <ReadersForm setPopupActive={setPopupActive} onSubmitHandler={updateReaderHandler} reader={reader} />
            </Popup>
        </>
    );
};

export default ReaderItem;
