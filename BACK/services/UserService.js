const db = require("../db");
const bcrypt = require("bcrypt");

exports.login = async (userLog, password, done) => {
    db.get(
        "SELECT * FROM users WHERE email = ? OR username= ?",
        [userLog, userLog],
        function (err, user) {
          if (err) return done(err);
          if (!user) {
            return done({ message: "No user found." }, null);
          }
          bcrypt.compare(
            password,
            user.hashed_password,
            function (err, isMatch) {
              if (err) return done(err);
              if (!isMatch)
                return done({ message: "Wrong password." }, null);
              return done(null, {id : user.id, name : user.name, username : user.username, email : user.email });
            }
          );
        }
      );
}
