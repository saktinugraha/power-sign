var db = require('./connection');

function show(req, res, next) {
  db.many('SELECT board.*, (SELECT COUNT(data.data_id) FROM data WHERE data.board_id = board.board_id) AS total_data FROM board ORDER BY board_name ASC')
    .then(function (data) {
      res.board = data;
      next();
    })
    .catch(function (err) {
      next();
    });
}

function create(req, res, next) {
  db.result(
      'insert into board(board_name, board_desc, running_text, alert_text)' +
      'values(${board_name}, ${board_desc}, ${running_text}, ${alert_text})',
    req.body)
    .then(function (result) {
      res.redirect('/cms/board');
    })
    .catch(function (err) {
      res.redirect('/cms/board');
    });
}

function edit(req, res, next) {
  var boardID = parseInt(req.params.id);
  db.one('SELECT * FROM board WHERE board_id=$1 ORDER BY board_id ASC', boardID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'ok',
          board_id: data.board_id,
          board_name: data.board_name,
          board_desc: data.board_desc,
          running_text: data.running_text,
          alert_text: data.alert_text,
          message: 'Retrived Info'
        });
    })
    .catch(function (err) {
      next();
    });
}

function update(req, res, next) {
  db.result('update board set board_name=$1, board_desc=$2, running_text=$3, alert_text=$4 where board_id=$5',
    [ req.body.board_name,
      req.body.board_desc,
      req.body.running_text,
      req.body.alert_text,
      parseInt(req.body.id)])
    .then(function (result) {
      res.redirect('/cms/board');
    })
    .catch(function (err) {
      res.redirect('/cms/board');
    });
}

function remove(req, res, next) {
  var boardID = parseInt(req.params.id);
  db.result('delete from board where board_id = $1', boardID)
    .then(function (result) {
      if(result.rowCount >= 1){ data = 'success'; } else { data = 'fail';}
      res.status(200)
        .json({
          affected: result.rowCount,
          status: 'success',
          data: data,
          message: `Removed ${result.rowCount} board`
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function multiremove(req, res, next) {
  var arpost = req.params.id.split(',').map(Number);
  db.result('delete from board where board_id IN ($1:csv)', [arpost])
    .then(function (result) {
      if(result.rowCount >= 1){ data = 'success'; } else { data = 'fail';}
      res.status(200)
        .json({
          affected: result.rowCount,
          status: 'success',
          data: data,
          message: `Removed ${result.rowCount} board`
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function board_show(req, res, next) {
  var boardID = req.params.id;
  db.many("SELECT board.* FROM board WHERE board.board_id=$1", boardID)
    .then(function (board) {
      res.board = board;
      next();
    })
    .catch(function (err) {
      next();
    });
}

module.exports = {
  show        : show,
  create      : create,
  edit        : edit,
  update      : update,
  remove      : remove,
  multiremove : multiremove,
  board_show  : board_show,
};
