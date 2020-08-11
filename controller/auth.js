var db = require('./connection');

function checkLogin(req, res, next) {
  if (req.session && req.session.admin_id) {
    res.session_info = req.session;
    return next();
  } else {
    res.redirect('/cms/login');
  }
}

function login(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  db.one("select admin_id, admin_name, username from admin where username=$1 AND password=crypt($2, password) AND status_activation='1'", [username, password])
    .then(function (data) {
      req.session.admin_id = data.admin_id;
      req.session.admin_name = data.admin_name;
      req.session.username = data.username;
      res.status(200)
        .json({
          status: 'success',
          count: data.length,
          message: 'Login successfully',
          data: data
        });
    })
    .catch(function (err) {
      if(username == "")
        {res.status(404).json({ status: 'error', count: 0, message: 'Username kosong' });}
      else if(password == "")
        {res.status(404).json({ status: 'error', count: 0, message: 'Password kosong' });}
      else
        {res.status(404).json({ status: 'error', count: 0, message: 'Akun Tidak Terdaftar' });}
    });
}

function register(req, res, next) {
  db.result(
      "insert into admin(admin_name, username, password, role, status_activation)" +
      "values(${admin_name}, ${username}, crypt(${password}, gen_salt('md5')), 1, 0)",
    req.body)
    .then(function (result) {
      if(result.rowCount >= 1){ data = 'success'; } else { data = 'fail';}
      res.status(200).json({
        status: 'success',
        data: data,
        message: `Registration ${result.rowCount} admin successfully`
      });
    })
    .catch(function (err) {
      return res.status(409).json({ status: 'error', count: 0, message: 'Duplicate Data' });;
    });
}

function edit(req, res, next) {
  var adminID = parseInt(req.params.id);
  db.one('SELECT * FROM admin WHERE admin_id=$1', adminID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'ok',
          admin_id: data.admin_id,
          admin_name: data.admin_name,
          username: data.username,
          message: 'Retrived Info'
        });
    })
    .catch(function (err) {
      next();
    });
}

function update(req, res, next) {
  db.result("UPDATE admin SET admin_name=$1, username=$2 WHERE admin_id=$3",
    [ req.body.admin_name,
      req.body.username,
      parseInt(req.body.id)])
    .then(function (result) {
      req.session.admin_id = req.body.id;
      req.session.admin_name = req.body.admin_name;
      req.session.username = req.body.username
      res.redirect('/cms/account');
    })
    .catch(function (err) {
      res.redirect('/cms/account');
    });
}

function update_password(req, res, next) {
  db.result("UPDATE admin SET password=crypt($1, gen_salt('md5')) WHERE password=crypt($2, password) AND admin_id=$3",
    [ req.body.password_new,
      req.body.password_old,
      parseInt(req.body.id)])
    .then(function (result) {
      res.redirect('/cms/account');
    })
    .catch(function (err) {
      res.redirect('/cms/account');
    });
}

function logout(req, res, next) {
  if (req.session) {
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/cms/login');
      }
    });
  }
  else {
    res.redirect('/cms/login');
  }
}


module.exports = {
  checkLogin : checkLogin,
  login    : login,
  register : register,
  edit     : edit,
  update   : update,
  update_password   : update_password,
  logout   : logout
};
