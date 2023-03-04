import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DocType from '../dashboardcomponents/doctype'
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
        <div class="p-4 sm:ml-64">
            <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                {docTypes &&
                    docTypes.map((doc, index) => (
                        <DocType
                            doc={doc}
                            key={index}
                            id={doc['id']}
                            setDocTypes={setDocTypes}
                        />
                    ))}

                {/* This components includes a form for adding a new document type */}
                <div class="document-card">
                    <div>
                        <label for="name">Document Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={documentName}
                            onChange={(e) => setDocumentName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label for="image_path">Image Path:</label>
                        <input
                            type="file"
                            id="image_path"
                            name="image_path"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div>
                        <label for="model_type">Model Type:</label>
                        <select
                            value={modelType}
                            onChange={(event) =>
                                setModelType(event.target.value)
                            }
                            name="model_type"
                            placeholder="Model Type"
                        >
                            <option value="RB">Rule Based</option>
                            <option value="ML">ML</option>
                            <option value="QA">Question Answering</option>
                            <option value="EL">Entity Linking</option>
                        </select>
                    </div>
                    <button type="submit" onClick={createNewDocumentType}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DocumentTypes
