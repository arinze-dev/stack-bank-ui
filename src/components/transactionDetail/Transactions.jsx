
import React from 'react'
import "./transactions.css"

function Transactions({TheValues}) {
  // console.log(TheValues);
  return (
    <div className='transactionDetail'>
      <div className='tx-type'><h5> Type:</h5> <h5>{TheValues.type}</h5></div>
      {/* yyyyyy */}
      <div className='tx-div-2'>
         <div className='firstMessage'> 
          <p> message</p>
          <p>{TheValues.message}</p>
         </div>
         <div className='secondMessage'> 
          <p> Tx id</p>
          <p>{TheValues.transactionID}</p>
         </div>
      </div>
        {/* hhhhhhh */}
      <div className='tx-div-3'>
         <div className='firstMessage'> 
          <p>sender name</p>
          <p>{TheValues.senderName}</p>
         </div>
         <div className='secondMessage'> 
          <p> receiver name</p>
        <p>{TheValues?.receiverName}</p>
         </div>
      </div>

      {/* queodij'qek;l, */}

      <div className='tx-div-4'>
         <div className='firstMessage'> 
          <p>Amount</p>
          <p>₦ {TheValues.amount.$numberDecimal}</p>
         </div>
         <div className='secondMessage'> 
          <p>Date</p>
          <p>{TheValues.createdAt}</p>
         </div>
      </div>

      <div className='tx-div-5'>
         <div className='firstMessage'> 
          <p> The Stack</p>
         </div>
         <div className='secondMessage'> 
          <p>baAfter</p>
          <p>₦{TheValues.balanceAfter.$numberDecimal}</p>
         </div>
         <div className='thirdMessage'> 
          <p> baBefore</p>
          <p>₦{TheValues.balanceBefore.$numberDecimal}</p>
         </div>
      </div>

    </div>
  )
}

export default Transactions