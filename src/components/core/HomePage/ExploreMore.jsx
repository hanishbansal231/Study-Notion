import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';
const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths"
]
function ExploreMore() {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);
  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };
  return (
    <div>
      <div className='text-4xl font-semibold text-center'>
        Unlock the <HighlightText text={"Power of code"} />
      </div>
      <p className='text-richblack-300 text-md text-[16px] text-center'>Learn to build anything you can imagine</p>
      <div className='flex flex-row rounded-full bg-richblack-800 mb-5 border-richblack-100 mt-5 px-1 py-1 w-fit mx-auto'>
        {
          tabsName.map((item, index) => {
            return (
              <div onClick={() => setMyCards(item)} className={`text-[16px] flex flex-row gap-2 ${currentTab === item ? "bg-richblack-900 text-richblack-5 font-medium" : "text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 py-2 px-7`} key={index}>{item}</div>
            )
          })
        }
      </div>
      <div className='lg:h-[350px]'>
        <div className='flex flex-row gap-8'>
          {
            courses.map((item,index) => {
              return (
                <CourseCard key={index} item={item} currentCard={currentCard} setCurrentCard={setCurrentCard} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default ExploreMore