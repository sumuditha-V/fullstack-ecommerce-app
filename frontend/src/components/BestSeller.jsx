import React, { useContext, useEffect, useState } from 'react'
import Title from './Title.jsx'
import { ShopContext } from '../context/Shopcontext.jsx';
import ProductItems from './ProductItems.jsx';

const BestSeller = () => {

    const { products } = useContext(ShopContext);

    const [bestSeller,setBestSeller] = useState([]);

    useEffect(()=> {
        
        const bestProduct = products.filter((item)=>(item.bestseller));
        setBestSeller(bestProduct.slice(0,5))
    
    },[products])
  return (
    <div className='my-10' >
        <div className='text-center text-3xl py-8' >
            <Title text1={'BEST'} text2={'Sellers'} />
            <p  className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 ' >Best Seller Section</p>
        </div>
        
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
    {
        bestSeller.map((items, index) => {
            return <ProductItems key={index} id={items._id} image={items.image} name={items.name} price={items.price} />
        })
    }
        </div>

    </div>
  )
}

export default BestSeller