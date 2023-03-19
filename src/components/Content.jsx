import React from 'react'

function Content() {
  return (
    <div className='flex flex-col gap-2'>

      <p className='text-lg font-[600] text-start'>Typescript for Beginners: What You Should Know</p>

      <div className='flex gap-2 text-gray-700 mb-3'>
          <p className='p-1 text-sm'>#webdev</p>
          <p className='p-1 text-sm'>#typescript</p>
          <p className='p-1 text-sm'>#programming</p>
      </div>

      <p>
        NodeJS is well known for being single-threading, but it is not true, because only the event-loop is handled by a single thread. NodeJS gives to us the possibility to use 2 approaches for multithreading, worker_threads and child_process.



      </p>

      <p>
        Application: The purpose of the application we are going to create is to load all the folder's content and upload every file to Google Cloud Storage, but the most interesting part is that we will decide how many threads should do this operation, speeding up the upload process.

      </p>

    </div>
  )
}

export default Content