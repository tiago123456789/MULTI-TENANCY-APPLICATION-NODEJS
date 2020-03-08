const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("./config/LoaderEnvironmentVariable");
const connection = require("./config/Database");
const authMiddleware = require("./middlewares/Auth");
const auth = require("./security/Auth");
const AuthException = require("./exceptions/AuthException");
const exceptionHandler = require(".//middlewares/ExceptionHandler");

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
    await connection('users').insert(newUser);
    response.sendStatus(201);
});

app.get("/launchs", authMiddleware.isAuthenticated, async (request, response) => {
    const launchs = await connection("launchs").select();
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