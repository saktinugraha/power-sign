var db = require('./connection');

function select_board(req, res, next) {
  db.many('SELECT * FROM board ORDER BY board_name ASC')
    .then(function (data) {
      res.select_board = data;
      next();
    })
    .catch(function (err) {
      next();
    });
}

module.exports = {
  select_board : select_board
};
