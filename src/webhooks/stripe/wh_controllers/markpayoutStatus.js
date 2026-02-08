const Payout = require("../../../models/payout.model")

const updatePayout = async ( payout ) => {

  try {
    var payout_id = payout.id
    var payout_status = payout.status.replace('_', " ")
    await Payout.findOneAndUpdate(
      {
        payoutId : payout_id , 
      },
      {
        status: payout_status.toLowerCase(),
      }
    )
  }
  catch (e) {
    console.log(`payout of id ${payout.id} has status ${payout.status} couldnt update !`)
  }


}


module.exports = updatePayout