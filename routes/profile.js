const {Router} = require('express')
const router = Router()
const auth = require('../middleware/auth')

router.get('/',async(req,res) => {
    res.render('profile',{
        title:'Профиль',
        isProfile:true,
        user:req.user.toObject()
    })
})

router.post('/',async(req,res) =>{
    
})

module.exports = router