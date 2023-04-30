import { useEffect, useState } from 'react'
import axios from 'axios'

function ServiceModal ( { isOpen, onCloseModal, header, serviceName, serviceDetail, serviceExample } ) {
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
            className={`fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center z-50 ${isOpen
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
                }`}
        >
            <div class="relative w-full h-full max-w-2xl md:h-auto">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div class="flex justify-around p-4 font-large text-lg text-gray-100 border-b rounded-t dark:border-gray-600">
                        <div>
                            {serviceName}
                        </div>
                    </div>
                    <div class="p-6 flex justify-around">
                        <div className="rounded-md p-4 font-large text-lg overflow-x-auto">
                            {header}
                        </div>

                    </div>
                    <div class="p-6 flex justify-around">
                        <pre className="bg-gray-600 rounded-md p-4 overflow-x-auto">
                            <code className={`language-py`}>
                                {serviceDetail}
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceModal
