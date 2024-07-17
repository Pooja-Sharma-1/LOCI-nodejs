var express = require('express');
var router = express.Router();
const userModel=require('./users');
const passport = require('passport');
const localStrategy=require('passport-local')

passport.use(new localStrategy(userModel.authenticate()))

/* GET home page. */
function isLoggedIn(req,res,next){
if(req.isAuthenticated()){
  return next();
}
else{
  res.redirect("/login")
}
}
router.get('/',isLoggedIn, function(req, res, next) {
  res.render('profile', { title: 'Express' });
});

router.post('/register',(req,res,next)=>{
  var newUser=new userModel({
    username:req.body.username,
    email:req.body.email,
    mobileNo:req.body.mobileNo
  })
  userModel.register(newUser,req.body.password)
  .then(function(){
    passport.authenticate("local")(req,res,function(){
      res.redirect('/profile')
    })
  })
})

router.get('/register',(req,res,next)=>{
  res.render('register')
})

router.post('/login',passport.authenticate('local',{
  successRedirect:'/profile',
  failureRedirect:'/login'
}),function(req,res){})

router.get('/login',(req,res,next)=>{
  res.render('login')
})

router.get('/profile',isLoggedIn,(req,res,next)=>{
  res.render('profile')
})


router.get('/men',(req,res,next)=>{
  res.render('men')
})
router.get('/women',(req,res,next)=>{
  res.render('women')
})
router.get('/watch',(req,res,next)=>{
  res.render('watch')
})
router.get('/bags',(req,res,next)=>{
  res.render('bags')
})
router.get('/kid',(req,res,next)=>{
  res.render('kid')
})
router.get('/shoe',(req,res,next)=>{
  res.render('shoe')
})
router.get('/sunglasses',(req,res,next)=>{
  res.render('sunglasses')
})
router.get('/jewellery',(req,res,next)=>{
  res.render('jewellery')
})




router.get("logout",function(req,res){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
})



module.exports = router;
