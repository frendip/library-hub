import React, {FC, Dispatch, SetStateAction} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import classes from './Form.module.scss';
import {CommonButton} from '../Button/Button';
import {IBook} from '../../../types/IBook';

interface BooksFormProps {
    setPopupActive: Dispatch<SetStateAction<boolean>>;
    onSubmitHandler: SubmitHandler<IBook>;
    book?: IBook;
}

const BooksForm: FC<BooksFormProps> = ({setPopupActive, onSubmitHandler, book}) => {
    const defaultValues = book
        ? {
              book_id: book.book_id,
              title: book.title,
              author_name: book.author_name,
              quantity: book.quantity
          }
        : {};

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm<IBook>({
        mode: 'onChange',
        defaultValues
    });

    const onSubmit = (data: IBook) => {
        setPopupActive(false);
        onSubmitHandler(data);
    };

    return (
        <div className={classes.card}>
            <h2 className={classes.card__title}>{book ? 'Редактирование книги' : 'Добавление книги'}</h2>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.form__section}>
                    <div className={classes.form__sectionTitle}>Название</div>
                    <input
                        className={classes.form__input}
                        {...register('title', {
                            required: 'Введите название книги.',
                            minLength: {
                                value: 3,
                                message: 'Название книги должно содержать минимум 3 символа'
                            }
                        })}
                    />
                    {errors?.title && <div className={classes.form__error}>{errors.title.message}</div>}
                </div>
                <div className={classes.form__section}>
                    <div className={classes.form__sectionTitle}>ФИО автора</div>
                    <input
                        className={classes.form__input}
                        {...register('author_name', {
                            required: 'Введите ФИО автора книги.',
                            minLength: {
                                value: 5,
                                message: 'ФИО должны содержать минимум 5 символов'
                            }
                        })}
                    />
                    {errors?.author_name && <div className={classes.form__error}>{errors.author_name.message}</div>}
                </div>
                <div className={classes.form__section}>
                    <div className={classes.form__sectionTitle}>Количество книг</div>
                    <input
                        type="number"
                        className={classes.form__input}
                        {...register('quantity', {
                            required: 'Введите количество книг.',
                            pattern: {
                                value: /^\d+$/,
                                message: 'Количество книг должно быть больше 0'
                            }
                        })}
                    />
                    {errors?.quantity && <div className={classes.form__error}>{errors.quantity.message}</div>}
                </div>
                <div className={classes.form__submit}>
                    <CommonButton variant="secondary">{book ? 'Изменить' : 'Добавить'}</CommonButton>
                </div>
            </form>
        </div>
    );
};

export default BooksForm;
