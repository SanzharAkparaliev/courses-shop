const {Router} = require('express')
const Course = require('../models/course')
const router = Router()
const auth = require('../middleware/auth')
const {courseValidators} = require('../utils/validators')
const {validationResult} = require('express-validator')


router.get('/', async (req, res) => {
  const courses = await Course.find()
  res.render('courses', {
    title: 'Курсы',
    isCourses: true,
    courses
  })
})

router.get('/:id/edit',auth ,async (req, res) => {
    if (!req.query.allow) {
    return res.redirect('/')
  }
  
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(422).render('add',{
      title: 'Добавить курс',
      isAdd: true,
      error:errors.array()[0].msg,
      data:{
        title:req.body.title,
        price:req.body.price,
        img:req.body.img
      }
    })
  }

  const course = await Course.findById(req.params.id)

  res.render('course-edit', {
    title: `Редактировать ${course.title}`,
    course
  })
})

router.post('/edit',auth,courseValidators, async (req, res) => {
  const errors = validationResult(req) 
 const {id} = req.body

  if(!errors.isEmpty()){
    return res.status(422).redirect(`/courses/${id}/edit?allow=true`)
  }

  delete req.body.id
  await Course.findByIdAndUpdate(id,req.body)
  res.redirect('/courses')
})

router.get('/:id',auth, async (req, res) => {
  const course = await Course.findById(req.params.id)
  res.render('course', {
    layout: 'empty',
    title: `Курс ${course.title}`,
    course
  })
})

router.post('/remove',auth, async(req,res) => {
  try {
    await Course.deleteOne({_id:req.body.id})
    res.redirect('/courses')
  } catch (er) {
    console.log(er)
  }
  
})

module.exports = router