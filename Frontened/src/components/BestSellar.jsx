import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSellar = () => {

    const {products} = useContext(ShopContext);

    console.log(products)
    const [bestSeller, setbestSeller] = useState([]);

    useEffect(()=>{
        const bestProduct = products.filter((item)=>(item.bestseller));
        setbestSeller(bestProduct.slice(0,5));
    },[products])

  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title  text1={'BEST'} text2={'SELLERS'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-grey-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, quaerat excepturi. Quaerat vitae dignissimos ipsum quia cupiditate. Inventore provident autem quod vero enim, praesentium non repellat! Aliquid iste itaque corrupti?
        </p>
      </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {
            bestSeller.map((item,index)=>(
                <ProductItem key={index} id={item._id} images={item.images} name={item.name} price={item.price}/>
            ))
          }
        </div>
    </div>
  )
}

export default BestSellar
