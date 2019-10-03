var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {
    keepAlive: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});


module.exports = mongoose;
