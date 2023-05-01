import axios from 'axios'
import { useEffect, useState } from 'react'
import ModalBtn from '../dropdowns/ModelButton'

function TrainModal ( { isOpen, onCloseModal, setModel } ) {
    const [docTypes, setDocTypes] = useState( [] )
    function handleOverlayClick ( e ) {
        if ( e.target.id === 'modal-overlay' ) {
            onCloseModal()
        }
    }

    useEffect( () => {
        // Get all the document types
        axios( `${process.env.REACT_APP_BACKEND}/doc_type/get_all/`, {
            method: 'GET',
            withCredentials: true,
        } )
            .then( ( res ) => {
                setDocTypes( res.data )
            } )
            .catch( ( err ) => {
                console.log( err )
            } )
    }, [] )

    const [opendropdown, setOpenDropdown] = useState( false )

    const [doc_type, setDocType] = useState( '' )
    const [epoch, setEpochs] = useState( 3 )
    const [batch_size, setBatchSize] = useState( 2 )
    const [train_split, setTrainSplit] = useState( 0.8 )

    const onTrainModel = ( event ) => {
        if ( doc_type === '' ) {
            console.log( 'Doc_type not defined, cannot train the model' )
            return
        }
        axios
            .post(
                `${process.env.REACT_APP_BACKEND}/train/`,
                {
                    doc_type: doc_type,
                    train_split: train_split,
                    epochs: epoch,
                    batch: batch_size
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
                { withCredentials: true }
            )
            .then( ( response ) => {
                setModel( ( models ) => [...models, response.data] )
            } )
            .catch( function ( response ) {
                console.log( response )
            } )
        onCloseModal()
    }

    const handleDropdown = ( e ) => {
        setOpenDropdown( !opendropdown )
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
                            Train New Model
                        </h3>
                        <button
                            type="button"
                            onClick={onCloseModal}
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="mytrainModal"
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

                    <div class="p-6 flex justify-start">
                        <div class="flex flex-col justify-center">
                            <span class=" font-normal text-gray-900 dark:text-white">
                                Document Type:
                            </span>
                        </div>
                        <div class="ml-2 flex flex-1 justify-start">
                            {/* Dropdown button */}
                            <ModalBtn
                                doc_types={docTypes}
                                setDocType={setDocType}
                                doc_type={doc_type}
                            />
                        </div>
                    </div>

                    <div class="pl-6 flex justify-start">
                        <div class="flex flex-col justify-center">
                            <span class=" w-32 text-gray-900 dark:text-white">
                                No. Of Epoch:
                            </span>
                        </div>
                        <div class="ml-2 flex flex-1 justify-start">
                            <input
                                type="int"
                                onChange={( e ) => setEpochs( e.target.value )}
                                value={epoch}
                                id="epoch_number"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="epoch number"
                                required
                            />
                        </div>
                    </div>

                    <div class="pl-6 flex justify-start">
                        <div class="flex flex-col justify-center">
                            <span class=" w-32 text-gray-900 dark:text-white">
                                Train Split:
                            </span>
                        </div>
                        <div class="ml-2 flex flex-1 justify-start mt-2">
                            <input
                                type="float"
                                onChange={( e ) => setTrainSplit( e.target.value )}
                                id="epoch_number"
                                value={train_split}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Split ratio"
                                required
                            />
                        </div>
                    </div>

                    <div class="pl-6 flex justify-start mb-4">
                        <div class="flex flex-col justify-center">
                            <span class=" w-32 text-gray-900 dark:text-white">
                                Batch Size:
                            </span>
                        </div>
                        <div class="ml-2 flex flex-1 justify-start mt-2">
                            <input
                                type="number"
                                onChange={( e ) => setBatchSize( e.target.value )}
                                id="batch_size"
                                value={batch_size}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="batch"
                                required
                            />
                        </div>
                    </div>

                    <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                            onClick={onTrainModel}
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Train
                        </button>
                        <button
                            type="button"
                            onClick={onCloseModal}
                            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrainModal
