import React from 'react'
import Premium from '../../Components/Premium'
import Works from './Works'
import SuccessCounter from './SuccessCounter'
import SuccessStory from './SuccessStory'
import Banner from '../../components/Banner'

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
