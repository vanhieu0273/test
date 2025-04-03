var express = require('express');
var router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../model/User.model')

/* GET users listing. */
router.get('/list', function(req, res, next) {
  console.log('req', req.query.id);
  console.log('title', req.query.title);
  
  res.send('respond with a resource');
});

router.post('/register', async (req, res, mext) => {
  try{
    //detructer thong tin tu trong body gui len
    const {firstName, lastName, email, phoneNumber, password} = req.body;

    if(!firstName || !lastName ||! phoneNumber|| !email || !password) {
      return res.status(400).json({
        msg: "chua dung dinh dang"
      })
    }

    //kiem tra ton tai cua username va email trong bang user
    const checkExitUser = await User.findOne({
      $or: [{email}, {phoneNumber}],
    });


    //neu user hoac email da ton tai se k tao tai khoan ma tra ve ma loi cho frontend
    if(checkExitUser){
      return res.status(400).json({
        msg:"username hoac email da duoc dang ki",
      });
    }

    //ma hoa mat khau
    const hashedPassword = await bcryptjs.hash(password, 10);

    //tao du lieu cho user moi
    const newUser = new User({
      firstName, 
      lastName,
      phoneNumber,
      email: email,
      password: hashedPassword,
    });

    // luu user moi vao bang
    await newUser.save();

    //tra ve thong bao tao user thanh cong 
    return res.status(201).json({
      msg:"Dang ki thanh cong ",
    });


  } catch (error) {
    //bat ke loi gi ben tren se bi thong bao loi do phia backend
    console.log("error", error);
    return res.status(500).json({
      msg: "internet Server Error",
    });
    
  }
})

router.post('/login', async (req, res) => {
  try{
    //detructor code
    const {email, password} =  req.body

    const user = await User.findOne({email});

    if (!user) {
      return res.status(400).json({
        msg: "tai khoan khong ton tai"
      })
    }

    const checkPassword = await bcryptjs.compare(password, user.password)

    if (!checkPassword) {
      return res.status(400).json({
        msg: "mat khau khong chinh xac"
      })
    }

    //tao jwt token
    const token = jwt.sign({userId: user.id}, "ashbduahs", {
      expiresIn: "1d"
    })

    const {password:PU, ...result } = user?._doc;

    return res.status(200).json({
      msg:"dang nhap thanh cong",
      token,
      user: result
    })

  } catch(error){

  }
})

module.exports = router;
