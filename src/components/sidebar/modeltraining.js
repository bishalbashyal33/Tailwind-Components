import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchModelsStart, deleteModelSuccess, fetchModelsSuccess, fetchModelsFailure } from '../../reducers/modelReducer';
import { Link } from 'react-router-dom'
import TButton from '../tbutton'
import Loader from "../Loading"
import TrainModal from '../modals/TrainModal'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function ModelTraining ( props ) {
    const [_models, setModel] = useState( [] )
    const [selected, setSelected] = useState( [] )

    const { models, isLoading, error } = useSelector( ( state ) => state.models )
    const dispatch = useDispatch()

    const handleCheckClick = ( event, model_id ) => {
        console.log( 'Handled check click' )
        console.log( selected )

        if ( event.target.checked ) {
            setSelected( [...selected, model_id] )
        } else {
            setSelected( selected.filter( ( item ) => item !== model_id ) )
        }
    }

    useEffect( () => {
        dispatch( fetchModelsStart() );
        axios( `${process.env.REACT_APP_BACKEND}/predict/`, {
            method: 'GET',
            withCredentials: true,
        } )
            .then( ( res ) => res.data )
            .then( data => dispatch( fetchModelsSuccess( data.models ) ) )
            .catch( error => dispatch( fetchModelsFailure( error ) ) );
    }, [dispatch, _models] );


    const handleDelete = ( event ) => {
        axios
            .post(
                `${process.env.REACT_APP_BACKEND}/train/delete_multiple`,
                selected,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
                { withCredentials: true }
            )
            .then( () => {
                dispatch( deleteModelSuccess( selected ) )
                setSelected( [] )
                return toast( `Successfully deleted ${selected.length} models`, { autoClose: 1500 } )
            } )
            .catch( error => console.error( error ) );
    };

    const [isOpen, setIsOpen] = useState( false )

    function handleOpenModal () {
        setIsOpen( true )
    }

    function handleCloseModal () {
        setIsOpen( false )
    }
    console.log( 'Inside the model training component' )


    return (
        <div class="p-4 sm:ml-64">
            <ToastContainer />
            {
                isOpen && (
                    <TrainModal
                        isOpen={isOpen}
                        onCloseModal={handleCloseModal}
                        setModel={setModel}
                    />
                )
            }

            <div class="p-4 border-2 text-white border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-8">
                {
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

                            <TButton label="Delete" onClick={handleDelete} />
                            <TButton
                                label="Train New Model"
                                onClick={handleOpenModal}
                            />
                        </div>
                        {isLoading ? ( <Loader /> )
                            : error ? ( <div>Something went wrong: {error.message}</div> )
                                : models ? (
                                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" class="p-4">
                                                    <div class="flex items-center">
                                                        <input
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
                                                    Model name
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Document Type
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Version
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Created at
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    F1 Score
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {models.map( ( model ) => (
                                                <tr
                                                    key={model['id']}
                                                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                                >
                                                    <td class="w-4 p-4">
                                                        <div class="flex items-center">
                                                            <input
                                                                key={model['id']}
                                                                onClick={( e ) =>
                                                                    handleCheckClick(
                                                                        e,
                                                                        model['id']
                                                                    )
                                                                }
                                                                id="checkbox-table-search-1"
                                                                type="checkbox"
                                                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                            />
                                                            <label
                                                                for="checkbox-table-search-1"
                                                                class="sr-only"
                                                            >
                                                                checkbox
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <th
                                                        scope="row"
                                                        class="flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                    >
                                                        <Link
                                                            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                            to={`/dashboard/model/${model['id']}`}
                                                        >
                                                            {model['id']}
                                                        </Link>
                                                    </th>
                                                    <td class="px-6 py-4">
                                                        {model['doc_type_name']}
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        {model['version']}
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        {
                                                            new Date(
                                                                model['created_at'] * 1000
                                                            )
                                                                .toISOString()
                                                                .split( 'T' )[0]
                                                        }
                                                    </td>
                                                    {model["status"] && model["status"] === "running" && <td class="px-6 py-4">Training: {model["trained_epoch"] || 1} of {model["epochs"]}</td>}
                                                    {model["status"] && model["status"] === "failed" && <td class="px-6 py-4 text-red-400">Error: Training Failed</td>}
                                                    {( !model["status"] || model["status"] === "completed" ) && <td class="px-6 py-4">{model["accuracy"]["f1-score"] || 0.90}</td>}

                                                </tr>
                                            ) )}
                                        </tbody>
                                    </table>
                                ) : <div>Train a new Model</div>}
                    </div>
                }
            </div>
        </div>
    )
}

export default ModelTraining
