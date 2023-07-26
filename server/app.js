const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const cors = require('cors')
const path = require('path')
const initDatabase = require('./startUp/initDatabase')
const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  cors({
    origin: ['https://fast-company-frontend.vercel.app'],
    credentials: true,
  })
)

app.use('/api', routes)

const PORT = config.get('port') ?? 8080

// if (process.env.NODE_ENV === 'production') {
//   console.log('Production')
// } else {
//   console.log('Development')
// }

//Docker
// if (process.env.NODE_ENV === 'production') {
//   app.use('/', express.static(path.join(__dirname, 'client')))

//   const indexPath = path.join(__dirname, 'client', 'index.html')

//   app.get('*', (req, res) => {
//     res.sendFile(indexPath)
//   })
// }

if (process.env.NODE_ENV === 'production') {
  const path = require('path')
  app.use(express.static(path.resolve(__dirname, 'client', 'build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'), function (err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })
}

async function start() {
  try {
    mongoose.connection.once('open', () => {
      initDatabase()
    })
    await mongoose.connect(config.get('mongoUri'))
    console.log(chalk.green(`MongoDB connected.`))
    app.listen(PORT, () => console.log(chalk.green(`Server has been started on port ${PORT}...`)))
  } catch (e) {
    console.log(chalk.red(e.message))
    process.exit(1)
  }
}

start()
