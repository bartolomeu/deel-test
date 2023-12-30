const { Op } = require("sequelize");

/**
 * **_GET_** `/jobs/unpaid`
 * Get all unpaid jobs for a user (**_either_** a client or contractor), for **_active contracts only_**.
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function jobsGetUnpaid(req, res) {
  const { Job, Contract } = req.app.get("models");
  const userId = req.get("profile_id");
  const jobsUnpaid = await Job.findAll({
    include: {
      model: Contract,
      where: {
        status: "in_progress",
        [Op.or]: {
          ContractorId: userId,
          ClientId: userId,
        },
      },
    },
    where: {
      paid: false,
    },
  });
  if (!jobsUnpaid) return res.status(404).end();
  res.json(jobsUnpaid);
}

module.exports = jobsGetUnpaid;
