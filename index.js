'use strict'
const fs = require('fs')
const express = require('express')
const app = express()
// const path = require('path')
const data = fs.readFileSync('weather.json')
const Weather = require('./weatherClass')
const obj = new Weather(data)

app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.send(obj.getall())
})
.get('/getone/:location', (req, res) => {
  if (!obj.isExist(req.params.location)) {
    res.status(400).json({ msg: `w pliku json nie ma danego  : ${req.params.location}` })
  } else {
    res.json(obj.get(req.params.location))
  }
})
  .post('/', (req, res) => {
    if (!obj.validateData(req.body.location, req.body.temperature, req.body.humidity, req.body.pressure)) {
      res.status(400).json({ msg: 'Dane są niepoprawne !' })
      console.log("Request został odrzucony: Dane niepoprawne")
    } else {
      res.send(req.body); fs.writeFileSync('weather.json', obj.post(req.body.location, req.body.temperature, req.body.humidity, req.body.pressure))
    }
  })

  .delete('/', (req, res) => {
    if (!obj.isExist(req.body.location)) {
      res.status(400).json({ msg: `w pliku json nie ma danego miasta : ${req.body.location}` })
    } else {
      fs.writeFileSync('weather.json', obj.deleteData(req.body.location))
      res.json(obj.getall())
    }
  })
app.listen(3000, () => console.log('Started server at http://localhost:3000!'))
module.exports = { app, fs, obj, data}
// app.get('/post', (req, res) => { res.sendFile('mainPage.html', { root: path.join(__dirname, '../projekt_JS4') }) })
