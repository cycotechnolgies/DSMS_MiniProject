import React from 'react';
import ErrorImg from '../images/404.gif';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <>
      <div className='bg-white pb-16 flex flex-col items-center justify-start '>
        <img src={ErrorImg} alt="404" className='w-96' />
        <button className='bg-blue-600 text-white px-4 py-2 rounded-md mt-4'>
          <Link to='/'>
          Back to Home Page
          </Link>
          </button>
      </div>
    </>
  )
}

export default PageNotFound;