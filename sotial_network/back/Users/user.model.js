var mongoose = require('../config/model');

var usersSchema = new mongoose.Schema({
    name: String,
    surname: String,
    username: String,
    friends: Array,
    friendRequests: Array,
    password: String,
    sentFriendRequests: Array
});

mongoose.model('User', usersSchema);
