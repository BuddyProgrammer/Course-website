import React from 'react'

import { assets, dummyTestimonial } from '../../assets/assets'

const Testimonials = () => {
  return (
    <div className='py-16 px-8 md:px-40'>
      
      <h2 className='text-3xl font-medium text-gray-800 text-center'>
        Testimonials
      </h2>

      <p className='md:text-base text-gray-500 mt-3 text-center'>
        Hear from our learners as they share their journey of transformation,
        success, and how our <br /> platform has made a difference in their lives.
      </p>

      {/* Centered Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-14 place-items-center'>
        
        {dummyTestimonial.map((testimonial, index) => (
          
          <div
            key={index}
            className='text-sm text-left border border-gray-300 pb-6 rounded-lg bg-white shadow-sm overflow-hidden w-full max-w-xs'
          >

            {/* Profile Section */}
            <div className='flex items-center gap-3 px-4 py-3 bg-gray-100'>
              <img
                className='h-10 w-10 rounded-full'
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <h1 className='text-sm font-medium text-gray-800'>
                  {testimonial.name}
                </h1>
                <p className='text-gray-500 text-xs'>
                  {testimonial.role}
                </p>
              </div>
            </div>

            {/* Rating Section */}
            <div className='p-4'>
              <div className='flex gap-1'>
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    className='h-4'
                    src={
                      i < Math.floor(testimonial.rating)
                        ? assets.star
                        : assets.star_blank
                    }
                    alt="star"
                  />
                ))}
              </div>

              <p className='text-gray-500 text-xs mt-4'>
                {testimonial.feedback}
              </p>
            </div>
            <a href="#" className='text-blue-500 underline px-5'>Read more</a>

          </div>

        ))}

      </div>
      </div>
  )
}


export default Testimonials;

