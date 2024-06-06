var sqlite3 = require('sqlite3');
var mkdirp = require('mkdirp');
const bcrypt = require('bcrypt')

mkdirp.sync('var/db');

var db = new sqlite3.Database('var/db/user.db');

db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS users( \
    id INTEGER PRIMARY KEY, \
    username TEXT UNIQUE, \
    hashed_password BLOB, \
    salt BLOB, \
    name TEXT, \
    email TEXT UNIQUE \
    )");

    db.get("SELECT * FROM users", async function(err, row) {
        if (err) {
          console.error(err.message);
          return;
        }

        if (!row) {
          console.log("Nobody found")
          const username = 'easing_user';
          const password = 'password';
          const name = 'Easing user';
          const email = 'easing@easing.com';

          const salt = parseInt(process.env.salt_rounds);
          //const salt = 8;


          const hashedPassword = await bcrypt.hash(password, salt)

          console.log(hashedPassword)
    
          db.run("INSERT INTO users (username, hashed_password, salt, name, email) VALUES (?, ?, ?, ?, ?)",
            [username, hashedPassword, salt, name, email], function(err) {
              if (err) {
                console.error(err.message);
                return;
              }
    
              db.get("SELECT * FROM users WHERE id = ?", [this.lastID], function(err, user) {
                if (err) {
                  console.error(err.message);
                  return;
                }
            //    console.log(user);
              });
            });
        } else {
        //  console.log(row);
        }
      });
    });

module.exports = db;
