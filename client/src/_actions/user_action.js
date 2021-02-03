// 로그인 액션을 취해주기 위한 파일
import {
    LOGIN_USER,
    AUTH_USER,
    REGISTER_USER
} from './types'

import axios from 'axios' 

export function loginUser(dataToSubmit) {
    const request = axios.post('/api/users/login', dataToSubmit).then(response => response.data ) // 일단 서버로 리퀘스트를 날려줍니다. 그 뒤 response 즉 서버에서 받은 데이터를 request에 저장 

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {
    const request = axios.post('/api/users/register', dataToSubmit).then(response => response.data ) // 일단 서버로 리퀘스트를 날려줍니다. 그 뒤 response 즉 서버에서 받은 데이터를 request에 저장 

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function auth() {
    const request = axios.get('/api/users/auth').then(response => response.data ) // 일단 서버로 리퀘스트를 날려줍니다. 그 뒤 response 즉 서버에서 받은 데이터를 request에 저장 

    return {
        type: AUTH_USER,
        payload: request
    }
}