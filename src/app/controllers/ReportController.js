const { Op } = require('sequelize');

const User = require("./../models/User");

module.exports = {
    async show(request, response) {

        // Encontrar todos os usuários que tem email que termina com "@email.com"
        // Desses usuários eu quero buscar todos que moram na "Rua Carolina Sobreira"
        // Desses usuários eu quero buscar as tecnologias que começam com React

        const users = await User.findAll({
            attributes: ['name', 'email'],
            where: {
                email: {
                    [Op.iLike]: '%@email.com'
                }
            },
            include: [
                { association: 'addresses', where: { street: 'Rua Carolina Sobreira' } }, // endereços
                { association: 'techs', required: false, where: { name: { [Op.like]: "React%" } } } // tecnologias
            ]
        });

        return response.status(200).json({ users });
    }
}