import React, {FC} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import classes from './Form.module.scss';
import {CommonButton} from '../Button/Button';
import {useAppSelector} from '../../../hooks/useAppSelector';

interface IMaxCountBooks {
    maxCountBooks: number;
}

interface MaxCountBooksFormProps {
    onSubmitHandler: SubmitHandler<IMaxCountBooks>;
    maxCountBooks: number;
}

const MaxCountBooksForm: FC<MaxCountBooksFormProps> = ({onSubmitHandler, maxCountBooks}) => {
    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm<IMaxCountBooks>({
        mode: 'onChange',
        defaultValues: {
            maxCountBooks
        }
    });

    const {readers} = useAppSelector((state) => state.readers);

    const validateFunction = (value: number) => {
        if (readers.every((reader) => reader.books.length <= value)) {
            return true;
        }
        return 'Кто то из читателей имеет большее кол-во книг на руках';
    };
    // const onSubmit = (data: {maxCountBooks: number}) => {
    //     setPopupActive(false);
    //     onSubmitHandler(data);
    // };

    return (
        <form className={classes.formInline} onSubmit={handleSubmit(onSubmitHandler)}>
            <div className={classes.formInline__title}>Количество книг, которые читатель может взять одновременно:</div>
            <div className={classes.formInline__section}>
                <input
                    type="number"
                    className={classes.formInline__input}
                    {...register('maxCountBooks', {
                        required: 'Введите количество книг.',
                        pattern: {
                            value: /^\d+$/,
                            message: 'Количество книг должно быть больше 0'
                        },
                        validate: validateFunction
                    })}
                />
                <div className={classes.formInline__submit}>
                    <CommonButton>Изменить</CommonButton>
                </div>
            </div>
            {errors?.maxCountBooks && <div className={classes.formInline__error}>{errors.maxCountBooks.message}</div>}
        </form>
    );
};

export default MaxCountBooksForm;
