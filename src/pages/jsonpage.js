import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TButton from '../components/tbutton'
import JsonSpanElement from '../components/jsonspanelement'

function JsonPage () {
    const navigate = useNavigate()
    const { docType } = useParams()

    const [zoom, setZoom] = useState( 100 )
    const imageWidth = `${zoom}%`

    const [fields, setFields] = useState( [] )
    const [docMeta, setDocMeta] = useState( {} )
    const [fileId, setFileId] = useState( null )

    const handleZoomChange = ( event ) => {
        setZoom( event.target.value )
    }

    useEffect( () => {
        axios( `${process.env.REACT_APP_BACKEND}/doc_type/new/${docType}`, {
            method: 'GET',
            withCredentials: true,
        } )
            .then( ( response ) => response.data )
            .then( ( data ) => {
                setDocMeta( data['meta'] )
                setFields( data['meta']['fields'] )
                setFileId( data['file_id'] )
            } )
            .catch( ( err ) => {
                console.log( err )
            } )
    }, [docType] )

    const handleFieldNameChange = ( event, index ) => {
        fields[index]['name'] = event.target.value
        setFields( [...fields] )
    }

    const addNewField = ( event ) => {
        fields.push( {
            name: `New Field ${fields.length + 1}`,
            type: 'string',
        } )
        setFields( [...fields] )
    }

    const handleFieldDelete = ( event, index ) => {
        fields.splice( index, 1 )
        setFields( [...fields] )
    }

    const saveFieldData = ( event ) => {
        docMeta.fields = fields
        docMeta['task_type'] = 'Token Classification'
        docMeta['model'] = 'ML'
        axios
            .post(
                `${process.env.REACT_APP_BACKEND}/doc_type/update/${docType}`,
                docMeta,
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
                setDocMeta( data.data )
                setFields( data.data['fields'] )
                navigate( "/dashboard" )
            } )
            .catch( function ( response ) {
                //handle error
                console.log( response )
            } )
    }

    const handleExit = ( e ) => {
        e.preventDefault()
        // navigate( `/dashboard` )
        window.location.href = "/dashboard"
    }

    return (
        <div class="mt-8 pb-24 dark:bg-gray-800">
            <div class="fixed bottom-0  left-0 pt-6 px-4 flex-shrink-0  w-600 mt-200 border border-gray-200  shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div class="flex flex-grow justify-start">
                    <TButton
                        onClick={saveFieldData}
                        label="Save & Close"
                    ></TButton>
                </div>
            </div>

            <div class="flex p-2 z-20 w-auto fixed top-0 right-0 border border-gray-200  shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <input
                    type="range"
                    class="w-600 "
                    min="50"
                    max="200"
                    step="10"
                    value={zoom}
                    onChange={handleZoomChange}
                />
                <svg
                    class="ml-2 mr-1 w-8 h-8 hover:cursor-pointer"
                    fill="White"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    onClick={handleExit}
                >
                    <path
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    ></path>
                </svg>
            </div>

            <div class="flex h-screen w-full overflow-hidden">
                <div class="flex flex-col overflow-y-scroll scrollbar-hide ">
                    {fields &&
                        fields.map( ( field, index ) => (
                            <div key={index}>
                                <JsonSpanElement
                                    index={index}
                                    handleFieldNameChange={
                                        handleFieldNameChange
                                    }
                                    handleFieldDelete={handleFieldDelete}
                                    value={field['name']}
                                />
                            </div>
                        ) )}
                    <TButton
                        onClick={( event ) => addNewField( event )}
                        label="+Add Field"
                    ></TButton>
                </div>

                <div class="flex-1  flex flex-col h-screen justify-center ml-32 overflow-clip">
                    <div class=" h-890 overflow-x-scroll scrollbar-hide ">
                        {fileId && (
                            <img
                                src={`${process.env.REACT_APP_BACKEND}/annotation/get_file/${fileId}`}
                                alt="Document Image"
                                id="document-image"
                                class="h-890 mx-auto  object-contain"
                                style={{
                                    width: imageWidth,
                                    maxWidth: 'none',
                                    maxHeight: '890',
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JsonPage
