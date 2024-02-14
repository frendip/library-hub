import {FC, HTMLAttributes} from 'react';
import {useAppSelector} from '../../hooks/useAppSelector';
import classes from './BooksList.module.scss';
import clsx from 'clsx';
import BookItem from '../BookItem/BookItem';

interface BooksListProps extends HTMLAttributes<HTMLDivElement> {}

const BooksList: FC<BooksListProps> = ({className}) => {
    const {books} = useAppSelector((state) => state.books);

    return (
        <div className={clsx(className, classes.booksList)}>
            <BooksTitle />
            {books.map((book) => (
                <BookItem key={book.book_id} book={book} />
            ))}
        </div>
    );
};

const BooksTitle = () => {
    return (
        <>
            <div className={classes.booksList__title}>Название</div>
            <div className={classes.booksList__title}>Автор</div>
            <div className={classes.booksList__title}>Оставшееся количество</div>
            <div></div>
        </>
    );
};

export default BooksList;
