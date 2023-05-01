import axios from 'axios'
import { useState, useEffect } from 'react'
import DocType from '../dashboardcomponents/doctype'
import TButton from '../tbutton'

function DocumentTypes ( { updateDocTypes } ) {
    console.log( 'Rendering DocumentTypes' )
    const [docTypes, setDocTypes] = useState( [] )
    const [documentName, setDocumentName] = useState( '' )
    const [modelType, setModelType] = useState( '' )

    useEffect( () => {
        // Get all the document types
        axios( `${process.env.REACT_APP_BACKEND}/doc_type/get_all/`, {
            method: 'GET',
            withCredentials: true,
        } )
            .then( ( res ) => {
                setDocTypes( res.data.doctypes )
            } )
            .catch( ( err ) => {
                console.log( err )
            } )
    }, [] )


    const createNewDocumentType = ( event ) => {
        axios
            .post(
                `${process.env.REACT_APP_BACKEND}/doc_type/post/`,
                {
                    name: documentName,
                    task_type: modelType,
                    model: '',
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
                { withCredentials: true }
            )
            .then( ( response ) => response.data )
            .then( ( data ) => {
                //handle success
                updateDocTypes( [...docTypes, data] )
                setDocTypes( [...docTypes, data] )
            } )
            .catch( function ( err ) {
                //handle error
                console.log( err )
            } )

        // Reset the form data
        setDocumentName( '' )
        setModelType( '' )
    }

    const handleDocTypeDelete = ( id ) => {
        updateDocTypes( docTypes.filter( ( doc ) => doc.id !== id ) )
    }

    return (
        <div class="pt-4 min-w-screen sm:ml-64">
            <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-8 ml-3 p-4">
                {docTypes &&
                    docTypes.map( ( doc, index ) => (
                        <DocType
                            doc={doc}
                            key={index}
                            id={doc['id']}
                            handleDocTypeDelete={handleDocTypeDelete}
                        />
                    ) )}

                {/* Form for New Document Type */}
                <div class="block max-w-sm p-6 m-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <div class="flex">
                        <div class="flex justify-start">
                            <span class="mb-2  dark:text-white">
                                New Document Type
                            </span>
                        </div>
                    </div>

                    <ul class="mb-2 tracking-tight text-gray-900 dark:text-gray-200">
                        <li>
                            Name:
                            <input
                                type="float"
                                id="doc_name"
                                onChange={( e ) =>
                                    setDocumentName( e.target.value )
                                }
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Document Name"
                                value={documentName}
                                required
                            />
                        </li>
                        <li>
                            Task Type:{' '}
                            <input
                                type="text"
                                onChange={( e ) => setModelType( e.target.value )}
                                value={modelType}
                                id="model_type"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Token Classification"
                                required
                            />
                        </li>
                    </ul>

                    <div class="flex justify-center">
                        <TButton
                            label="Save"
                            onClick={createNewDocumentType}
                        ></TButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DocumentTypes
