import { useState } from 'react'
import TButton from '../tbutton'
import ServiceModal from '../modals/ServiceModal'

function SerType ( props ) {
    const [isOpen, setIsOpen] = useState( false )
    const [apiDetail, setApi] = useState( props.apiDetail )

    function handleOpenModal () {
        setIsOpen( true )
    }

    function handleCloseModal () {
        setIsOpen( false )
    }
    return (
        <div class="block max-w-sm mx-2 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            {isOpen && (
                <ServiceModal
                    isOpen={isOpen}
                    onCloseModal={handleCloseModal}
                    header={apiDetail.header}
                    serviceName={props.serviceName}
                    serviceDetail={apiDetail.detail}
                />
            )}
            <div class="flex">
                <div class="flex justify-start">
                    <span class="mb-2  dark:text-white">API</span>
                    <svg
                        class="ml-2 mr-1 w-6 h-6 "
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
                            d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                        ></path>
                    </svg>
                </div>

                <div class="flex flex-grow justify-end">
                    {/* <svg
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
                    </svg> */}
                    <svg
                        fill="none"
                        class="ml-2 -mr-1 w-5 h-5 "
                        stroke="White"
                        stroke-width="1.5"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        onClick={( event ) => handleOpenModal( "Your Extracted Json are stored in the URL", )}
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                        ></path>
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                    </svg>
                </div>
            </div>

            <div class="flex justify-center py-8">
                <img class="h-6 w-6 mr-1 mt-1" src={props.apiDetail.img}></img>
                <h3 class="mb-2 tracking-tight font-medium text-xl text-gray-900 dark:text-gray-200">
                    {props.serviceName}
                </h3>
            </div>

            <div class="flex justify-center">
                {!apiDetail.status && <TButton label="Connect" onClick={() => props.handleServiceStatus( props.serviceName )}></TButton>}
                {apiDetail.status && <TButton label="Disconnect" onClick={() => props.handleServiceStatus( props.serviceName )}></TButton>}
            </div>
        </div>
    )
}

export default SerType
