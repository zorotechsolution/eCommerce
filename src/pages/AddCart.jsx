import React from 'react'

import {ayurvedicMedicines} from '../db/data'

const AddCart = () => {


  return (
    <>
    <section>
       <div className="px-10 md:px-50">
         <h1 className='text-2xl uppercase font-semibold'>Your cart</h1>

        <div className="">
            <table className='w-full'>
                <thead className='bg-gray-100'>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody >

                    {
                        
    ayurvedicMedicines.map((product,id)=>{
        return (
            <tr className='odd:bg-gray-50 border-b border-gray-300' key={id}>
                        <th className='p-10 md:w-50'> <img className='w-30 ' src={product.img} alt="" /> <div className="">{product.productName}</div> </th>
                        <th>{product.price}</th>
                        <th>3</th>
                        <th>{product.price*3}</th>
                    </tr>
        )
    })
                    }
                   
                    
                    
                </tbody>
            </table>
        </div>
       </div>
    </section>

    </>
  )
}

export default AddCart