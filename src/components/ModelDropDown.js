import React, { useState } from 'react'

function ModelButton(props) {
    const [modelId, setModelId] = useState(
        props.model_id ? props.model_id : props.label
    )
    console.log('props', props)
    const handleModelClick = (event, model_id) => {
        setModelId(model_id)
        props.setModelId(model_id)
        props.setOpenDropdown(false)
        console.log(model_id)
    }

    return (
        <div>
            <button
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={(e) => props.setOpenDropdown(!props.opendropdown)}
            >
                {modelId}
                <svg
                    class="w-4 h-4 ml-2"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                    ></path>
                </svg>
            </button>
            {props.opendropdown && (
                <div class="z-100 bg-white divide-y divide-gray-100 rounded-lg shadow w-80 dark:bg-gray-700">
                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
                        {props.models &&
                            props.models.map((model, index) => (
                                <li
                                    key={model['id']}
                                    onClick={(e) =>
                                        handleModelClick(e, model['id'])
                                    }
                                >
                                    <div class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        {model['id']} {'-'} {model['version']}
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default ModelButton
