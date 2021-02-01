import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../../_actions/user_action'

function RegisterPage(props) {

    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("") // input에 집어넣는 값이 state로 해주기 위함 , 괄호는 InitialState로 처음에는 빈칸임
    const [Password, setPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")


    const dispatch = useDispatch()

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value); 
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value); 
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value); 
    }

    const onconfirmPasswordHandler = (event) => {
        setconfirmPassword(event.currentTarget.value); // 변하는 값을 받아줍니다. 
    }

    const onSubmitHandler = (event) => {
        if(Password !== confirmPassword) {
            return alert('비밀번호가 다릅니다.')
        }
    }


    let body ={ 
        email : Email,
        password : Password,
        name: Name
    }

    dispatch(registerUser(body))
        .then(response => {
            if(response.payload.success) {
                props.history.push('/login')
            } else {
                console.log(response.payload.success)
                alert('Error')
            }
        })


    return (
        <div style = {{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}>
                <label>Email</label>
                <input type='email' value={Email} ondChange={onEmailHandler}/>
                <label>이름</label>
                <input type='text' value={Name} ondChange={onNameHandler}/>
                <label>비밀번호</label>
                <input type='password' value={Password} ondChange={onPasswordHandler}/>
                <label>비밀번호 확인</label>
                <input type='password2' value={confirmPassword} ondChange={onconfirmPasswordHandler}/>
            </form>
            <button type='submit' onclick={onSubmitHandler}>회원 가입</button>
        </div>
    )
}

export default withRouter(RegisterPage)
