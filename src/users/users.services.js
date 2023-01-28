const usersControllers = require("./users.controllers");

const findAllUsers = (req, res) => {
    usersControllers
        .findAllUsers()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json({ message: err.message });
        });
};

module.exports = {
    findAllUsers,
};
