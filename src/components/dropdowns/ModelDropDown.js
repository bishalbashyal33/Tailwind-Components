// import React, { useState } from 'react'

// function ModelButton(props) {
//     const [modelId, setModelId] = useState(
//         props.model_id ? props.model_id : props.label
//     )
//     console.log('props', props)
//     const handleModelClick = (event, model_id) => {
//         setModelId(model_id)
//         props.setModelId(model_id)
//         props.setOpenDropdown(false)
//         console.log(model_id)
//     }

//     return (
//         <div>
//             <button
//                 class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                 onClick={(e) => props.setOpenDropdown(!props.opendropdown)}
//             >
//                 {modelId}
//                 <svg
//                     class="w-4 h-4 ml-2"
//                     aria-hidden="true"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                 >
//                     <path
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                         stroke-width="2"
//                         d="M19 9l-7 7-7-7"
//                     ></path>
//                 </svg>
//             </button>
//             {props.opendropdown && (
//                 <div class="z-100 bg-white divide-y divide-gray-100 rounded-lg shadow w-80 dark:bg-gray-700">
//                     <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
//                         {props.models &&
//                             props.models.map((model, index) => (
//                                 <li
//                                     key={model['id']}
//                                     onClick={(e) =>
//                                         handleModelClick(e, model['id'])
//                                     }
//                                 >
//                                     <div class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
//                                         {model['id']} {'-'} {model['version']}
//                                     </div>
//                                 </li>
//                             ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default ModelButton

import React, { useState } from 'react'

function ModalBtn(props) {
    const [isOpen, setIsOpen] = useState(false)
    const [modelid, setmodelid] = useState(props.model || 'Select Model')

    function toggleDropdown() {
        setIsOpen(!isOpen)
    }
    const handleDoctypeClick = (event, model_id) => {
        setmodelid(event.target.innerText)
        props.setModelId(modelid)
        toggleDropdown()
    }

    return (
        <div className="relative inline-block text-left">
            <button
                className="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                onClick={toggleDropdown}
            >
                <span>{modelid}</span>
                <svg
                    className="w-5 h-5 ml-2 -mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 max-h-80 overflow-y-auto divide-y divide-gray-100 focus:outline-none">
                    {/* <div className="origin-top-right absolute right-0 mt-2 w-56 overflow-y-auto max-h rounded-md shadow bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5"> */}
                    <div
                        className="py-1 text-gray-700 dark:text-gray-200 overflow-y-auto max-h"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                    >
                        {props.models &&
                            props.models.map((mod, index) => (
                                <a
                                    key={mod['id']}
                                    onClick={(e) =>
                                        handleDoctypeClick(e, mod['id'])
                                    }
                                >
                                    <div class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        {mod['id']} {'-'} {mod['version']}
                                    </div>
                                </a>
                            ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ModalBtn
