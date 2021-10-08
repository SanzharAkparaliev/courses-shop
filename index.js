const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const cardRoutes = require('./routes/card')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const mongoose =require('mongoose')
const User = require('./models/user')

const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(async (req,res,next) => {
  try {
     const user =  await User.findById('61605d94300a655911c42f7c')
       req.user = await  user
       next()
  } catch (error) {
  console.log(error)  
  }
 
  
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)


const PORT = process.env.PORT || 3000

// database connection
async function start(){
  try {
     const Mongo_url = 'mongodb://localhost/nodeshop'

      mongoose.connect(Mongo_url)
      const candidate =  await User.findOne()
      if(!candidate){
        const user = new User({
          email:"sanzhar@gmail.com",
          name:"sanzhar",
          cart:{items:[]}
        })
        await user.save()
      }
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
      })

  } catch (err) {
    console.log(err)
  }



}

start( )




