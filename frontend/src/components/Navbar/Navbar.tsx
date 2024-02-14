import {FC, HTMLAttributes} from 'react';
import {Link, useLocation} from 'react-router-dom';
import classes from './Navbar.module.scss';
import clsx from 'clsx';
import logoIcon from '../../assets/img/logo.svg';

interface NavbarProps extends HTMLAttributes<HTMLDivElement> {}

const Navbar: FC<NavbarProps> = ({className}) => {
    const {pathname} = useLocation();

    return (
        <div className={clsx(className, classes.navbar)}>
            <Link to={'/'} className={classes.navbar__header}>
                <div className={classes.navbar__logo}>
                    <img src={logoIcon} alt="logo" />
                </div>
                <div className={classes.navbar__title}>Library Hub</div>
            </Link>
            <div className={clsx(classes.navbar__list, classes.list)}>
                <Link
                    to={'/readers'}
                    className={clsx(classes.list__item, pathname === '/readers' && classes.list__item_active)}
                >
                    Читатели
                </Link>
                <Link
                    to={'/books'}
                    className={clsx(classes.list__item, pathname === '/books' && classes.list__item_active)}
                >
                    Книги
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
