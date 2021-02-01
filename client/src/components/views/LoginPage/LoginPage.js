import axios from 'axios';
import React, {useState} from 'react'
import { useDispatch } from 'react-redux'; // 리덕스를 사용해서 서버로 전송하기 위한 액션을 취하기 위함 
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function LoginPage(props) { // props 로그인 완료시 다른 페이지로 넘기기 위해 그냥 넣어줌 뭔지 잘모르겠음
    
    const dispatch = useDispatch(); // 

    const [Email, setEmail] = useState("") // input에 집어넣는 값이 state로 해주기 위함 , 괄호는 InitialState로 처음에는 빈칸임
    const [Password, setPassword] = useState("")
    

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }

    const onPasswordHandler =(event) => {
        setPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); // 페이지가 새로고침이 되는것을 막아줍니다. 
        //console.log('Email', Email)
        //console.log('Password', Password)

        let body ={ 
            email : Email,
            password : Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess) {
                    props.history.push('/')
                } else {
                    console.log(response.payload.loginSuccess)
                    alert('Error')
                }
            })

    }

    return (
        <div style = {{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            > 
                <label>Email</label>
                <input type='email' value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type='password' value={Password} onChange={onPasswordHandler} />
                <br />
                <button type='submit'>
                    Login
                </button>
            </form>
            
        </div>
    )
}

export default withRouter(LoginPage)
