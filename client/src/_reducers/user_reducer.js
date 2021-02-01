import {
    LOGIN_USER,
    AUTH_USER,
    REGISTER_USER
} from '../_actions/types';


export default function (state = {}, action) { // 전스테이트 값과 액션을 인자로 받습니다.
    switch (action.type) { // 전달받는 키에 따라서 다른 구절을 실행
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload} // loginSuccess는 서버에서 받아온것임 서버의 index.js의 로그인 부분 loginSuccess 반환 값 참조
            break;

        case REGISTER_USER:
            return { ...state, register: action.payload}

        case AUTH_USER:
            return { ...state, userData: action.payload}
        
        default:
            return state;
    }
}  