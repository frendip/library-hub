import Navbar from '../Navbar/Navbar';
import {Outlet} from 'react-router-dom';
import classes from './Layout.module.scss';

const Layout = () => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.content}>
                <Navbar />
                <div className={classes.outletContainer}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
