const { Op } = require("sequelize");
const { sequelize } = require("../model");

async function adminGetBestClients(req, res) {
  const { Job, Contract, Profile } = req.app.get("models");
  const { start, end, limit = 2 } = req.query;

  console.log(start, end, limit);

  const totalAmount = await Job.findAll({
    attributes: [[sequelize.fn("sum", sequelize.col("price")), "total"]],
    include: {
      model: Contract,
      include: [
        {
          model: Profile,
          as: "Client",
        },
      ],
    },
    order: [[sequelize.fn("sum", sequelize.col("price")), "DESC"]],
    where: {
      paymentDate: {
        [Op.between]: [start, end],
      },
    },
    limit,
  });

  if(!totalAmount[0].total){
    return res.send([])
  }

  const result = totalAmount.map((elm) => {
    console.log(elm);
    console.log(elm.total);
    return {
      id: elm.Contract.Client.dataValues.id,
      fullName:
        elm.Contract.Client.dataValues.firstName +
        " " +
        elm.Contract.Client.dataValues.lastName,
      paid: elm.dataValues.total,
    };
  });

  res.send(result);
}

module.exports = adminGetBestClients;
