import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderSteps from '../AddCourse/RenderSteps';
import { useEffect } from 'react';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI';
export default function EditCourse() {
    const dispatch = useDispatch();
    const { courseId } = useParams();
    console.log("courseId", courseId)
    const { course } = useSelector((state) => state.course);
    console.log("course",course);
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (async () => {
            setLoading(true)
            const result = await getFullDetailsOfCourse(courseId, token)
            if (result?.courseDetails) {
              dispatch(setEditCourse(true))
              dispatch(setCourse(result?.courseDetails))
            }
            setLoading(false)
          })()
    },[]);
    if (loading) {
        return (
            <div className="grid flex-1 place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }
    return (
        <div>
            <h2>Edit Course</h2>
            <div>
                {
                    course ? <RenderSteps /> : (<p>Course Not Found</p>)
                }
            </div>
        </div>
    )
}