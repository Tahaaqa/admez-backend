const Bank = require("../../../models/bank.model")
 

const updateBank = async( bankData )=> {

  try {  
    
    const bankId = bankData.id

    await Bank.findOneAndUpdate(
      {bankId : bankId} ,
      {
        last4 : bankData.last4,
        status: bankData.status,
        bankName : bankData.bank_name
        
      }
    )
    }
    catch(e) {
      console.log(`a bank with ID :${bankId} DIDNT UPDATE DURRING THE HOOK EVENT !`)
    }
    
}

module.exports = updateBank