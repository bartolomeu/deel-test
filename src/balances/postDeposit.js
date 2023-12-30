async function balancePostDeposit(req, res) {
  const { Job, Contract, Profile } = req.app.get("models");
  const userId = req.get("profile_id");

  //get amount to deposit
  const amount = req.body.amount;

  if( isNaN(+amount)){
    return res.status(422).send({message: 'AMOUNT INVALID'})
  }

  //check total jobs to pay
  const totalToPay = await Job.sum("price", {
    where: {
      paid: false,
    },
    include: {
      model: Contract,
      where: {
        ClientId: userId,
      },
    },
  });

  //if deposit > 25% total to pay
  const MAX_DEPOSIT_PCT = 25;
  if (amount > (totalToPay * MAX_DEPOSIT_PCT) / 100) {
    // 422
    return res.status(422).send({
      message: `CAN'T DEPOSIT MORE THAN ${MAX_DEPOSIT_PCT}% OF JOBS TO PAY`,
    });
  }

  // ok
  await Profile.increment("balance", {
    by: amount,
    where: { id: userId },
  });

  res.sendStatus(204);
}

module.exports = balancePostDeposit;
