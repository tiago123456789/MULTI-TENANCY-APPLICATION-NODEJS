const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
require("./config/LoaderEnvironmentVariable");
const connection = require("./config/Database");
const authMiddleware = require("./middlewares/Auth");
const auth = require("./security/Auth");
const AuthException = require("./exceptions/AuthException");
const exceptionHandler = require(".//middlewares/ExceptionHandler");
const UserRepository = require("./repositories/UserRepository");
const LaunchRepository = require("./repositories/LaunchRepository");
const launchRepository = new LaunchRepository();
const userRepository = new UserRepository();

// Setting middleware parse datas to json.
app.use(bodyParser.json());

app.post("/auth/login", async (request, response, next) => {
    try {
        const credentials = request.body;
        const accessToken = await auth.authenticate(credentials);
        response.json({ accessToken });
    } catch (error) {
        next(error);
    }
});

app.post("/users", async (request, response) => {
    const newUser = request.body;
    newUser.password = await bcrypt.hash(newUser.password, 10);
    userRepository.create(newUser)
    response.sendStatus(201);
});

app.get("/launchs", authMiddleware.isAuthenticated, async (request, response) => {
    const launchs = await launchRepository.findAll();
    response.json(launchs);
});

// Setting middleware handler exceptions.
app.use(exceptionHandler);

app.listen(process.env.PORT, (error) => {
    if (error) {
        console.log(error);
        return;
    }

    console.log(`Server is running in address: ${process.env.APP_URL}`);
});