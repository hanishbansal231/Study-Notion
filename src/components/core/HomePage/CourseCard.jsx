import React from 'react'
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";
function CourseCard({ item, currentCard, setCurrentCard }) {
    return (
        <div onClick={() => setCurrentCard(item?.heading)} className={`w-[360px] lg:w-[30%] ${currentCard === item.heading ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50" : "bg-richblack-800"} text-richblack-25 h-[300px] box-border cursor-pointer`}>
            <div className={`border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3`}>
                <h2 className={`${currentCard === item?.heading && "text-richblack-800"} font-semibold text-[20px]`}>
                    {item.heading}
                </h2>
                <p className='text-richblack-400'>{item.description}</p>
              
            </div>
            <div className={`flex justify-between ${currentCard === item?.heading ? "text-blue-300" : "text-richblack-300"
                    } px-6 py-3 font-medium`}>
                    <div className="flex items-center gap-2 text-[16px]" ><HiUsers /><p>{item.level}</p></div>
                    <div className="flex items-center gap-2 text-[16px]">  <ImTree /><p>{item?.lessionNumber} Lession</p></div>
                </div>
        </div>
    )
}

export default CourseCard