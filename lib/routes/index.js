const express = require("express");
const router = express.Router();

router.use(require("./recipe"));
router.use(require("./ingredient"));
router.use(require("./fridge"));

module.exports = router;
