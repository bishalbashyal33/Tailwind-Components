function JsonSpanElement ( props ) {
    return (
        <div class="block w-700  border-gray-200  shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div class="flex ml-10 py-2">
                <div class="flex justify-start">
                    <span class="text-white font-medium w-48">
                        {props.label}
                    </span>
                    <input
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onClick={( event ) => props.handleRef( event, props.index )}
                        onChange={( event ) =>
                            props.handleFieldNameChange( event, props.index )
                        }
                        type={'text'}
                        name="value"
                        value={props.value}
                        readOnly={props.status === 'Processed.'}
                    />
                </div>

                {props && props['handleFieldDelete'] && (
                    <div class="flex flex-grow justify-end">
                        <svg
                            class="ml-2 mr-1 w-5 h-5 cursor-pointer"
                            fill="White"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            onClick={( event ) =>
                                props.handleFieldDelete( event, props.index )
                            }
                        >
                            <path
                                clip-rule="evenodd"
                                fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                            ></path>
                        </svg>
                    </div>
                )}
            </div>
        </div>
    )
}

export default JsonSpanElement
