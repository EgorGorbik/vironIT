const express = require('express');
const bodyParser = require('body-parser');
const router = require('./Users/user.router');
const socket = require('socket.io');
const socketEvents = require('./Socket/socket');
require('./Users/user.model');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const server = app.listen(5000, () => console.log('Server started on port 5000'));

const io = socket(server);
router(app);
socketEvents(io);


