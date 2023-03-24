import React from 'react'

function Listings() {
  return (
    <div className='p-3 min-w-[250px] sticky top-0 border hidden lg:block rounded-lg max-w-[250px] bg-primary'>
        <h2 className='text-md font-bold my-2'>Listings</h2>
        <ul>
          <li className='p-2 border-t border-b'>
            <p>I built a newsletter for web developers!</p>
            <span className='text-sm text-gray-600'>products</span>
          </li>

          <li className='p-2 border-t border-b'>
            <p>Talented JS Developer for hire!!</p>
            <span className='text-sm text-gray-600'>Jobs</span>
          </li>

          <li className='p-2 border-t border-b'>
            <p>This is Just a Place holder for the listings section!</p>
            <span className='text-sm text-gray-600'>js</span>
          </li>

          <li className='p-2 border-t border-b'>
            <p>This is Just a Place holder for the listings section!</p>
            <span className='text-sm text-gray-600'>js</span>
          </li>


        </ul>
    </div>
  )
}

export default Listings