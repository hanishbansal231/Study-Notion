import React from 'react'
import HighlightText from '../HomePage/HighlightText'

function Quote() {
  return (
    <div className='text-4xl text-richblue-25 max-w-maxContent relative mx-auto w-11/12 items-center justify-between text-center font-bold'>
         We are passionate about revolutionizing the way we learn. Our
        innovative platform <HighlightText text={"combines technology"} />,
        <span className='bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold'>{" "}expertise</span>
        , and community to create an
        <span className='bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold'>{" "} unparalleled educational
        experience.</span>
    </div>
  )
}

export default Quote