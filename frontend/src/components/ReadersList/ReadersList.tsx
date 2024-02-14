import {FC, HTMLAttributes} from 'react';
import ReaderItem from '../ReaderItem/ReaderItem';
import {useAppSelector} from '../../hooks/useAppSelector';
import classes from './ReadersList.module.scss';
import clsx from 'clsx';

interface ReadersListProps extends HTMLAttributes<HTMLDivElement> {}

const ReadersList: FC<ReadersListProps> = ({className}) => {
    const {readers} = useAppSelector((state) => state.readers);

    return (
        <div className={clsx(className, classes.readersList)}>
            <ReadersTitle />
            {readers.map((reader) => (
                <ReaderItem key={reader.reader_id} reader={reader} />
            ))}
        </div>
    );
};

const ReadersTitle = () => {
    return (
        <>
            <div className={classes.readersList__title}>ФИО</div>
            <div className={classes.readersList__title}>Выданные книги</div>
            <div></div>
        </>
    );
};

export default ReadersList;
