const express = require('express');
const router = express.Router();
const authRoute = require('./routes/auth');
const app = express();

router.use(require('./user'));
app.use('/user', authRoute);


module.exports = router;