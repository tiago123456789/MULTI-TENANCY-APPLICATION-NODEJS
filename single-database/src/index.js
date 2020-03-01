const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("./config/LoaderEnvironmentVariable");
const connection = require("./config/Database");
const authMiddleware = require("./middlewares/Auth");

// Setting middleware parse datas to json.
app.use(bodyParser.json());

app.post("/auth/login", async (request, response) => {
    const credentials = request.body;
    if (!credentials.email || !credentials.password) {
        return response.json({
            error: "Is necessary informate email and password!"
        });
    }

    const user = await connection("users").first().where({
        email: credentials.email,
        password: credentials.password
    });

    if (!user) {
        return response.json({
            error: "Credentials invalids!"
        });
    }

    delete user.password;
    const accessToken = await jwt.sign({ ...user } , process.env.JWT_SECRET, { expiresIn: "1h" });
    response.json({ accessToken })
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

app.listen(process.env.PORT, (error) => {
    if (error) {
        console.log(error);
        return;
    }

    console.log(`Server is running in address: ${process.env.APP_URL}`);
});