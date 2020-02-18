const User = require("./../models/User");
const Tech = require("./../models/Tech");

module.exports = {

    async index(request, response) {

        const { user_id } = request.params;

        const user = await User.findByPk(user_id, {
            attributes: [
                'id', 'name', 'email', 'age'
            ],
            include: { 
                association: 'techs',
                attributes: ['id', 'name'], 
                through: {
                    attributes: []
                } 
            }
        });

        return response.status(200).json(user);

    },

    async store(request, response) {

        const { user_id } = request.params;
        const { name } = request.body;

        const user = await User.findByPk(user_id);

        if (!user) {
            return response.status(400).json({ error: "User not found" });
        }

        if (!(typeof name === 'string')) {
            return response.status(400).json({ error: "Bad syntax parament name" });
        }

        const [tech, created] = await Tech.findOrCreate({
            where: { name: name.toLowerCase() }
        });

        if (created) {
            console.log("New technology created.");
        }

        await user.addTech(tech);

        return response.status(201).json(tech);

    },

    async destroy(request, response) {

        const { user_id } = request.params;
        const { name } = request.body;

        const user = await User.findByPk(user_id);

        if (!user) {
            return response.status(400).json({ error: "User not found" });
        }

        if (!(typeof name === 'string')) {
            return response.status(400).json({ error: "Bad syntax parament name" });
        }

        const tech = await Tech.findOne({
            where: { name: name.toLowerCase() }
        });

        console.log(tech);

        await user.removeTech(tech);

        return response.status(204).json();
    }
}