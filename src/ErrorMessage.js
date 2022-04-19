import React from 'react'
import './ErrorMessage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faRectangleXmark } from '@fortawesome/free-solid-svg-icons'

function ErrorMessage({ invalidValue, closeErrorMessage, errorTitle }) {
    return (
        <div className='ErrorMessage__container'>
            <div className='ErrorMessage'>
                <button
                    className='ErrorMessage__closeBtn'
                    onClick={() => closeErrorMessage()}
                >
                    <FontAwesomeIcon icon={faRectangleXmark} />
                </button>

                {errorTitle === 'input' ?
                    <h3>
                        <span><FontAwesomeIcon icon={faCircleExclamation} /> </span>
                        Invalid input: {invalidValue}
                    </h3> :
                    <h3>
                        <span><FontAwesomeIcon icon={faCircleExclamation} /> </span>
                        Connection problem:
                    </h3>
                }
                {errorTitle === 'input' ?
                    <p>
                        Please double check your input. Make sure there's no special sign or symbol other than "-"
                        and ":"
                        like +,@,%,$,^ etc.
                    </p> :
                    <p>
                        Please double check your internet connection. You are offline right now
                    </p>
                }

            </div>
            <div
                className='ErrorMessage__modal'
                onClick={() => closeErrorMessage()}
            />
        </div>
    )
}

export default ErrorMessage