import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DocType from '../dashboardcomponents/doctype'
import FormType from '../dashboardcomponents/formtype'
import BASE_URL from '../../backend'
import TButton from '../tbutton'

function DocumentTypes(props) {
    const [file, setFile] = useState(null)
    const [documentName, setDocumentName] = useState('')
    const [docTypes, setDocTypes] = useState([])
    const [modelType, setModelType] = useState('')

    const handleFileChange = (event) => {
        setFile(event.target.files[0])
    }

    useEffect(() => {
        console.log('inside axios')
        // Get all the document types
        axios(`${BASE_URL}/doc_type/get_all/`, {
            method: 'GET',
            withCredentials: true,
        })
            .then((res) => {
                console.log(res)
                setDocTypes(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const handleDocumentDelete = (id) => {
        axios
            .delete(`${BASE_URL}/doc_type/delete/${id}/`, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res)
                setDocTypes(docTypes.filter((docType) => docType.id !== id))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const createNewDocumentType = (event) => {
        axios
            .post(
                `${BASE_URL}/doc_type/post/`,
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
            .then((response) => response.data)
            .then((data) => {
                //handle success
                console.log('Request successful', data)
                setDocTypes([...docTypes, data])
            })
            .catch(function (response) {
                //handle error
                console.log(response)
            })

        // Reset the form data
        setDocumentName('')
        setModelType('')
        setFile(null)
    }

    return (
        <div class="pt-4 min-w-screen sm:ml-64">
            {/* <div class="flex p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"> */}
            {/* <div class="grid grid-flow-col auto-cols-[minmax(_2fr,_3fr)] border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"> */}
            <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-8 ml-3 p-4">
                {docTypes &&
                    docTypes.map((doc, index) => (
                        <DocType
                            doc={doc}
                            key={index}
                            id={doc['id']}
                            setDocTypes={setDocTypes}
                        />
                    ))}

                {/* <FormType /> */}
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
                                onChange={(e) =>
                                    setDocumentName(e.target.value)
                                }
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="John"
                                value={documentName}
                                required
                            />
                        </li>
                        <li>
                            Task Type:{' '}
                            <input
                                type="text"
                                onChange={(e) => setModelType(e.target.value)}
                                value={modelType}
                                id="model_type"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="John"
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

            {/* This components includes a form for adding a new document type */}
            {/* </div> */}
        </div>
    )
}

export default DocumentTypes
