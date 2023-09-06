import React from 'react'

const stats = [
    {
        count: "5K", label: "Active Students"
    },
    {
        count: "10+", label: "Mentors"
    },
    {
        count: "200+", label: "Courses"
    },
    {
        count: "50+", label: "Awards"
    },
]

function StatsComponent() {
    return (
        <section className='bg-richblack-700 p-10 w-full mb-20'>
            <div className='w-[90%] mx-auto'>
                <div className='flex justify-around gap-x-3'>
                    {
                        stats.map((stat,index) => {
                            return (
                                <div key={index} className='flex flex-col items-center justify-center'>
                                    <h2 className='text-4xl font-bold text-white'>{stat.count}</h2>
                                    <p className='text-xl text-richblack-500'>{stat.label}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default StatsComponent