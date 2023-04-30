import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Protected ( { children } ) {
    const { user_id, session_id } = useSelector( ( state ) => state.auth )

    if ( !user_id && !session_id ) {
        console.log( 'redirected to the homepage' )
        return <Navigate to="/" replace />
    }
    return children
}
export default Protected
