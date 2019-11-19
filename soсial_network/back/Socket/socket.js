const Controller = require('../Users/user.service') ;
const Message = require('../Messages/message.service') ;
function socketEvents(io) {
    var connectedUsers = {};
    let service = new Controller();
    let messageService = new Message();

    io.on('connection',function(socket){

        /*Register connected user*/
        socket.on('register',function(username){
            service.updateTable(username, {isOnline: true})
            console.log('socket username ', username);
            socket.username = username;
            connectedUsers[username] = socket;
        });

        socket.on('disconnect', function(nickname){
            service.updateTable(socket.username, {isOnline: false})
            console.log('disconnect ', socket.username);
        });

        socket.on('private_chat',function(data){
            const to = data.to,
                message = data.message;
            console.log('to ', to)

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

        socket.on('chat',function(data){
            const to = data.to,
                message = data.message;
            console.log('to ', to)
            console.log('message ', message)
            console.log('chat ', data.chatId)
            console.log('username ', socket.username);
            let messageObj = {from: socket.username, text: message}
            messageService.updateTable(data.chatId, messageObj )

            if(connectedUsers.hasOwnProperty(to)){
                console.log('username ', socket.username)
                console.log('message ', message)
                connectedUsers[to].emit('chat',{
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
