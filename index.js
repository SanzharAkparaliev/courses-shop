const express = require('express')
const path = require('path')
const csrf = require('csurf')
const flash = require('connect-flash')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const homeRoutes = require('./routes/home')
const cardRoutes = require('./routes/card')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const ordersRoutes = require('./routes/orders')
const authRoutes = require('./routes/auth')
const mongoose =require('mongoose')
const varMiddleware = require('./middleware/veriabls')
const UserMiddleware = require('./middleware/user')

const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

const store = new MongoStore({
  collection:'session',
  uri:'mongodb://localhost/nodeshop'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret:'some secret value',
  resave:false,
  saveUninitialized:false,
  store:store
}))
app.use(csrf())
app.use(flash())
app.use(varMiddleware)
app.use(UserMiddleware)

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)
app.use('/orders',ordersRoutes)
app.use('/auth',authRoutes)


const PORT = process.env.PORT || 4000

// database connection
async function start(){
  try {
     const Mongo_url = 'mongodb://localhost/nodeshop'
      mongoose.connect(Mongo_url)
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
      })

  } catch (err) {
    console.log(err)
  }



}

start( )




