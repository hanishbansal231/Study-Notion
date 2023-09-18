import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import {COURSE_STATUS} from '../../../../utils/constants';
import ComfirmationModal from '../../../common/ComfirmationModal';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { useNavigate } from 'react-router-dom';
function CoursesTable({courses,setCourses}) {
    const {token} = useSelector((state) => state.auth);
    const [loading,setLoading] = useState(false);
    const [comfirmationModal,setComfirmationModal] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleCourseDelete = async (courseId) => {
        setLoading(true);
        // await deleteCourse({courseId:courseId},token);
        // const result = await fetchInstructorCourses(token);
        // if(result){
        //     setCourses(result);
        // }
        setComfirmationModal(null);
        setLoading(false);
    }
  return (
    <div className='text-white'>
        <Table>
            <Thead>
                <Tr className='flex justify-between gap-x-10 border-richblack-800 p-8'>
                    <Th>
                        Courses
                    </Th>
                    <Th>
                        Duration
                    </Th>
                    <Th>
                        Price
                    </Th>
                    <Th>
                        Actions
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    courses.length === 0 
                    ? (
                        <Tr>
                            <Td>
                                No Course Found
                            </Td>
                        </Tr>
                    )
                    : (
                        courses?.map((course) => (
                            <Tr key={course._id} className='flex justify-between gap-x-10 border-richblack-800 p-8'>
                                <Td className='flex gap-x-4'>
                                    <img src={course?.thumNail} className='h-[150px] w-[220px] rounded-lg object-cover' />
                                    <div className='flex flex-col'>
                                        <p>{course.courseName}</p>
                                        <p>{course.courseDescription}</p>
                                        <p>Created:</p>
                                        {
                                            course.status === COURSE_STATUS.DRAFT ? (<p className='text-pink-50'>DRAFTED</p>) : (<p className='text-yellow-50'>PUBLISHED</p>)
                                        }
                                    </div>
                                </Td>
                                <Td>
                                    2hr 30min
                                </Td>
                                <Td>
                                    {course.price}
                                </Td>
                                <Td>
                                    <button 
                                    disabled={loading} 
                                    onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                                    className="mr-4"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                    disabled={loading}
                                    onClick={() => {
                                        setComfirmationModal({
                                            text1:"Do you want to delete this course?",
                                            text2: "All the data related to this course will be deleted",
                                            btn1text:!loading ? "Delete" : "Loading...  ",
                                            btn2text:"Cancel",
                                            btn1Handler: !loading ? () => handleCourseDelete(course._id) : () => {},
                                            btn2Handler: !loading ? () => setComfirmationModal(null) : () => {},
                                        })
                                    }}
                                    >
                                        Delete
                                    </button>
                                </Td>
                            </Tr>
                        ))
                    )
                }
            </Tbody>
        </Table>
        {
            comfirmationModal && (<ComfirmationModal modalData={comfirmationModal} />)
        }
    </div>
  )
}

export default CoursesTable