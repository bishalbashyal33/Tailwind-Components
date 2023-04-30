import axios from 'axios'

const register = ( username, email, password ) => {
    return axios.post( process.env.REACT_APP_BACKEND + "/api/auth/signup", {
        username,
        email,
        password,
    } )
}

const login = ( username, password ) => {
    return axios
        .post( process.env.REACT_APP_BACKEND + '/api/auth/signin', {
            username,
            password,
        } )
        .then( ( response ) => {
            if ( response.data.username ) {
                localStorage.setItem( 'user', JSON.stringify( response.data ) )
            }

            return response.data
        } )
}

const logout = () => {
    localStorage.removeItem( 'user' )
    return axios.post( process.env.REACT_APP_BACKEND + '/api/auth/signout' ).then( ( response ) => {
        return response.data
    } )
}

const getCurrentUser = () => {
    return JSON.parse( localStorage.getItem( 'user' ) )
}

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
}

export default AuthService
