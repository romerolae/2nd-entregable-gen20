const express = require("express");
const app = express();

app.use(express.json());

// Creation of the dummy DataBase
const usersDB = [
    {
        id: 1,
        firstName: "Sahid",
        lastName: "Kick",
        email: "sahid.kick@academlo.com",
        password: "root",
        age: 22,
    },
    {
        id: 2,
        firstName: "Camila",
        lastName: "Grisalez",
        email: "graciaCielo@gmail.com",
        password: "vnzlaSnimas",
        age: 33,
    },
];

//todo Base for the ID
let baseId = 3;

app.get("/", (req, res) => {
    res.status(200).json({
        message: "My server is running OK!",
    });
});

// 1. GET to request for return of all users
app.get("/users", (req, res) => {
    res.json(usersDB);
});

// 2. POST to request to handle the client's req and creation of a new user
app.post("/users", (req, res) => {
    const data = req.body;

    const newUser = {
        id: baseId++,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        age: data.age,
    };
    usersDB.push(newUser);

    res.status(201).json(newUser);
});

// 3. GET to request for the return of the specific user according to the ID provided from params.
app.get("/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const data = usersDB.find((user) => id === user.id);

    if (data) {
        res.status(200).json(data);
    } else {
        res.status(404).json({
            message: "Invalid ID!",
        });
    }
});

//Optional
// PUT  to modify the user depending on the ID

app.put("/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const updatedUser = req.body;
    const index = usersDB.findIndex((user) => user.id === id);

    if (index >= 0) {
        usersDB[index] = updatedUser;
    } else {
        res.status(404).json({
            message: "Invalid ID!",
        });
    }
    res.status(202).json(usersDB);
});

//Delete

app.delete("/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = usersDB.findIndex((user) => user.id === id);

    if (index >= 0) {
        usersDB.splice(index, 1);
    } else {
        res.status(404).json({
            message: "Invalid ID!",
        });
    }
    res.status(202).json(usersDB);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server started at port ${port}...`);
});

module.exports = app;
