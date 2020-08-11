var db = require('./connection');

function show(req, res, next) {
  db.many("SELECT data.*, board.* FROM data, board WHERE board.board_id = data.board_id ORDER BY data_id DESC")
    .then(function (data) {
      res.data = data;
      next();
    })
    .catch(function (err) {
      next();
    });
}

function create(req, res, next) {
  req.body.admin_id = parseInt(req.body.admin_id);
  req.body.board_id  = parseInt(req.body.board_id);
  db.result(
    "insert into data(admin_id, board_id, no_container, no_invoice, product, qty, remark, customer, destination, status)" +
    "values(${admin_id}, ${board_id}, ${no_container}, ${no_invoice}, ${product}, ${qty}, ${remark}, ${customer}, ${destination}, '0')", req.body)
    .then(function (result) {
      console.log(result);
      res.redirect('/cms/data');
    })
    .catch(function (err) {
      console.log(err);
      res.redirect('/cms/data');
    });
}

function edit(req, res, next) {
  var dataID = parseInt(req.params.id);
  db.one('SELECT * FROM data WHERE data_id=$1 ORDER BY data_id ASC', dataID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'ok',
          data_id: data.data_id,
          admin_id: data.admin_id,
          board_id: data.board_id,
          no_container: data.no_container,
          no_invoice: data.no_invoice,
          product: data.product,
          qty: data.qty,
          remark: data.remark,
          customer: data.customer,
          destination: data.destination,
          message: 'Retrived Info'
        });
    })
    .catch(function (err) {
      next();
    });
}

function update(req, res, next) {
  db.result('update data set admin_id=$1, board_id=$2, no_container=$3, no_invoice=$4, product=$5, qty=$6, remark=$7, customer=$8, destination=$9 where data_id=$10',
    [ parseInt(req.body.admin_id),
      parseInt(req.body.board_id),
      req.body.no_container,
      req.body.no_invoice,
      req.body.product,
      req.body.qty,
      req.body.remark,
      req.body.customer,
      req.body.destination,
      parseInt(req.body.id)])
    .then(function (result) {
      res.redirect('/cms/data');
    })
    .catch(function (err) {
      res.redirect('/cms/data');
    });
}

function status(req, res, next) {
  db.result('UPDATE data SET status=$1 WHERE data_id=$2',
    [ req.params.status,
      parseInt(req.params.id)])
    .then(function (result) {
      console.log(result);
      res.status(200)
        .json({
          status: 'ok',
          message: 'Data status has been changed'
        });
    })
    .catch(function (err) {
      console.log(err);
      next();
    });
}

function remove(req, res, next) {
  var dataID = parseInt(req.params.id);
  db.result('delete from data where data_id = $1', dataID)
    .then(function (result) {
      if(result.rowCount >= 1){ data = 'success'; } else { data = 'fail';}
      res.status(200)
        .json({
          affected: result.rowCount,
          status: 'success',
          data: data,
          message: `Removed ${result.rowCount} data`
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function multiremove(req, res, next) {
  var arpost = req.params.id.split(',').map(Number);
  db.result('delete from data where data_id IN ($1:csv)', [arpost])
    .then(function (result) {
      if(result.rowCount >= 1){ data = 'success'; } else { data = 'fail';}
      res.status(200)
        .json({
          affected: result.rowCount,
          status: 'success',
          data: data,
          message: `Removed ${result.rowCount} data`
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function data_show(req, res, next) {
  var boardID = req.params.id;
  db.many("SELECT data.*, board.* FROM data, board WHERE board.board_id = data.board_id AND board.board_id=$1 ORDER BY data_id DESC", boardID)
    .then(function (data) {
      res.data = data;
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
  status      : status,
  remove      : remove,
  multiremove : multiremove,
  data_show  : data_show
};
