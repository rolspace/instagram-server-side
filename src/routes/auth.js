const request = require('request')
const constants = require('../common/constants')

function postInstagramAuth(req, res) {
  if (!req.body) {
    res.status(constants.http.unprocessable).send({ message: 'The request payload is empty' })
  }
  else {
    var form = {
      client_id: process.env.INSTAGRAM_CLIENTID,
      client_secret: process.env.INSTAGRAM_SECRET  ,
      code: req.body.code,
      grant_type: 'authorization_code',
      redirect_uri: process.env.REDIRECT_URI || "http://localhost:4000/profile.html"
    }

    request.post({ url: 'https://api.instagram.com/oauth/access_token', form: form },
      function(error, response) {
        if (error) {
          res.status(constants.http.internalError).send({ message: 'Internal server error' })
        }
        else if (response.statusCode !== constants.http.ok) {
          res.status(response.statusCode).send({ message: 'Authorization from Instagram API failed' })
        }
        else {
          res.status(constants.http.ok).send(response.body)
        }
      })
  }
}

module.exports = {
  post: postInstagramAuth
}