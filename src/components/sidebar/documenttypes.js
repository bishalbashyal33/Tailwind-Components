import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DocType from '../dashboardcomponents/doctype'
import FormType from '../dashboardcomponents/formtype'
import BASE_URL from '../../backend'

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
        var formData = new FormData()
        formData.append('name', documentName)
        formData.append('task_type', modelType)
        formData.append('file', file)
        formData.append('model', 'Token Classification')
        console.log(documentName, modelType, file, 'Token Classification')
        axios
            .post(
                `${BASE_URL}/doc_type/post/`,
                {
                    name: documentName,
                    task_type: modelType,
                    model: 'Token Classification',
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

                <FormType />
            </div>

            {/* This components includes a form for adding a new document type */}
            {/* </div> */}
        </div>
    )
}

export default DocumentTypes
