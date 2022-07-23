import React from 'react'

function Error(props: any) {

    const error: string = props.error;

    return (
        <p>
            { error }
        </p>
        );
}

export default Error;