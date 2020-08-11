var db = require('./connection');

function show(req, res, next) {
  db.many("SELECT admin.*, (SELECT COUNT(data.admin_id) FROM data WHERE data.admin_id = admin.admin_id) AS total_entry FROM admin WHERE admin.admin_id != 1 ORDER BY admin.admin_id ASC")
    .then(function (admin) {
      res.admin = admin;
      next();
    })
    .catch(function (err) {
      next();
    });
}

function create(req, res, next) {
  req.body.role = parseInt(req.body.role);
  req.body.status_activation  = parseInt(req.body.status_activation);
  db.result(
      "insert into admin(admin_name, username, password, role, status_activation)" +
      "values(${admin_name}, ${username}, crypt(${password}, gen_salt('md5')), ${role}, ${status_activation})",
    req.body)
    .then(function (result) {
      console.log(result);
      res.redirect('/cms/admin');
    })
    .catch(function (err) {
      console.log(err);
      res.redirect('/cms/admin');
    });
}

function edit(req, res, next) {
  var adminID = parseInt(req.params.id);
  db.one('SELECT * FROM admin WHERE admin_id=$1 ORDER BY admin_id ASC', adminID)
    .then(function (admin) {
      res.status(200)
        .json({
          status: 'ok',
          admin_id: admin.admin_id,
          admin_name: admin.admin_name,
          username: admin.username,
          role: admin.role,
          status_activation: admin.status_activation,
          message: 'Retrived Info'
        });
    })
    .catch(function (err) {
      next();
    });
}

function update(req, res, next) {
  db.result("UPDATE admin SET admin_name=$1, username=$2, password=crypt($3, gen_salt('md5')), role=$4, status_activation=$5 WHERE admin_id=$6",
    [ req.body.admin_name,
      req.body.username,
      req.body.password,
      req.body.role,
      req.body.status_activation,
      parseInt(req.body.id)])
    .then(function (result) {
      res.redirect('/cms/admin');
    })
    .catch(function (err) {
      res.redirect('/cms/admin');
    });
}

function status(req, res, next) {
  db.result('UPDATE admin SET status_activation=$1 WHERE admin_id=$2',
    [ req.params.status,
      parseInt(req.params.id)])
    .then(function (result) {
      console.log(result);
      res.status(200)
        .json({
          status: 'ok',
          message: 'Admin status has been changed'
        });
    })
    .catch(function (err) {
      console.log(err);
      next();
    });
}

function remove(req, res, next) {
  var adminID = parseInt(req.params.id);
  db.result('delete from admin where admin_id = $1', adminID)
    .then(function (result) {
      if(result.rowCount >= 1){ admin = 'success'; } else { admin = 'fail';}
      res.status(200)
        .json({
          affected: result.rowCount,
          status: 'success',
          admin: admin,
          message: `Removed ${result.rowCount} admin`
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function multiremove(req, res, next) {
  var arpost = req.params.id.split(',').map(Number);
  db.result('delete from admin where admin_id IN ($1:csv)', [arpost])
    .then(function (result) {
      if(result.rowCount >= 1){ admin = 'success'; } else { admin = 'fail';}
      res.status(200)
        .json({
          affected: result.rowCount,
          status: 'success',
          admin: admin,
          message: `Removed ${result.rowCount} admin`
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  show        : show,
  create      : create,
  edit        : edit,
  update      : update,
  status      : status,
  remove      : remove,
  multiremove : multiremove
};
