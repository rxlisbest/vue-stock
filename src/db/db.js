var sqlite3 = ''
const path = ''
let dbPath = ''
// let dbPath = 'db.db'
console.log(dbPath)
export default {
  sqlite3: sqlite3,
  dbPath: dbPath,
  run: function (sql, callback) {
    var db = new this.sqlite3.Database(dbPath)
    db.serialize(function () {
      db.run(sql, callback)
    })
    db.close()
  },
  all: function (sql, callback) {
    var db = new this.sqlite3.Database(dbPath)
    db.all(sql, callback)
    db.close()
  },
  get: function (sql, callback) {
    var db = new this.sqlite3.Database(dbPath)
    db.get(sql, callback)
    db.close()
  }
}
