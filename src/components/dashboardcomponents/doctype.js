import React from 'react'
import TButton from '../tbutton'
import BASE_URL from '../../backend'
import axios from 'axios'

function DocType(props) {
    const handleDocumentDelete = (event) => {
        event.preventDefault()
        console.log(
            'Document Delete Request Sent for document id: ',
            props['doc']['id']
        )
        props.setDocTypes((prevDocuments) =>
            prevDocuments.filter((doc) => doc.id !== props['doc']['id'])
        )
        console.log('Document Deleted Successfully', props['doc']['id'])

        axios
            .post(`${BASE_URL}/annotation/delete/${props['doc']['id']}`, {
                withCredentials: true,
            })
            .then((res) => {
                console.log('Successfully deleted ', res.data.success)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div class="flex">
                <div class="flex justify-start">
                    <span class="mb-2  dark:text-white">
                        {props['doc']['name']}
                    </span>
                    <svg
                        class="ml-2 -mr-1 w-5 h-5 "
                        fill="currentColor"
                        stroke="White"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z"></path>
                    </svg>
                </div>

                <div class="flex flex-grow justify-end">
                    <svg
                        class="ml-2 -mr-1 w-5 h-5 "
                        fill="none"
                        stroke="White"
                        stroke-width="1.5"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                        ></path>
                    </svg>
                    <svg
                        class="ml-2 -mr-1 w-5 h-5"
                        fill="currentColor"
                        stroke="White"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        onClick={handleDocumentDelete}
                    >
                        <path d="M8 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"></path>
                        <path
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                            d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm5 5a3 3 0 101.524 5.585l1.196 1.195a.75.75 0 101.06-1.06l-1.195-1.196A3 3 0 009.5 7z"
                        ></path>
                    </svg>
                </div>
            </div>

            <ul class="mb-2 tracking-tight text-gray-900 dark:text-gray-200">
                <li>
                    Uploaded:<strong>1</strong>
                </li>
                <li>
                    Review Pending: <strong>1</strong>
                </li>
                <li>
                    Approved: <strong>0</strong>
                </li>
            </ul>

            <div class="flex justify-between">
                <a href={`jsonpage/${props['doc']['id']}`}>
                    <TButton label="Edit Fields"></TButton>
                </a>
                <TButton label="Upload"></TButton>
                <a href={`annotate/${props['doc']['id']}`}>
                    <TButton label="Review"></TButton>
                </a>
            </div>
        </div>
    )
}

export default DocType
