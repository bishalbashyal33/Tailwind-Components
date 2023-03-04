import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
} from '../constants/loginConstant'

let nextTodoId = 0
export const userLogin = (text) => ({
    type: USER_LOGIN_REQUEST,
    id: 196,
    text: 'Aayush Shah',
})
