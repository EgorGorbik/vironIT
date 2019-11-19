var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test3', {
    keepAlive: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});


module.exports = mongoose;
