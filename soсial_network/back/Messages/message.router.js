const Controller = require('./message.controller') ;
function router(app) {
    let controller = new Controller();

    app.get('/messages', (req, res) => controller.getMessages(req, res));
    app.get('/chats/:id',  (req, res) => controller.getChats(req, res));
    app.post('/messages/', (req, res) => controller.createMessage(req, res));
    app.put('/messages/:id', (req, res) => controller.updateMessage(req, res));



    function verifyToken(req, res, next) {
        // Get auth header value
        const bearerHeader = req.headers['authorization'];
        // Check if bearer is undefined
        if (typeof bearerHeader !== 'undefined') {
            // Split at the space
            const bearer = bearerHeader.split(' ');
            // Get token from array
            const bearerToken = bearer[1];
            // Set the token
            req.token = bearerToken;
            // Next middleware
            next();
        } else {
            // Forbidden
            res.sendStatus(403);
        }

    }
}
module.exports = router;
