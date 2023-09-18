import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI'
import IconBtn from '../../common/IconBtn';
import {AiOutlinePlus} from 'react-icons/ai';
import CoursesTable from './InstructorCourses/CoursesTable';
function MyCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  console.log("TOKEN -> ",token);
  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token);
      if (result) {
        setCourses(result)
      }
    }
    fetchCourses();
  }, []);
  console.log("COURSES -> ", courses);
  return (
    <div>
      <div className='flex items-center justify-between'>
        <h2>My Courses</h2>
        <IconBtn text={"Add Courses"} onClick={() => navigate("/dashboard/add-course")} >
          <AiOutlinePlus />
        </IconBtn>
      </div>
      {
        courses && (<CoursesTable courses={courses} setCourses={setCourses} />)
      }
    </div>
  )
}

export default MyCourses