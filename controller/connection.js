var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = process.env.DATABASE_URL || "postgres://postgres:mypassword@127.0.0.1:5432/db_power_sign";
var db = pgp(connectionString);

module.exports = db
