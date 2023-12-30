const { Op } = require("sequelize");

async function contractorGetAll (req, res) {
    const {Contract} = req.app.get('models')
    const userId = req.get('profile_id')
    const contract = await Contract.findAll({where: {
        [Op.and]:{
            status: { [Op.ne]: 'terminated'},
            [Op.or]:{
                ContractorId: userId,
                ClientId:userId
            }
        }
    }})
    if(!contract) return res.status(404).end()
    res.json(contract)
}

module.exports = contractorGetAll;