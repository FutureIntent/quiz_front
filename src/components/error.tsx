import React from 'react'

function Error(props: any) {

    const message: string = props.message;

    return (
        <p>
            { message }
        </p>
        );
}

export default Error;