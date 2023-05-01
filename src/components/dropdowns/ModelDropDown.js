import React, { useState } from 'react'

function ModalBtn ( props ) {
    const [isOpen, setIsOpen] = useState( false )
    const [modelid, setmodelid] = useState( props.model || 'Select Model' )

    function toggleDropdown () {
        setIsOpen( !isOpen )
    }
    const handleDoctypeClick = ( event, model_id ) => {
        setmodelid( event.target.innerText )
        props.setModelId( modelid )
        toggleDropdown()
    }

    return (
        <div className="relative inline-block text-left">
            <button
                className="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                onClick={toggleDropdown}
            >
                <span>{modelid}</span>
                <svg
                    className="w-5 h-5 ml-2 -mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 max-h-80 overflow-y-auto divide-y divide-gray-100 focus:outline-none">
                    {/* <div className="origin-top-right absolute right-0 mt-2 w-56 overflow-y-auto max-h rounded-md shadow bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5"> */}
                    <div
                        className="py-1 text-gray-700 dark:text-gray-200 overflow-y-auto max-h"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                    >
                        {props.models &&
                            props.models.map( ( mod, index ) => (
                                <a
                                    key={mod['id']}
                                    onClick={( e ) =>
                                        handleDoctypeClick( e, mod['id'] )
                                    }
                                >
                                    <div class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        {mod['id']} {'-'} {mod['version']}
                                    </div>
                                </a>
                            ) )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ModalBtn
