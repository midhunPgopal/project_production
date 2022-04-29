import React from 'react'

function ErrorNotice(props) {
    return (
            <>
                <strong>{props.message}</strong>
            </>
    )
}

export default ErrorNotice