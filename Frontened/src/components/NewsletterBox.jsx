import React from 'react'

const NewsletterBox = () => {

    const handleInput = (e) =>{
        e.target.value;
    }

    const onSubmitHandler = (e)=>{
        e.preventDefault();
    }

  return (
    <div className='text-center'>
       <p className='text-2xl font-medium text-grey-800'>Subscribe Now & get 20% off</p>
      <p className='text-grey-400 mt-3'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ex saepe minus quo minima repellat eum optio eveniet recusandae dolorem rerum reprehenderit quaerat tempore iure, excepturi earum voluptatem deleniti a!
      </p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your Email' name='email'  required onClick={handleInput}/>
        <button type='submit' className='bg-black text-xs px-10 py-4 text-white'>SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsletterBox
