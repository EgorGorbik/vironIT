function socketEvents(io) {
    var connectedUsers = {};

    io.on('connection',function(socket){

        /*Register connected user*/
        socket.on('register',function(username){
            console.log('socket username ', username)
            socket.username = username;
            connectedUsers[username] = socket;
        });

        socket.on('private_chat',function(data){
            const to = data.to,
                message = data.message;

            if(connectedUsers.hasOwnProperty(to)){
                console.log('username ', socket.username)
                console.log('message ', message)
                connectedUsers[to].emit('private_chat',{
                    //The sender username
                    username : socket.username,

                    //Message sent to receiver
                    message : message
                });
            }

        });
    });



}

module.exports = socketEvents;
