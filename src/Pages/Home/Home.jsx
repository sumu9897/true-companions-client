import React from 'react'
import Banner from '../../Components/Banner'
import Premium from '../../Components/Premium'
import Works from './Works'
import SuccessCounter from './SuccessCounter'
import SuccessStory from './SuccessStory'

const Home = () => {
  return (
    <div>
      <Banner/>
      <Premium/>
      <Works/>
      <SuccessCounter/>
      <SuccessStory/>
    </div>
  )
}

export default Home
