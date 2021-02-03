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

                // 로그인이 이루어지지 않은 상황
                if(!response.payload.isAuth) {
                    // 옵션이 트루인 페이지에 들어갈 때 즉 로그인이 필요한 부분에 접속할 때 로그인 창으로 푸쉬해줍니다. 
                    if(option) {
                        props.history.push("/login")
                    } 
                } else { // 로그인이 이루어진 상황
                    if(adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    } else {
                        if(!option) {
                            props.history.push('/')
                        }
                    }
                }
            })
            
            
        }, [])
        
        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}