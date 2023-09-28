const express = require('express')
const app = express()
const port = 3000
const router = require('./routes')
const path = require('path')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(process.cwd(), 'assets')))
app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})