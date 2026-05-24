import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/Shopcontext';
import Title from'./Title.jsx'
import ProductItems from './ProductItems.jsx';

const Latestcollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts,setLatestProducts] = useState([]);

    useEffect(()=>{
      setLatestProducts(products.slice(0,10));
    },[products])
    return (
        <div className='my-10' >
          <div className='text-center py-8 text-3xl ' >
            <Title text1={'Latest'} text2={'Collections'} />
            <p className='2-3/4 m-auto text-xs sa:text-sm md:text-base text-gray-600' >
            Checkout Our Latest Products
            </p>
          </div>
          {/*Rendering products */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {latestProducts.map((items,index)=>(
              <ProductItems key={index} id={items._id} image={items.image} name={items.name} price={items.price} />
            ))}

          </div>
               
        </div>
    );
};

export default Latestcollection;