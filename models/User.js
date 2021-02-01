const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function (next) {
    var user = this;
    if(user.isModified('password')) { // 비밀번호가 저장될때만 암호화 작업을 진행하도록 도와줍니다. 
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function (err, hash) {
                if(err) return next(error)
                user.password = hash
                next()
            })
        })
    } else {
        next() // 비밀번호가 아닌 다른 사항을 변경시 그냥 넘겨주는 역할
    }
})
// 비밀번호를 암호화 하는 방법

userSchema.methods.comparePassword = function( plainPassword, cb) {
    // plainPassword는 우리가 입력한 비밀번호 입니다. cb는 콜백 함수입니다.  
    // 비밀번호를 비교해주는 메서드를 만들어줍니다.
    // DB에 저장된 비밀번호는 암호화 되어있기 때문에 입력받은 비밀번호를 암호화 하여 비교합니다. 
    bcrypt.compare(plainPassword, this.password, function ( err, isMatch ) {
        if (err) return cb(err) // 에러가 나온다면 에러만 콜백으로 보내줍니다. 
        cb(null, isMatch) // 공식 문서 확인 결과 isMatch는 트루가 기본값이다. 
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;

    var token = jwt.sign(user._id.toHexString(), 'secretToken') 
    // user._id + secretToken = token과 같은 형식 secretToken -> user_id
    // user._id는 몽고DB에서 생성하는 고유한 id입니다. 
    // toHexString로 형변환을 실행해야지 알아먹습니다. 
    user.token = token
    user.save(function (err, user) {
        if(err) return cb(err)
        cb(null, user)
    })
};

userSchema.statics.findByToken = function (token, cb) {
    var user = this; // 여기서 애로우 펑션쓰면 안됩니다. 그렇게하면 this를 잡지 못합니다. 
    // 토큰을 decode합니다. 
    jwt.verify(token, 'secretToken', function (err, decoded) {
        // 유저 아이디를 이용하여 유저를 찾습니다.
        // 클라이언트에서 가져온 토큰과 DB에 보관된 토큰이 일치하는지 확인하여 줍니다. 
        user.findOne({ "_id": decoded, "token": token }, function (err, user) {
            if(err) return cb(err)
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }