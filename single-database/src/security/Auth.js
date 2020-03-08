const bcrypt = require("bcrypt");
const Token = require("./Token");
const UserRepository = require("../repositories/UserRepository");

const userRepository = new UserRepository();
const token = new Token();

module.exports = {

    async authenticate(credentials) {
        if (!credentials.email || !credentials.password) {
            throw new AuthException("Is necessary informate email and password!", 400);
        }

        const user = await userRepository.findByEmail(credentials.email);

        if (!user) {
            throw new AuthException("Credentials invalids!", 401);
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) {
            throw new AuthException("Credentials invalids!", 401);
        }

        return token
            .addItemInPayload("email", user.email)
            .addItemInPayload("id", user.id)
            .build();
    }
}