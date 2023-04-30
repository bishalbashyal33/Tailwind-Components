import React, { useState } from 'react'

function ModalBtn(props) {
    const [isOpen, setIsOpen] = useState(false)
    const [doctype, setdoctype] = useState(
        props.doc_type || 'Select Document Type'
    )

    function toggleDropdown() {
        setIsOpen(!isOpen)
    }
    const handleDoctypeClick = (event, doc_type_id) => {
        setdoctype(event.target.innerText)
        props.setDocType(doc_type_id)
        toggleDropdown()
    }

    return (
        <div className="relative inline-block text-left">
            <button
                className="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                onClick={toggleDropdown}
            >
                <span>{doctype}</span>
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
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 max-h-60 overflow-y-auto divide-y divide-gray-100 focus:outline-none">
                    <div
                        className="py-1 text-gray-700 dark:text-gray-200"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                    >
                        {props.doc_types &&
                            props.doc_types.map((doc_type, index) => (
                                <a
                                    key={doc_type['id']}
                                    onClick={(e) =>
                                        handleDoctypeClick(e, doc_type['id'])
                                    }
                                >
                                    <div class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        {doc_type['name']}
                                    </div>
                                </a>
                            ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ModalBtn
