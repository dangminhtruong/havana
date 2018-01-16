var express = require('express');
var router = express.Router();
const async = require('async');

/*------------------------------------
* Author : Dang Minh Truong
* Email : mr.dangminhtruong@gmail.com
*-----------------------------------*/

router.get('/', function(req, res, next) {
    res.render('./admin/index');
});
/*--------------------------------------------------------*/
module.exports = router;
