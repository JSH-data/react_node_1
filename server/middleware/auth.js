const { User } = require("../../models/User");

let auth = (req, res, next) => {

    // 인증처리를 하는곳
    
    // 클라이언트 쿠키에서 토큰을 가져옵니다
    let token = req.cookies.x_auth

    // 토큰을 복호화한 후 유저를 찾는다
    // 인자를 어떻게 이렇게 줄수있는지 의문입니다.... token은 User에서 정의하지 않았습니다. 병신 정의해야지 안하면 어떡하냐 ㅉㅉ
    User.findByToken(token, (err, user) => {
        if(err) throw err; // 왜 애러를 던져줍니까?
        if(!user) return res.json({ isAuth: false, error:true })
    
        req.token = token;
        req.user = user; // 이렇게 지정해준 이유는 index에서 미들웨어가 끝나고 다양한 사용자의 정보를 바로 사용하기 위함이다. 
        next();
    })
    // 있으면 ok 없으면 no
}

module.exports = { auth };