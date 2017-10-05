const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const auth = require('./routes/auth')
const constants = require('./common/constants')

const app = express()

function init() {
  app.set('views', __dirname + '/client/views')
  app.set('view engine', 'pug')
  app.use(bodyParser.json())
  app.use(express.static(__dirname + '/client/styles'))

  app.get('/', (req, res) => {
    console.log(process.env.REDIRECT_URI || "http://localhost:4000/profile.html")
    res.render('index',
      {
        clientid: process.env.INSTAGRAM_CLIENTID,
        redirectUri: process.env.REDIRECT_URI || "http://localhost:4000/profile.html"
      })
  })
  app.get('/profile.html', (req, res) => {
    res.render('profile')
  })
  app.post('/api/auth/', auth.post)

  app.use((req, res) => {
    res.status(constants.http.notFound).send({ message: 'Resource not found' })
  })

  app.set('port', process.env.PORT || 4000)
  http.createServer(app).listen(process.env.PORT || 4000)
}

module.exports = {
  init: init
}