const express = require('express');
const router  = express.Router();

router.get('/explore', (req, res, next) => {
    res.render('../views/explore.ejs');
});

module.exports = router;
