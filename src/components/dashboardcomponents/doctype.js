import React, { useState } from 'react'
import TButton from '../tbutton'
import axios from 'axios'
import SettingModal from '../modals/SettingModal'

function DocType ( props ) {
    const [isOpen, setIsOpen] = useState( false )

    const handleDocumentDelete = ( event ) => {
        event.preventDefault()
        console.log(
            'Document Delete Request Sent for document id: ',
            props['doc']['id']
        )
        props.handleDocTypeDelete( props['doc']['id'] )
        console.log( 'Document Deleted Successfully', props['doc']['id'] )

        axios
            .post( `${process.env.REACT_APP_BACKEND}/doc_type/delete/${props['doc']['id']}`, {
                withCredentials: true,
            } )
            .then( ( res ) => {
                console.log( 'Successfully deleted ', res.data.success )
            } )
            .catch( ( err ) => {
                console.log( err )
            } )
    }
    const handleClick = ( event ) => {
        window.location.href = `annotate/${props['doc']['id']}`
    }

    function handleOpenModal () {
        setIsOpen( true )
    }

    function handleCloseModal () {
        setIsOpen( false )
    }
    return (
        <div class="m-2 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            {isOpen && (
                <SettingModal
                    isOpen={isOpen}
                    onCloseModal={handleCloseModal}
                    doc_type_details={props.doc}
                />
            )}

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
                        class="ml-2 -mr-1 w-5 h-5 hover:fill-white hover:stroke-gray-800"
                        data-modal-target="settingModal"
                        data-modal-toggle="settingModal"
                        fill="transparent"
                        stroke="White"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        onClick={handleOpenModal}
                    >
                        <path
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                            d="M8.34 1.804A1 1 0 019.32 1h1.36a1 1 0 01.98.804l.295 1.473c.497.144.971.342 1.416.587l1.25-.834a1 1 0 011.262.125l.962.962a1 1 0 01.125 1.262l-.834 1.25c.245.445.443.919.587 1.416l1.473.294a1 1 0 01.804.98v1.361a1 1 0 01-.804.98l-1.473.295a6.95 6.95 0 01-.587 1.416l.834 1.25a1 1 0 01-.125 1.262l-.962.962a1 1 0 01-1.262.125l-1.25-.834a6.953 6.953 0 01-1.416.587l-.294 1.473a1 1 0 01-.98.804H9.32a1 1 0 01-.98-.804l-.295-1.473a6.957 6.957 0 01-1.416-.587l-1.25.834a1 1 0 01-1.262-.125l-.962-.962a1 1 0 01-.125-1.262l.834-1.25a6.957 6.957 0 01-.587-1.416l-1.473-.294A1 1 0 011 10.68V9.32a1 1 0 01.804-.98l1.473-.295c.144-.497.342-.971.587-1.416l-.834-1.25a1 1 0 01.125-1.262l.962-.962A1 1 0 015.38 3.03l1.25.834a6.957 6.957 0 011.416-.587l.294-1.473zM13 10a3 3 0 11-6 0 3 3 0 016 0z"
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
                        <path
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
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
                {/* <a href={`annotate/${props['doc']['id']}`}> */}
                <TButton onClick={handleClick} label="Review"></TButton>
                {/* </a> */}
            </div>
        </div>
    )
}

export default DocType
