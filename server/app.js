import express from 'express'
import bodyParser  from 'body-parser'
import middleware from 'swagger-express-middleware'
import myRouter from '../routers'
import handleErrors from '../routers/ResponseHandler.js'


const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

middleware('swagger.yaml', app, function(err, middleware) {
  app.use(
      middleware.metadata(),
      middleware.files(),
      middleware.parseRequest(),
      middleware.validateRequest()
  )
  app.use(``, myRouter);
  app.use(function(err, req, res, next) {
      if (!err.status) {
          return next(err);
      }
      res.status(err.status)
      res.json({
          error_code: 'validator',
          message: 'Thông tin không hợp lệ',
          stack_trace: err.message
      })
  })

  app.use(function(err, req, res, next) {
      handleErrors(req, res, err);
  })

  const portNum = 3000;
  app.listen(portNum, '0.0.0.0', function () {
  	console.log('Taking a shower in port:', portNum);
  })
})
