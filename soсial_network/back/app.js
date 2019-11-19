const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./Users/user.router');
const messageRouter = require('./Messages/message.router')
const socket = require('socket.io');
const socketEvents = require('./Socket/socket');
require('./Users/user.model');
require('./Messages/message.model');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const server = app.listen(5000, () => console.log('Server started on port 5000'));

const io = socket(server);
userRouter(app);
messageRouter(app);
socketEvents(io);


