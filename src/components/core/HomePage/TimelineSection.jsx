import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png";
const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description: "Fully commited to the success company"
    },
    {
        Logo: Logo2,
        heading: "Leadership",
        Description: "Fully commited to the success company"
    },
    {
        Logo: Logo3,
        heading: "Leadership",
        Description: "Fully commited to the success company"
    },
    {
        Logo: Logo4,
        heading: "Leadership",
        Description: "Fully commited to the success company"
    },
]
function TimelineSection() {
    return (
        <div>
            <div className='flex flex-row gap-15 items-center'>
                <div className='w-[45%] flex flex-col gap-5'>
                    {
                        timeline.map((item, index) => {
                            return (
                                <div key={index} className='flex flex-row items-center gap-5'>
                                    <div className='w-[50px] h-[50px] bg-white flex items-center justify-center rounded-md'>
                                        <img src={item.Logo} alt='Timeline-Logo' />
                                    </div>
                                    <div>
                                        <h2 className='font-semibold text-[18px]'>
                                            {item.heading}
                                        </h2>
                                        <p className='text-base'>{item.Description}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='relative shadow-blue-200'>
                    <div className='absolute left-[10%] bottom-[0] bg-caribbeangreen-700 flex flex-row text-white uppercase py-10'>
                        <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                            <p className='text-3xl font-bold'>10</p>
                            <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
                        </div>
                        <div className='flex gap-5 items-center px-7'>
                            <p className='text-3xl font-bold'>250</p>
                            <p className='text-caribbeangreen-300 text-sm'>Type of courses</p>
                        </div>
                    </div>
                    <img src={timelineImage} alt='timelineImage' className='shadow-white object-cover' />.
                    <div className='timelineShadow'></div>
                </div>
            </div>
        </div>
    )
}

export default TimelineSection