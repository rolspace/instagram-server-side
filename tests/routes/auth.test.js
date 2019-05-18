const sinon = require('sinon')
const request = require('request')
const authRoute = require('../../src/routes/auth')

describe('Auth Route', () => {
  describe('/POST authorization', () => {
    let res

    beforeEach(() => {
      res = {
        send: sinon.stub().returnsThis(),
        status: sinon.stub().returnsThis()
      }
    })

    it('responds with a 422 http status code if the request body is empty', () => {
      let req = {}

      authRoute.post(req, res)

      sinon.assert.calledWith(res.status, 422)
    })

    it('responds with a 500 http status code if the OATH Token request fails', () => {
      let req = {
        body: {
          'code': 'some_code'
        }
      }

      const requestStub = sinon.stub(request, 'post').yields('some error', null, null)

      authRoute.post(req, res)

      requestStub.restore()

      sinon.assert.calledWith(res.status, 500)
    })

    it('responds with a 200 http status code if the OATH Token request is successful', () => {
      let req = {
        body: {
          'code': 'some-code'
        }
      }

      let oathBody = '{ "access_token": "some_token", "user": { "id": "some_id", "username": "some_username" } }'

      const requestStub = sinon.stub(request, 'post').yields(null, { statusCode: 200, body: oathBody }, oathBody)

      authRoute.post(req, res)

      requestStub.restore()

      sinon.assert.calledWith(res.status, 200)
    })

    it('responds with the same http status code of the OATH Token request if it does not return a 200 response', () => {
      let req = {
        body: {
          'code': 'some-code'
        }
      }

      const requestStub = sinon.stub(request, 'post').yields(null, { statusCode: 400 }, null)

      authRoute.post(req, res)

      requestStub.restore()

      sinon.assert.calledWith(res.status, 400)
    })
  })
})
