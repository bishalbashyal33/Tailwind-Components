import React from 'react'

function DocButton(props) {
    const handleDoctypeClick = (event, doc_type_id) => {
        props.setDocType(doc_type_id)
        props.setOpenDropdown(false)
    }

    return (
        <div>
            <button
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={(e) => props.setOpenDropdown(!props.opendropdown)}
            >
                {props.label}{' '}
                <svg
                    class="w-4 h-4 ml-2"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                    ></path>
                </svg>
            </button>
            {props.opendropdown && (
                <div class="z-100 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
                        {props.doc_types &&
                            props.doc_types.map((doc_type, index) => (
                                <li
                                    key={doc_type['id']}
                                    onClick={(e) =>
                                        handleDoctypeClick(e, doc_type['id'])
                                    }
                                >
                                    <div class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        {doc_type['name']}
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default DocButton
