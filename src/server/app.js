'use strict'

const express = require('express')

const app = express()

const port = 3000

app.use(express.static('dist'))

app.get('/', function (req, res) {
  res.send('this should be visible!')
})

app.listen(port, () => {
  console.log(`Express started on http://localhost:${port}`)
})
