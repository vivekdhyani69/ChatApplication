const express = require('express');
const router = express.Router();

router.get('/', function (req, res){
    res.send("Server is set Up and running")
})
module.exports = router 