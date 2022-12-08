//  @ts-check

const connection = require('./mysqlConnect');

const db = {
  getUser: (userId, cb) => {
    connection.query(
      `SELECT * FROM user WHERE USERID = '${userId}';`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
};

module.exports = db;
