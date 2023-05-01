import { useState, useEffect } from 'react'
import axios from "axios"
import SerType from '../dashboardcomponents/servicetype'

function APIService ( props ) {
    const [api, setApi] = useState( [] )
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

                console.log( "Api services: ", res.data.apiservices )
                setApi( [...Object.entries( res.data.apiServices ).sort().map( ( [key, value] ) => {
                    return [key, value];
                } )] )
            } )
            .catch( error => console.error( error ) );
    }

    useEffect( () => {
        axios( `${process.env.REACT_APP_BACKEND}/user/apiservices`, {
            method: 'GET',
            withCredentials: true,
        } )
            .then( ( response ) => {
                setApi( [...Object.entries( response.data.apiServices ).sort().map( ( [key, value] ) => {
                    return [key, value];
                } )] )
            } )
            .catch( ( err ) => {
                console.log( err )
            } )
    }, [] )

    return (
        <div class="p-4 sm:ml-64">
            <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-8 p-4">
                {api && api.map( ( service, index ) => ( <SerType
                    key={index}
                    serviceName={service[0]}
                    apiDetail={service[1]}
                    handleServiceStatus={handleServiceStatus}
                /> )
                )}
            </div>
        </div>
    )
}

export default APIService

// {api && Object.keys( api ).map( ( key, index ) => ( <SerType
//     key={index}
//     serviceName={key}
//     apiDetail={api[key]}
//     handleServiceStatus={handleServiceStatus}
// /> )
// )}