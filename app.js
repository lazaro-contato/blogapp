const express = require('express')
const handlebars = require('express-handlebars')
const {engine} = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose').default
const admin = require('./routes/admin')
const path = require('path')

const app = express()

//Config
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

//Routes
    app.use('/admin', admin)

//Others
const PORT = 8081
app.listen(PORT, () => {
    console.log('Server is running!')
})
