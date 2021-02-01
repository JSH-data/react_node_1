// hoc를 이용하여 사용자의 권한을 백엔드로부터 받아오는 작업 

import { auth } from '../_actions/user_action'
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'

export default function (SpecificComponent, option, adminRoute = null) {
    
    // 첫번째 인자 : 특정 모듈 페이지
    // 두번째 인자 : 접근자 옵션  null : 아무나, true : 로그인 한 사람, false : 로그인한 사람은 못들어옵니다. 
    // 세번쨔 인자 : 어드민 옵션 

    // 페이지가 이동할 때마다 권한 확인
    function AuthenticationCheck(props) {
        const dispatch = useDispatch()
        
        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response)
            })
            
            
        }, [])
        
        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}