import React from 'react'

import Hero from '../../components/student/Hero'
import CourseSection from '../../components/student/CourseSection'
import Testimonials from '../../components/student/Testimonials'
import CallToAction from '../../components/student/CallToAction'
import Footers from '../../components/student/Footers'

const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7
    text-center'>
      <Hero />
      <CourseSection />
      <Testimonials />
      <CallToAction />
      <Footers />
      </div>
  )
}
export default Home;
