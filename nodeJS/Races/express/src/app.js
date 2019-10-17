const express = require('express');
const app = express();
const router = require('./Router');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.listen(3000, '127.0.0.1');
router(app);



