const express = require('express')
const handlebars = require('express-handlebars')
const {engine} = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

//Config
    //body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())

    //Handlebars
        app.engine('handlebars', engine())
        app.set('view engine', 'handlebars')
//Routes


//Others
const PORT = 8081
app.listen(PORT, () => {
    console.log('Server is running!')
})
