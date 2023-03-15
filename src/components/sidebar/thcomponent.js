import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Th(props) {
    const [checked, setChecked] = useState(props.selected.includes(props.docId))

    const handleCheckClick = (event) => {
        console.log(props)
        setChecked(!checked)
        if (event.target.checked) {
            props.setSelected([...props.selected, props.docId])
        } else {
            props.setSelected(
                props.selected.filter((item) => item !== props.docId)
            )
        }
    }

    return (
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="w-4 p-4">
                <div class="flex items-center">
                    <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        onClick={handleCheckClick}
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-table-search-1" class="sr-only">
                        checkbox
                    </label>
                </div>
            </td>
            <th
                scope="row"
                class="flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
                <svg
                    class="ml-2 mr-1 w-5 h-5 "
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    ></path>
                </svg>{' '}
                {props.docname}
            </th>

            <td class="px-6 py-4">{props.doctype}</td>
            <td class="px-6 py-4">{props.docstatus}</td>
            <td class="px-6 py-4">{props.docuploadedby}</td>
            <td class="px-6 py-4">
                <Link
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    to={`/annotate/${props.docId}`}
                    key={Math.random()}
                    state={{ documents: props.documents }}
                >
                    {props.docaction}
                </Link>
            </td>
        </tr>
    )
}

export default Th
