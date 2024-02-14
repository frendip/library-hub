import React, {FC, Dispatch, SetStateAction, useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import classes from './Form.module.scss';
import {IReader, IReaderCheckboxBooks} from '../../../types/IReader';
import {useAppSelector} from '../../../hooks/useAppSelector';
import clsx from 'clsx';
import {CommonButton} from '../Button/Button';

interface ReadersFormProps {
    setPopupActive: Dispatch<SetStateAction<boolean>>;
    onSubmitHandler: SubmitHandler<IReader>;
    reader?: IReader;
}

const ReadersForm: FC<ReadersFormProps> = ({setPopupActive, onSubmitHandler, reader}) => {
    const defaultValues = reader
        ? {
              reader_id: reader.reader_id,
              full_name: reader.full_name
          }
        : {};

    const {
        register,
        formState: {errors},
        handleSubmit,
        setValue,
        watch
    } = useForm<IReaderCheckboxBooks>({
        mode: 'onChange',
        defaultValues
    });

    const checkedBooks = watch('books');
    const {books} = useAppSelector((state) => state.books);
    const {maxCountBooks} = useAppSelector((state) => state.readers);
    const [availableBooks] = useState(
        books.filter(
            (book) => book.quantity > 0 || reader?.books.some((readerBook) => readerBook.book_id === book.book_id)
        )
    );

    useEffect(() => {
        if (reader) {
            reader.books.forEach((book) => {
                setValue(`books.${book.book_id}`, {[book.book_id]: true});
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const validateCheckedBooks = () => {
        const count = checkedBooks
            ? checkedBooks.reduce((count, checkboxBook) => {
                  if (checkboxBook) {
                      return count + 1;
                  } else {
                      return count;
                  }
              }, 0)
            : 0;

        if (count > maxCountBooks) {
            return `Читатель не может взять столько книг одновременно. Лимит: ${maxCountBooks} книг`;
        }

        return true;
    };

    const onSubmit = (data: IReaderCheckboxBooks) => {
        const checkedBooks = books.filter((book) => data.books[book.book_id]);
        const result = {...data, books: checkedBooks} as IReader;
        setPopupActive(false);
        onSubmitHandler(result);
    };

    return (
        <div className={classes.card}>
            <h2 className={classes.card__title}>
                {reader ? 'Редактирование информации о читателе' : 'Добавление читателя'}
            </h2>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.form__section}>
                    <div className={classes.form__sectionTitle}>ФИО</div>
                    <input
                        className={classes.form__input}
                        {...register('full_name', {
                            required: 'Введите ФИО сотрудника.',
                            minLength: {
                                value: 5,
                                message: 'ФИО должны содержать минимум 5 символов'
                            }
                        })}
                    />
                    {errors?.full_name && <div className={classes.form__error}>{errors.full_name.message}</div>}
                </div>
                <div className={classes.form__section}>
                    <div className={classes.form__sectionTitle}>Книги</div>
                    <div className={clsx(classes.form__checkboxes, classes.checkboxes)}>
                        <div className={classes.checkboxes__container}>
                            {availableBooks.map((book) => (
                                <label key={book.book_id} className={classes.checkboxes__item}>
                                    <input
                                        type="checkbox"
                                        {...register(`books.${book.book_id}`, {validate: validateCheckedBooks})}
                                    />
                                    <div
                                        className={classes.checkboxes__title}
                                    >{`${book.title} - ${book.author_name}`}</div>
                                </label>
                            ))}
                        </div>
                    </div>
                    {errors?.books && (
                        <div className={classes.form__error}>
                            {errors.books[`${availableBooks[0].book_id}`]?.message}
                        </div>
                    )}
                </div>
                <div className={classes.form__submit}>
                    <CommonButton variant="secondary">{reader ? 'Изменить' : 'Добавить'}</CommonButton>
                </div>
            </form>
        </div>
    );
};

export default ReadersForm;
