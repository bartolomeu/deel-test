const { Op } = require("sequelize");

async function contractorGetById (req, res) {
    const {Contract} = req.app.get('models')
    const {id} = req.params;
    const userId = req.get('profile_id')
    const contract = await Contract.findOne({where: {
        [Op.and]:{
            id,
            [Op.or]:{
                ContractorId: userId,
                ClientId:userId
            }

        }
    }})
    if(!contract) return res.status(404).end()
    res.json(contract)
}

module.exports = contractorGetById;