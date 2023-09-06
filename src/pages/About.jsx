import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import BannerImage1 from '../assets/Images/aboutus1.webp'
import BannerImage2 from '../assets/Images/aboutus2.webp'
import BannerImage3 from '../assets/Images/aboutus3.webp'
import FoundingStory from '../assets/Images/FoundingStory.png';
import Quote from '../components/core/AboutPage/Quote';
import StatsComponent from '../components/core/AboutPage/StatsComponent';
import LearningGrid from '../components/core/AboutPage/LearningGrid';
import ContectFormSection from '../components/core/AboutPage/ContectFormSection';
function About() {
    return (
        <div >
            <section >
                <div className='text-center bg-richblack-600 h-[400px] mb-[200px] '>
                    <header className='max-w-maxContent relative mx-auto flex flex-col w-11/12 items-center text-white justify-between h-[400px]'>
                        <div className='px-[230px] p-10'>
                            <h2 className='text-4xl'> Driving Innovation in Online Education for a <HighlightText text={"Brighter Future"} /></h2>
                            <p className='text-sm p-5'>
                                Studynotion is at the forefront of driving innovation in online
                                education. We're passionate about creating a brighter future by
                                offering cutting-edge courses, leveraging emerging technologies,
                                and nurturing a vibrant learning community.
                            </p>
                        </div>
                        <div className='flex gap-x-3 absolute bottom-[-150px]'>
                            <img src={BannerImage1} alt='aboutus1' />
                            <img src={BannerImage2} alt='aboutus2' />
                            <img src={BannerImage3} alt='aboutus3' />
                        </div>
                    </header>
                </div>
            </section>
            <section>
                <div className='border-b h-[200px] mb-[100px] border-richblack-500'>
                    <Quote />
                </div>
            </section>
            <section className='mb-10 max-w-maxContent relative mx-auto flex flex-col w-11/12 items-center text-white justify-between'>
                <div className='flex gap-20 mb-[150px]'>
                    <div className='text-white w-[50%]'>
                        <h2 className='bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent text-4xl mb-7 font-semibold'>Our Founding Story</h2>
                        <p className='text-sm mb-8 text-richblack-300'>
                            Our e-learning platform was born out of a shared vision and
                            passion for transforming education. It all began with a group of
                            educators, technologists, and lifelong learners who recognized
                            the need for accessible, flexible, and high-quality learning
                            opportunities in a rapidly evolving digital world.
                        </p>
                        <p className='text-richblack-300'>
                            As experienced educators ourselves, we witnessed firsthand the
                            limitations and challenges of traditional education systems. We
                            believed that education should not be confined to the walls of a
                            classroom or restricted by geographical boundaries. We
                            envisioned a platform that could bridge these gaps and empower
                            individuals from all walks of life to unlock their full
                            potential.
                        </p>
                    </div>
                    <div className=' shadow-[0_0_20px_0] shadow-[#FC6767]'>
                        <img src={FoundingStory} alt='FoundingStory' />
                    </div>
                </div>
                <div className='flex justify-between gap-10 mt-10 mb-32'>
                    <div className='w-[38%]'>
                        <h2 className='bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-transparent text-3xl mb-5 font-semibold'>Our Vision</h2>
                        <p className='text-md text-richblack-300'>
                            With this vision in mind, we set out on a journey to create an
                            e-learning platform that would revolutionize the way people
                            learn. Our team of dedicated experts worked tirelessly to
                            develop a robust and intuitive platform that combines
                            cutting-edge technology with engaging content, fostering a
                            dynamic and interactive learning experience.
                        </p>
                    </div>
                    <div className='w-[38%]'>
                        <h2 className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-3xl mb-5 font-semibold'>Our Mission</h2>
                        <p className='text-md text-richblack-300'>
                            Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                        </p>
                    </div>
                </div>
            </section>
            <StatsComponent />
            <section className='max-w-maxContent relative mx-auto flex flex-col w-11/12 items-center text-white justify-between'>
                <LearningGrid />
                <ContectFormSection />
            </section>
        </div>
    )
}

export default About