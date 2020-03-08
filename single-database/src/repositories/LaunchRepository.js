const Repository = require("./Repository");

class LaunchRepository extends Repository {

    constructor() {
        super("launchs");
    }

};

module.exports = LaunchRepository;