const express = require('express')
const handlebars = require('express-handlebars')
const {engine} = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose').default
const admin = require('./routes/admin')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')

const app = express()

//Config

    //Session
        app.use(session({
            secret: '123',
            resave: true,
            saveUninitialized: true,
        }))

        app.use(flash())
    //Middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash('success_msg')
            res.locals.error_msg = req.flash('error_msg')
            next()
        })
    //body Parser
        app.use(express.urlencoded({ extended: true}))
        app.use(express.json())

    //Handlebars
        app.engine('handlebars', engine())
        app.set('view engine', 'handlebars')

    //Mongoose
        mongoose.Promise = global.Promise
        mongoose.connect('mongodb://localhost/blogapp').then(() => {
            console.log('Conectado ao Mongo')
        }).catch((e) => {
            console.log(e)
        })

    //Public
        app.use(express.static(path.join(__dirname, 'public')))

        app.use((req, res, next) => {
            console.log('Middleware')
            next()
        })

//Routes
    app.use('/admin', admin)

//Others
const PORT = 8081
app.listen(PORT, () => {
    console.log('Server is running!')
})
