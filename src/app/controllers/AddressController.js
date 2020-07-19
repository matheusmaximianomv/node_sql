const Address = require("./../models/Address");
const User = require("./../models/User");

module.exports = {

    async index(request, response) {

        const { user_id } = request.params;

        const user = await User.findByPk(user_id, {
            include: { association: 'addresses' }
        });

        return response.status(200).json(user);

    },

    async store(request, response) {

        const { user_id } = request.params;
        const { zipcode, street, number } = request.body;

        const user = await User.findByPk(user_id);

        if(!user) {
            return response.status(400).json({ error: "User not found" });
        }

        const address = await Address.create({
            zipcode,
            street,
            number,
            user_id
        });

        return response.status(201).json(address);
    }
}