import axios from 'axios'
import React, { useState, useEffect } from 'react'
import TButton from '../tbutton'
import Th from './thcomponent'

function MyDocuments(props) {
    const [documents, setDocuments] = useState([])
    const [selected, setSelected] = useState([])

    useEffect(() => {
        axios('http://localhost:5000/getdocuments', {
            method: 'GET',
            withCredentials: false,
        })
            .then((res) => {
                console.log(res)
                setDocuments(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const handleAllChecks = (event) => {
        if (event.target.checked) {
            setSelected(documents.map((doc) => doc.id))
        } else {
            setSelected([])
        }
    }

    const handleDelete = (event) => {
        console.log('Selected Elements: ', selected)
    }

    return (
        <div class="p-4 sm:ml-64">
            <div class="p-4 border-2 text-white border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
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

                            <TButton onClick={handleDelete} label="Delete" />
                        </div>
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
                                {documents &&
                                    documents.map((doc) => (
                                        <Th
                                            documents={documents}
                                            selected={selected}
                                            setSelected={setSelected}
                                            docId={doc.id}
                                            docname={doc.name}
                                            docuploadedby={doc.uploadedby}
                                            doctype={doc.doctype}
                                            docstatus={doc.status}
                                            docaction="Edit"
                                        />
                                    ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    )
}

export default MyDocuments
