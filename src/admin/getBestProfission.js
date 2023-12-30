const { Op } = require("sequelize");
const { sequelize } = require("../model");

async function adminGetBestProfission(req, res) {
  const { Job, Contract, Profile } = req.app.get("models");

  //get query param start end
  const { start, end } = req.query;

  // const totalAmount = await Profile.findAll({
  //   attributes: [
  //     "profession",
  //     [sequelize.fn("sum", sequelize.col("Contractor.Jobs.price")), "total"],
  //   ],
  //   include: {
  //     model: Contract,
  //     as: "Contractor",
  //     include: [
  //       {
  //         model: Job,
  //         where: {
  //           "paymentDate": {
  //             [Op.between]: [start, end],
  //           },
  //         },
  //       },
  //     ],
  //   },
  //   group: ["profession"],
  //   order: [
  //     [sequelize.fn("sum", sequelize.col("Contractor.Jobs.price")), "DESC"],
  //   ],
  // });
  // res.send(totalAmount[0].profession);


  const totalAmount = await Job.findAll({
    attributes: [
      "Contract.Contractor.profession",
      [sequelize.fn("sum", sequelize.col("price")), "total"],
    ],
    include: {
      model: Contract,
      include: [
        {
          model: Profile,
          as: 'Contractor',
        },
      ],
    },
    group: ["Contract.Contractor.profession"],
    order: [
      [sequelize.fn("sum", sequelize.col("price")), "DESC"],
    ],
    where:{
      "paymentDate": {
        [Op.between]: [start, end],
      },
    },
    limit:1
  });

  if(! totalAmount || totalAmount.length == 0) {
    return res.sendStatus(404);
  }

  console.log(totalAmount);
  // res.send({data:totalAmount});
  res.send(totalAmount[0].Contract.Contractor.profession);
}

module.exports = adminGetBestProfission;
