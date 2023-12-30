const { sequelize } = require("../model");

async function jobsPostPay(req, res) {
  const { Job, Contract, Profile } = req.app.get("models");
  const userId = req.get("profile_id");
  const { job_id } = req.params;

  const jobData = await Job.findOne({
    include: {
      model: Contract,
      where: {
        ClientId: userId,
      },
    },
    where: {
      id: job_id,
    },
  });

  if (!jobData) {
    return res.status(404).send({ message: "Job not found" });
  }

  //job is unpaid?
  if (jobData.paid) {
    return res.status(422).send({ message: "Job already paid" });
  }

  //profile has balance
  const client = Profile.findByPk(userId);
  if (client.balance < jobData.price) {
    return res.status(422).send({ message: "Not enough balance" });
  }

  sequelize.transaction(async (t) => {
    const increment = Profile.increment(
      "balance",
      {
        by: jobData.price,
        where: {
          id: jobData.Contract.ContractorId,
        },
      },
      { transaction: t }
    );
    const decrement = Profile.decrement("balance", {
      by: jobData.price,
      where: {
        id: userId,
      },
    });

    const updateContract = Job.update(
      {
        paid: true,
        paymentDate: sequelize.fn('datetime', 'now')
      },
      {
        where: { id: job_id },
        transaction: t,
      }
    );

    await Promise.all([increment, decrement, updateContract]);
  });

  return res.sendStatus(204);
}

module.exports = jobsPostPay;
