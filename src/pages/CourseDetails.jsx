import React from 'react'
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import { useEffect } from 'react';
import { useState } from 'react';
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import Error from './Error';
import ComfirmationModal from '../components/common/ComfirmationModal';
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';
import CourseAccordionBar from '../components/core/Course/CourseAccordionBar';
import {formatDate} from '../services/formatDate';
import RatingStars from '../components/common/RatingStars'
function CourseDetails() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { loading } = useSelector((state) => state.profile);
  console.log("courseId", courseId);
  const [courseData, setCourseData] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  const [comfirmationModal, setComfirmationModal] = useState(null);
  const [isActive, setIsActive] = useState(Array(0));
  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id) ? isActive.concat(id) : isActive.filter((e) => e !== id)
    )
  }
  useEffect(() => {
    const getCourseFullDetails = async () => {
      try {
        const result = await fetchCourseDetails(courseId);
        setCourseData(result);

      } catch (error) {
        console.log(error.message);
      }
    }
    getCourseFullDetails();
  }, [courseId]);
  console.log("courseData", courseData)
  // useEffect(() => {
  //     const count = GetAvgRating(courseData);
  // },[courseData]);
  useEffect(() => {
    let lectures = 0;
    courseData?.data?.CourseDetails?.courseContent?.forEach(sec => {
      lectures += sec.subSection.length || 0;
    });
  }, [courseData]);
  const handleBuyCourse = () => {
    // if(token){
    //     buyCourse(token,[courseId],user,navigate,dispatch);
    //     return;
    // }
    setComfirmationModal({
      text1: "You Are Not Logged in",
      text2: "Please Login To Purchase the course",
      btn1text: "Login",
      btn2text: "Cancel",
      btn1Handler: () => { navigate("/login") },
      btn2Handler: () => { setComfirmationModal(null) }
    })
  }
  if (loading || !courseData) {
    return (
      <div>
        Loading...
      </div>
    )
  }
  if (!courseData.success) {
    return (
      <div>
        <Error />
      </div>
    )
  }
  const {
    _id,
    courseName,
    courseDescription,
    thumNail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentEnrolled,
    createdAt
  } = courseData?.data?.courseDetails;
  return (
    <>
      <div className={`relative w-full bg-richblack-800`}>
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
          <div className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}>
            <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">{courseName}</p>
            <p className={`text-richblack-200`}>{courseDescription}</p>
            <div className="text-md flex flex-wrap items-center gap-2">
              <span>{avgReviewCount}</span>
              <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
              <span>{`(${ratingAndReviews.length} reviews)`}</span>
              <span>{`(${studentEnrolled.length} student enrolled)`}</span>
            </div>
            <div>
              <p>Created By {`${instructor.firstName}`} {`${instructor.lastName}`}</p>
            </div>
            <div className="flex flex-wrap gap-5 text-lg">
              <p className="flex items-center gap-2">
                {" "}
                <BiInfoCircle /> Created At {formatDate(createdAt)}
              </p>
              <p className="flex items-center gap-2">
                {" "} <HiOutlineGlobeAlt /> English
              </p>
            </div>
            <div className="right-[1rem] top-[50px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
              <CourseDetailsCard
                course={courseData?.data?.courseDetails}
                setComfirmationModal={setComfirmationModal}
                handleBuyCourse={handleBuyCourse}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative text-white">
        <div className="max-w-[830px] ">
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">What You Will Learn</p>
            <div className="mt-5">
              <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
            </div>
          </div>
          <div>
            <p className="text-[28px] font-semibold">Course Content:</p>
          </div>
          <div className="flex flex-wrap justify-between gap-2">
            <div className="flex gap-2">
              <span>{courseContent.length} section(s)</span>
              <span>{totalNoOfLectures} lectures</span>
              <span>{courseData.data?.totalDuration} total length</span>
            </div>
            <div>
              <button onClick={() => setIsActive([])}>
                Collapse all sections
              </button>
            </div>
          </div>
          <div className="py-4">
            {courseContent?.map((course, index) => (
              <CourseAccordionBar
                course={course}
                key={index}
                isActive={isActive}
                handleActive={handleActive}
              />
            ))}
          </div>
          <div className="mb-12 py-4">
            <p className="text-[28px] font-semibold">Author</p>
            <div className="flex items-center gap-4 py-4">
              <img src={
                instructor.image
                  ? instructor.image
                  : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
              } 
              alt="Author"
              className="h-14 w-14 rounded-full object-cover"
              />
              <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
            </div>
            <p>{instructor?.additionalDetails?.about}</p>
          </div>
        </div>
      </div>
      {
        comfirmationModal && (<ComfirmationModal modalData={comfirmationModal} />)
      }
    </>
  )
}

export default CourseDetails