var express = require('express');
var router = express.Router();
var path  = require('path');

var auth = require('../controller/auth');
var admin = require('../controller/admin');
var setting = require('../controller/setting');
var master = require('../controller/master');
var data = require('../controller/data');
var board = require('../controller/board');

//auth
router.post('/auth/login', auth.login);
router.post('/auth/register', auth.register);
router.get('/auth/edit/:id', auth.edit);
router.put('/auth/update', auth.update);
router.put('/auth/update_password', auth.update_password);
router.get('/auth/logout', auth.logout);

router.get('/login', function(req, res, next) {
  res.render('cms/login');
});

router.get('/register', function(req, res, next) {
  res.render('cms/register');
});

router.get('/account', auth.checkLogin, function(req, res, next) {
  res.render('cms/account', { session_info : res.session_info });
});

//setting
router.get('/setting/edit', setting.edit);
router.put('/setting/update', setting.update);
router.get('/setting', auth.checkLogin, function(req, res, next) {
  res.render('cms/setting', { session_info : res.session_info });
});

//admin
router.get('/admin', auth.checkLogin, admin.show, function(req, res, next) {
  res.render('cms/admin', {
    session_info : res.session_info,
    admin : res.admin
  });
});
router.post('/admin/', admin.create);
router.get('/admin/:id', admin.edit);
router.put('/admin/', admin.update);
router.put('/admin/:id/:status', admin.status);
router.delete('/admin/:id', admin.remove);
router.delete('/admin/multi/:id', admin.multiremove);

//data
router.get('/', auth.checkLogin, data.show, master.select_board, function(req, res, next) {
  res.render('cms/data', {
    session_info : res.session_info,
    data : res.data,
    select_board : res.select_board
  });
});
router.get('/data', auth.checkLogin, data.show, master.select_board, function(req, res, next) {
  res.render('cms/data', {
    session_info : res.session_info,
    data : res.data,
    select_board : res.select_board
  });
});
router.post('/data/', data.create);
router.get('/data/:id', data.edit);
router.put('/data/', data.update);
router.put('/data/:id/:status', data.status);
router.delete('/data/:id', data.remove);
router.delete('/data/multi/:id', data.multiremove);

//board
router.get('/board/', auth.checkLogin, board.show, function(req, res, next) {
  res.render('cms/board', { session_info : res.session_info, board : res.board });
});
router.post('/board/', board.create);
router.get('/board/:id', board.edit);
router.put('/board/', board.update);
router.delete('/board/:id', board.remove);
router.delete('/board/multi/:id', board.multiremove);

module.exports = router;
