// Modal.js
import { useState } from 'react'
import axios from 'axios'

function UploadModal ( { isOpen, onCloseModal, selectedDocType } ) {
    function handleOverlayClick ( e ) {
        if ( e.target.id === 'modal-overlay' ) {
            onCloseModal( false )
        }
    }

    const [file, setFile] = useState( null )
    const handleFileSelect = () => {
        const fileInput = document.createElement( 'input' )
        fileInput.setAttribute( 'type', 'file' )
        fileInput.setAttribute( 'accept', 'image/*' )
        fileInput.setAttribute( 'multiple', true )
        const image = document.getElementById( 'selected-image' )

        fileInput.type = 'file'

        // Add an event listener for when a file is selected
        fileInput.addEventListener( 'change', ( event ) => {
            const temp_file = event.target.files[0]
            setFile( event.target.files )
            const reader = new FileReader()

            // Add an event listener for when the file is loaded
            reader.addEventListener( 'load', () => {
                image.src = reader.result
            } )

            // Load the selected file
            reader.readAsDataURL( temp_file )
        } )

        // Trigger a click event on the file input element
        fileInput.click()
    }

    const handleUpload = async ( event ) => {
        console.log( 'Clicked upload button' )
        console.log( file )
        event.preventDefault()

        if ( file ) {
            // Create a FormData object
            const formData = new FormData()
            formData.append( 'file', file, file.name )

            // Send the FormData object as the request body in the POST request
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND}/annotation/post/${selectedDocType}`,
                formData
            )
            if ( response.status == 202 ) {
                window.location.href = '/dashboard'
            }
            console.log( response.data )
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
                            Upload
                        </h3>
                        <button
                            type="button"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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

                    <div class="p-6 space-y-6 ">
                        <img
                            id="selected-image"
                            class="h-72 w-full"
                            src="https://silentsystem.com/wp-content/plugins/accelerated-mobile-pages/images/SD-default-image.png"
                        // alt="image description"
                        />
                    </div>

                    <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                            // data-modal-hide="staticModal"
                            type="button"
                            id="select-image-button"
                            onClick={handleFileSelect}
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Select Image
                        </button>
                        <button
                            // data-modal-hide="staticModal"
                            type="button"
                            onClick={handleUpload}
                            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        >
                            Upload
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadModal
