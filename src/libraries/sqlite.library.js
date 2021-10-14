const sqlite3 = require('sqlite3').verbose()

class SqliteLibrary {
  constructor (database) {
    this.dbName = database
  }

  connect () {
    if (!SqliteLibrary.db) {
      SqliteLibrary.db = new sqlite3.Database(this.dbName)
    }
    return SqliteLibrary.db
  }

  async where (query, values) {
    const db = this.connect()
    return new Promise((resolve, reject) => {
      db.all(query, values, (err, rows) => {
        if (err) return reject(err)
        return resolve(rows)
      })
    })
  }

  async run (query, values) {
    const db = this.connect()
    return new Promise((resolve, reject) => {
      db.run(query, values, (err) => {
        if (err) return reject(err)
        console.log('====>', this.changes)
        return resolve(true)
      })
    })
  }
}

module.exports = SqliteLibrary
