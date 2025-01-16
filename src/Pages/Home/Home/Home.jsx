import React from 'react'
import Banner from '../Banner/Banner'
import Premium from '../Premium/Premium'
import Works from '../Works/Works'
import SuccessCounter from '../SuccessCounter/SuccessCounter'
import SuccessStory from '../SuccessStory/SuccessStory'

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Premium></Premium>
      <Works></Works>
      <SuccessCounter></SuccessCounter>
      <SuccessStory></SuccessStory>
    </div>
  )
}

export default Home
