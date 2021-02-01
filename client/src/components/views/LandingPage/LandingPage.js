import React,{useEffect} from 'react'; // 아래에 정의해준 함수를 여기 넣어야지만 작동했습니다. 왜인지는 정확하게 모르겠지만 일단은 그렇습니다. 
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function LandingPage(props) {

    const onClickHandler = () => {
        axios.get(`/api/users/logout`)
            .then(response => {
                if(response.data.success) {
                    props.history.push('/login')
                } else {
                    alert('로그아웃 하는데 실패했습니다.')
                }
            })
    }

    useEffect(() => {
        axios.get('/api/hello')
        .then(response => console.log(response.data))
    }, [])

    return (
        <div style = {{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <h2> 시작 페이지 </h2>
        <button onClick={onClickHandler}>로그아웃</button>
        </div>
    )
}

export default withRouter(LandingPage)
