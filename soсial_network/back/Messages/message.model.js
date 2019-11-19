var mongoose = require('../config/model');

var messageSchema = new mongoose.Schema({
    members: Array,
    messages: Array,
    name: String
});

mongoose.model('Message', messageSchema);

