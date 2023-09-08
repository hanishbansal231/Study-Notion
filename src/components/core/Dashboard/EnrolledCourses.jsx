import ProgressBar from '@ramonak/react-progress-bar';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {getUserEnrolledCourses} from '../../../services/operations/profileAPI'
function EnrolledCourses() {
    const { token } = useSelector((state) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const getEnrolledCourses = async () => {
        try {
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        } catch (error) {
            console.log(`Unable to Fetch Enrolled Courses ${error}`);
        }
    }
    useEffect(() => {
        getEnrolledCourses();
    }, [])
    return (
        <div className='text-white'>
            <div>Enrolled Courses</div>
            {
                !enrolledCourses ? (<div></div>)
                    :
                    !enrolledCourses.length ? (<p>You have not enrolled in any course yet</p>)
                        : (
                            <div>
                                <div>
                                    <p>Courses</p>
                                    <p>Duration</p>
                                    <p>Progress</p>
                                </div>
                                {
                                    enrolledCourses.map((course, index) => (
                                        <div key={index} className="">
                                            <div className="">
                                                <img src={course.thumbnail} />
                                                <div>
                                                    <p>{course.courseName}</p>
                                                    <p>{course.courseDescription}</p>
                                                </div>
                                            </div>
                                            <div>
                                                {course?.totalDuration}
                                            </div>
                                            <div>
                                                <p>Progress:{course.progressPercentage || 0}%</p>
                                                <ProgressBar
                                                completed={course.progressPercentage || 0}
                                                height='8px'
                                                isLabelVisible={false}
                                                 />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
            }
        </div>
    )
}

export default EnrolledCourses