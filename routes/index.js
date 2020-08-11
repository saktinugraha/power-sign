var express = require('express');
var router = express.Router();

var data = require('../controller/data');
var board = require('../controller/board');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/board/:id', data.data_show, board.board_show, function(req, res, next) {
  res.render('board/single_line', {
    data : res.data,
    board : res.board
  });
});

module.exports = router;
