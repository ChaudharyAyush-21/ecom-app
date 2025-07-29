import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const {products} =useContext(ShopContext);
  const [showFilter , setShowFilter] = useState(false);
  const [filterProducts, setfilterProducts] = useState([]);
  const [category ,setCategory] =useState([]);
  const [subCategory , setsubCategory] = useState([]);
  const [sortType , setsortType] = useState('relevant')

  const toggleCategory = (e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev =>prev.filter(item => item !== e.target.value));
    }
    else{
      setCategory(prev =>[...prev, e.target.value]);
    }
  }

  const togglesubCategory = (e)=>{
    if(subCategory.includes(e.target.value)){
      setsubCategory(prev =>prev.filter(item => item !== e.target.value));
    }
    else{
      setsubCategory(prev =>[...prev, e.target.value]);
    }
  };

  const applyFilter =()=>{
    let productCopy = products.slice();
    if(category.length >0){
      productCopy = productCopy.filter(item => category.includes(item.category));
    }
    if(subCategory.length >0){
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory));
    }
    setfilterProducts(productCopy);
  };

  const shortProduct = ()=>{
    let fpcopy = filterProducts.slice();
    switch(sortType){
      case 'low-high':
        setfilterProducts(fpcopy.sort((a,b)=>(a.price-b.price)));
        break;
      case 'high-low':
        setfilterProducts(fpcopy.sort((a,b)=>(b.price-a.price)));
        break
      default:
        applyFilter();
        break
    }

  };


  // useEffect(()=>{
  //   setfilterProducts(products);
  // },[])

  useEffect(()=>{
    applyFilter();
  },[category,subCategory])

  useEffect(()=>{
    shortProduct();
  },[sortType])

  //   useEffect(()=>{
  //   console.log(subCategory)
  // },[subCategory])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* filter options */}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
        <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>

        {/* category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
            <div className='flex flex-col gap-2 text-sm font-light text-grey-700'>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory}/>Men
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory}/>Women
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory}/>Kids
              </p>
            </div>
        </div>
        {/* SubCategory filter */}
          <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>TYPE</p>
            <div className='flex flex-col gap-2 text-sm font-light text-grey-700'>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Topwear'} onChange={togglesubCategory}/>Topwear
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={togglesubCategory}/>Bottomwear
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Winterwear'} onChange={togglesubCategory}/>Winterwear
              </p>
            </div>
          </div>
      </div>
      {/* right side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTION'}/>
          {/* product sort */}
          <select onChange={(e)=>setsortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent">SortBy: Relavent</option>
            <option value="low-high">SortBy: Low to High</option>
            <option value="high-low">SortBy: High to Low</option>
          </select>
        </div>
        {/* map products */}
        <div className='grid grid-cols-2 md:gride-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item,index)=>(
                <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection
