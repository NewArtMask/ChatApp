import React from 'react';

import Style from './Error.module.css';

export interface IErrorProps {
    error: string
}

export default function Error({ error }: IErrorProps) {
    return (
        <div className={Style.Error}>
            <div className={Style.Error_box}>
                <h1>Error: </h1>
                {error}
            </div>
        </div>
    );
}
