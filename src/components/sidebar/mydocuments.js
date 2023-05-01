import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDocumentsStart, deleteDocumentSuccess, fetchDocumentsSuccess, fetchDocumentsFailure } from '../../reducers/documentReducer';
import TButton from '../tbutton'
import Loader from "../Loading"
import Th from './thcomponent'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function MyDocuments () {
    const [selected, setSelected] = useState( [] )
    const [page, setPage] = useState( 1 )

    const { documents, isLoading, error, max_pages } = useSelector( ( state ) => state.documents )
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch( fetchDocumentsStart() );
        axios( `${process.env.REACT_APP_BACKEND}/get_documents?page=${page}`, {
            method: 'GET',
            withCredentials: true,
        } )
            .then( ( res ) => res.data )
            .then( data => dispatch( fetchDocumentsSuccess( data ) ) )
            .catch( error => dispatch( fetchDocumentsFailure( error ) ) );
    }, [dispatch, page] );

    const handleAllChecks = ( event ) => {
        if ( event.target.checked ) {
            setSelected( documents.map( ( doc ) => doc.id ) )
        } else {
            setSelected( [] )
        }
    }

    const handleDelete = ( event ) => {
        axios
            .post(
                `${process.env.REACT_APP_BACKEND}/annotation/delete_multiple`,
                selected,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
                { withCredentials: true }
            )
            .then( () => {
                dispatch( deleteDocumentSuccess( selected ) )
                setSelected( [] )
                return toast.success( `Successfully deleted ${selected.length} documents`, {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                } )
            } )
            .catch( error => console.error( error ) );
    };

    return (
        <div class="p-4 sm:ml-64">
            <ToastContainer />
            <div class="p-4 border-2 text-white border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-8">
                <div class=" relative overflow-x-auto shadow-md sm:rounded-lg">
                    <div class="flex pb-4 pt-4 pl-4 bg-white dark:bg-gray-900">
                        <label for="table-search" class="sr-only">
                            Search
                        </label>
                        <div class="relative mt-1">
                            <div class=" absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg
                                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="table-search"
                                class="block mr-6 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search for items"
                            />
                        </div>
                        <TButton onClick={handleDelete} label="Delete" />
                    </div>
                    {isLoading ? ( <Loader /> )
                        : error ? ( <div>Something went wrong: {error.message}</div> )
                            : documents ? (
                                <>
                                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" class="p-4">
                                                    <div class="flex items-center">
                                                        <input
                                                            onClick={handleAllChecks}
                                                            id="checkbox-all-search"
                                                            type="checkbox"
                                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                        />
                                                        <label
                                                            for="checkbox-all-search"
                                                            class="sr-only"
                                                        >
                                                            checkbox
                                                        </label>
                                                    </div>
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Document name
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Type
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Status
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Uploaded By
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {documents.map( ( doc ) => (
                                                <Th
                                                    key={doc.image_id}
                                                    documents={documents}
                                                    selected={selected}
                                                    setSelected={setSelected}
                                                    docId={doc.image_id}
                                                    docname={doc.filename}
                                                    docuploadedby={doc?.owner}
                                                    doctype={doc.doc_type_name}
                                                    docstatus={doc.status}
                                                    docaction="Edit"
                                                />
                                            )
                                            )}
                                        </tbody>
                                    </table>
                                    <>

                                        <div class="flex flex-col items-center">
                                            <div class="inline-flex mt-2 xs:mt-0">
                                                {page > 1 &&
                                                    <button class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white border border-gray-300 rounded-l-lg "
                                                        onClick={() => setPage( Math.max( 1, page - 1 ) )}>
                                                        <svg aria-hidden="true" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
                                                        Prev
                                                    </button>
                                                }
                                                {page < max_pages &&
                                                    <button class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white border border-gray-300 rounded-l-lg "
                                                        onClick={() => setPage( Math.min( max_pages, page + 1 ) )}>
                                                        Next
                                                        <svg aria-hidden="true" class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                    </button>
                                                }
                                            </div>
                                        </div>

                                    </>
                                </>
                            ) : <div>Upload New documents</div>}
                </div>
            </div>
        </div>
    )
    // }
}

export default MyDocuments
