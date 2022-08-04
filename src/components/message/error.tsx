import React from 'react';
import styles from './../../styles/message/message.module.scss';

function Error(props: any) {

    const message: string = props.message;

    return (
        <p className={ styles.messageError }>
            { message }
        </p>
        );
}

export default Error;