function DownloadModal ( { isOpen, onCloseModal, docId } ) {
    function handleOverlayClick ( e ) {
        if ( e.target.id === 'modal-overlay' ) {
            onCloseModal()
        }
    }

    if ( !isOpen ) {
        return null
    }

    return (
        <div
            id="modal-overlay"
            onClick={handleOverlayClick}
            className={`fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-30 flex justify-center items-center z-50 ${isOpen
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
                }`}
        >
            <div class="relative w-full h-full max-w-2xl md:h-auto">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Download Options
                        </h3>
                        <button
                            type="button"
                            onClick={onCloseModal}
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="downloadModal"
                        >
                            <svg
                                class="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>

                    <div class="flex flex-col justify-center items-center">
                        <a
                            class="py-2 px-4 w-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 shadow-md mb-4 mt-4"
                            href={`${process.env.REACT_APP_BACKEND}/annotate/download/csv/${docId}`}
                            download
                        >
                            Download as CSV
                        </a>
                        <a
                            class="py-2 px-4 w-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 shadow-md mb-4"
                            href={`${process.env.REACT_APP_BACKEND}/annotate/download/json/${docId}`}
                            download
                        >
                            Download as JSON
                        </a>
                        <a
                            class="py-2 px-4 w-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 shadow-md mb-4"
                            href={`${process.env.REACT_APP_BACKEND}/annotate/download/json/${docId}`}
                            download
                        >
                            Download File
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DownloadModal
