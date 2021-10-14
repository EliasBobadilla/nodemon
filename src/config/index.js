require('dotenv').config()
const path = require('node:path')

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  database: process.env.DATABASE || path.join(__dirname, '../../assets/database')
}

module.exports = { config }
