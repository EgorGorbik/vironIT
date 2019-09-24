const fs = require("fs");
class Controller {
constructor(users) {

    this.users = users;
    console.log('constructor')
}

    getUser(id) {
        let user = this.users.find(function (user) {
            return user.id === id
        });
        return user;
    }

    createUser(name) {
        var user = {
            name: name,
            id: this.users.length+1
        }
        this.users.push(user);
        fs.writeFileSync('data.json', JSON.stringify(this.users, null, 4));
    }

    updateUser(id, name) {
        let user = this.users.find(function (user) {
            return user.id === id
        });
        user.name = name;
        fs.writeFileSync('data.json', JSON.stringify(this.users, null, 4));
    }

    deleteUser(id) {
        this.users = this.users.filter(function(user) {
            return user.id !== id;
        })
        fs.writeFileSync('data.json', JSON.stringify(this.users, null, 4));
    }

}

module.exports.Controller = Controller;
