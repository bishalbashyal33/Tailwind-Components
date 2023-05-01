import { useState, useEffect } from 'react'
import axios from "axios"
import SerType from '../dashboardcomponents/servicetype'

const apiStatus = {
    "Google Drive": {
        "status": true,
        "img": "https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png",
        "detail": "https://drive.google.com/drive/folders/1UIdXm5wPXzBcRUZuVpjOG2Om0cn0slWf",
        "header": "Your Extracted Json are stored in the URL",
    },
    "Mail Server": {
        "status": true,
        "detail": "aayushshah@gmail.com",
        "header": "Your mailing address for services is",
        "img": "https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png"
    },
    "Developers Documentation": {
        "status": true,
        "detail": "http://docbite.com/developer/docs",
        "header": "Your Extracted Json are stored in the URL",
        "img": "https://styles.redditmedia.com/t5_22y58b/styles/communityIcon_r5ax236rfw961.png"
    }
}
function APIService ( props ) {
    const [api, setApi] = useState( {} )
    const handleServiceStatus = ( serviceName ) => {
        axios
            .post(
                `${process.env.REACT_APP_BACKEND}/user/apiservices`,
                { name: serviceName },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
                { withCredentials: true }
            )
            .then( ( res ) => {
                setApi( res.data.apiservices )
            } )
            .catch( error => console.error( error ) );
    }

    useEffect( () => {
        axios( `${process.env.REACT_APP_BACKEND}/user/apiservices`, {
            method: 'GET',
            withCredentials: true,
        } )
            .then( ( res ) => {
                setApi( res.data.apiServices )
            } )
            .catch( ( err ) => {
                console.log( err )
            } )
    }, [] )

    return (
        <div class="p-4 sm:ml-64">
            <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-8 p-4">
                {api && Object.keys( api ).map( ( key, index ) => {
                    return ( <SerType
                        key={index}
                        serviceName={key}
                        apiDetail={api[key]}
                        handleServiceStatus={handleServiceStatus}
                    /> )
                } )}
            </div>
        </div>
    )
}

export default APIService
