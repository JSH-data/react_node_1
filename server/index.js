const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const { User } = require("../models/Users");
const config = require('./config/key')
const cookieParser = require('cookie-parser')
const { auth } = require("./middleware/auth")

// url 형식의 데이터를 읽어 올 수 있도록 도와줍니다. 
// json형식의 데이터를 읽어 올 수 있도록 도와줍니다. 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 쿠키에 토큰을 저장할 수 있도록 도와줍니다. 
app.use(cookieParser());

mongoose.connect(config.mongoURI, {
  useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("MongoDB Connected...")).catch(err => console.log(err))

app.get('/', (req, res) => { res.send('Hello World!') })





app.post("/api/users/register", (req,res) => {
  // 회원가입 기능을 제작합니다. 

  const user = new User(req.body)
  
  user.save((err, userInfo) => { // save는 몽고DB의 메서드입니다. 
    if(err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })

})

app.post('/api/users/login', (req, res) => {

  // 로그인시 입력한 이메일을 데이터베이스에서 있는지 확인한다. 
  
  User.findOne({ email: req.body.email }, (err, user) => {
      if(!user) {
          return res.json({
              loginSuccess: false,
              message: "제공된 이메일에 해당하는 유저가 없습니다."
          })
      }
      // 요청된 이메일이 존재한다면 입력한 비밀번호가 맞는지 확인합니다. 
      user.comparePassword( req.body.password, (err, isMatch) => {
        if(!isMatch) return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."});
      })

      // 비밀번호까지 동일하다면 토큰을 생성해줍니다. 
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err)
        
        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userID: user._id })
      })
  })
})
// role 1 어드민 2면 특정 부서 어드민 0이면 일반 유저

app.get('/api/users/auth', auth, (req, res) => {
  // next를 넘겨 미들웨어를 탈출시켜 여기까지 왔다면 Authentication이 true라는 말.
  res.status(200).json({
    _id: req.user._id, // auth에서 지정해주었기 때문에 사용이 가능한 부분입니다.
    isAdmin: req.user.role === 0 ? false: true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
    // 어떤 페이지에서든지 유저의 정보를 이용 할 수 있게됩니다. 
  })
})

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id:req.user._id }, { token: "" }, (err, user) => {
    if(err) return res.json({success : false, err });
    return res.status(200).send({ success : true })
  })
})





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});