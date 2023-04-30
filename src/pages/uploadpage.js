import { useState } from 'react';
import axios from 'axios';
import { saveAs } from "file-saver";
axios.defaults.withCredentials = true;

function UploadPage ( props ) {
    const [file, setFile] = useState( null );
    const [email, setEmail] = useState( '' );
    const [password, setPassword] = useState( '' );
    const [jsonResponse, setJsonResponse] = useState( null );

    const handleFileSelect = () => {
        // Create a hidden file input element and click it
        const input = document.createElement( 'input' );
        input.type = 'file';
        input.click();
        // Set the file state when a file is selected
        input.onchange = ( event ) => {
            setFile( event.target.files[0] );
        };
    };

    const handleEmailChange = ( event ) => {
        setEmail( event.target.value );
    };

    const handlePasswordChange = ( event ) => {
        setPassword( event.target.value );
    };

    const handleSubmit = ( event ) => {
        event.preventDefault();
        const userCredentials = {
            email: email,
            password: password
        };
        axios
            .post( `${process.env.REACT_APP_BACKEND}/user/signin`, userCredentials )
            .then( ( response ) => {
                console.log( response.data );
            } )
            .catch( ( error ) => {
                console.error( error );
            } );
    };

    const handleGetJson = async ( event ) => {
        event.preventDefault();
        while ( !( jsonResponse ) ) {
            await new Promise( ( resolve ) => setTimeout( resolve, 100 ) );
        }
        // Send a GET request to the /status/{id} route with the file ID
        axios
            .get( `${process.env.REACT_APP_BACKEND}/file/status/${jsonResponse.file_id}` )
            .then( ( response ) => {
                console.log( response.json );

                // Create a Blob object from the response JSON
                const blob = new Blob( [JSON.stringify( response.data )], {
                    type: "application/json",
                } );

                // Save the Blob object to a file using the FileSaver.js library
                saveAs( blob, "output.json" );
            } )
            .catch( ( error ) => {
                console.error( error );
            } );
    };

    const handleUpload = async ( event ) => {
        event.preventDefault();

        if ( file ) {
            // Set the image file in a FormData object
            const formData = new FormData();
            formData.append( 'file', file, file.name );

            // Send the FormData object as the request body in the POST request
            const response = await axios
                .post( `${process.env.REACT_APP_BACKEND}/file/post`, formData )
            setJsonResponse( response.data );
            while ( !jsonResponse.file_id ) {
                await new Promise( ( resolve ) => setTimeout( resolve, 100 ) );
            }
        }
    };

    return (

        //  Info Alert Div
        <div class="container mx-auto px-4">
            <div class="justify-center flex p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800" role="alert">
                <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Info</span>
                <div>
                    <span class="font-medium">Info alert!</span> Please Upload One or More 990 Form Images by Clicking on the Section Below.
                </div>
            </div>

            {/* Header Section */}
            <div class="mt-40">
                <div class="justify-center flex">
                    <h1 class="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white">Select <mark class="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">990 Form</mark> to be uploaded</h1>
                </div>
                <div class="justify-center flex">
                    <p class="px-4 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">You can Upload one or more JPEG iamge files of 990 form by clicking the Button Below. Why wait? Let's get this started!</p>
                </div>
            </div>

            {/* Tailwind LogIn Components */}
            <div class="container lg:px-64 mt-20 shadow dark:bg-slate-500 rounded-lg px-4 py-4">
                <form onSubmit={handleSubmit}>
                    <div class="mb-6">
                        <label htmlFor="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" onChange={handleEmailChange} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                    </div>
                    <div class="mb-6">
                        <label htmlFor="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={handlePasswordChange} />
                    </div>
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign In</button>
                </form>
            </div>

            <div class="flex justify-center">
                {/* Select Image Button */}
                <div class="my-32">
                    <div class="justify-center flex">
                        <button type="button" onClick={handleFileSelect} class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Select Image</button>
                    </div>
                </div>


                {/* Upload Image Button */}
                <div class="my-32">
                    <div class="justify-center flex">
                        <button type="button" onClick={handleUpload} class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Upload Image</button>
                    </div>
                </div>

                {/* Json Response Button */}
                <div class="my-32">
                    <div class="justify-center flex">
                        <button type="button" onClick={handleGetJson} class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get Json</button>
                    </div>
                </div>
            </div>

        </div>



    );
}

export default UploadPage;