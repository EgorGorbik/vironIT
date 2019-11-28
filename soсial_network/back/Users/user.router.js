const jwt = require('jsonwebtoken');
const Controller = require('./user.controller') ;
function router(app) {
    let controller = new Controller();

    app.get('/users', (req, res) => controller.getUsers(req, res));
    app.get('/users/:id', (req, res) => controller.getUser(req, res));
    app.post('/users/', (req, res) => controller.createUser(req, res));
    app.put('/users/:id', (req, res) => controller.updateUser(req, res));
    app.delete('/users/:id', (req, res) => controller.deleteUser(req, res));
    app.post('/api/registration', (req, res) => controller.registerUser(req, res));
    app.post('/api/login', (req, res) => controller.loginUser(req, res));
    app.post('/token', (req, res) => controller.getNewAccessToken(req, res));
    app.post('/api/posts', verifyToken, (req, res) => controller.getPermission(req, res));
    app.put('/friendRequest/:id', verifyToken, (req, res) => controller.friendRequest(req, res));
    app.put('/cancelFriendRequest/:id', verifyToken, (req, res) => controller.cancelFriendRequest(req, res));
    app.put('/acceptFriendRequest/:id', verifyToken, (req, res) => controller.acceptFriendRequest(req, res));
    app.put('/deleteFriend/:id', verifyToken, (req, res) => controller.deleteFriendRequest(req, res));
    app.get('/getUsersFriends', verifyToken, (req, res) => controller.getUsersFriends(req, res));
    app.get('/userPublicInfo/:id', (req, res) => controller.getUserPublicInfo(req, res));
    app.get('/usersByLetters/:letters', (req, res) => controller.getUsersByLetters(req, res));










// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
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
