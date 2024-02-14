import React from 'react';
import classes from './Loading.module.scss';
import {RotatingLines} from 'react-loader-spinner';

const Loading = () => {
    return (
        <div className={classes.loading}>
            <RotatingLines strokeColor="grey" strokeWidth="5" animationDuration="0.75" width="40" visible={true} />
        </div>
    );
};

export default Loading;
