var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test1', {
    keepAlive: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});


module.exports = mongoose;
