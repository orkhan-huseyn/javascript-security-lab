import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', function (req, res) {
  res.sendFile(path.resolve('public', 'index.html'))
})

app.get('/login', function () {})

app.post('/login', function (req, res) {})

app.post('/transfer', function (req, res) {})

app.listen(8080, function () {
  console.log('Express server is running on port 8080')
})
