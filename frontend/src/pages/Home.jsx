import React, { useState } from 'react'
import Hero from '../components/Hero'
import MerchSection from '../components/MerchSection'

const Home = () => {
  const [merchLoaded, setMerchLoaded] = useState(false);

  return (
    <div>
      <Hero/>

      {!merchLoaded && <div className='w-full h-screen justify-center items-center'>Loading...</div>}
      <MerchSection onLoaded={() => setMerchLoaded(true)} />
    </div>
  )
}

export default Home
