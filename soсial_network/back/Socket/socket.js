const Controller = require('../Users/user.service') ;
const Message = require('../Messages/message.service') ;
function socketEvents(io) {
    var connectedUsers = {};
    let service = new Controller();
    let messageService = new Message();

    let chatRooms = [];

    io.on('connection',function(socket){

        socket.on('register',function(id){
            console.log('id ', id);
            socket.join('123');
            io.sockets.in('123').emit('some event');
            connectedUsers[id] = socket;
        })

        socket.on('createRoom', async function (id, id2) {
            let chatId = await messageService.getChatId([id, id2]);
            chatId = chatId._id;
            console.log(chatId);
            if (connectedUsers.hasOwnProperty(id)) {
                console.log('user1 success join to room')
                connectedUsers[id].join(String(chatId));
            }
            if (connectedUsers.hasOwnProperty(id2)) {
                console.log('user2 success join to room')
                connectedUsers[id2].join(String(chatId));
            }
        })

        socket.on('messageFromClient', async function (obj) {
            console.log('message from client ', obj)
            let chatId = await messageService.getChatId([obj.from, obj.to]);
            chatId = chatId._id;
            chatId = String(chatId);
            console.log(chatId)
            console.log(typeof chatId)
            //let messageObj = {from: obj.from, text: obj.message}
            //messageService.updateTable([obj.from, obj.to], messageObj )
            console.log('------------------')
            console.log(connectedUsers[obj.to])
            console.log('------------------')
            io.sockets.in('123').emit('some event', obj.message);
            io.sockets.in(chatId).emit('messageFromServer', obj);
        })



        /*Register connected user*/
        /*socket.on('register',function(username){
            service.updateTable(username, {isOnline: true})
            socket.username = username;
            console.log(username)
            connectedUsers[username] = socket;
        });

        socket.on('disconnect', function(nickname){
            service.updateTable(socket.username, {isOnline: false})
        });

        socket.on('private_chat',function(data){
            const to = data.to,
                message = data.message;

            if(connectedUsers.hasOwnProperty(to)){
                connectedUsers[to].emit('private_chat',{
                    //The sender username
                    username : socket.username,

                    //Message sent to receiver
                    message : message
                });
            }

        });

        socket.on('chat',function(data){
            console.log(data)
            const to = data.to,
                message = data.message;
            let messageObj = {from: socket.username, text: message}
            messageService.updateTable([socket.username, to], messageObj )

            console.log(connectedUsers[to])
            if(connectedUsers.hasOwnProperty(to)){
                connectedUsers[to].emit('chat',{
                    //The sender username
                    username : socket.username,

                    //Message sent to receiver
                    message : message
                });
            }

        });*/
    });



}

module.exports = socketEvents;
