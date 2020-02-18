const User = require("../models/User");

module.exports = {

    async index(request, response) {

        const users = await User.findAll();

        return response.status(200).json(users);

    },
     
    async store(request, response) {

        const { name, email, age } = request.body;

        const user = await User.create({
            name,
            email,
            age
        });

        return response.status(201).json(user);
    }
}