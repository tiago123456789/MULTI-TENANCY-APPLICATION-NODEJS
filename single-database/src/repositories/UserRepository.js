const Repository = require("./Repository");

class UserRepository extends Repository {

    constructor() {
        super("users");
    }

    findByEmail(email) {
        return this.getModel().first().where({
            email: email
        });
    }
    
};

module.exports = UserRepository;