import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../../common/IconBtn';
import {resetCourseState, setStep} from '../../../../../slices/courseSlice';
import { useNavigate } from 'react-router-dom';
import {COURSE_STATUS} from '../../../../../utils/constants';
import { useEffect } from 'react';
import {editCourseDetail} from '../../../../../services/operations/courseDetailsAPI';
export default function PublishCourse() {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,

    } = useForm();
    useEffect(() => {
        if(course?.status === COURSE_STATUS.PUBLISHED){
            setValue('public',true)
        }
    },[])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const [loading,setLoading] = useState(false);
    const goBack = () => {dispatch(setStep(2))}
    const goTOCourse = () => {
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses");
    }
    const handleCoursePublish = async () => {
        if((course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) || (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)){
            goTOCourse();
            return;
        }
        console.log("handleCoursePublish......");
        const fromData = new FormData();
        fromData.append("courseId",course._id);
        console.log(course._id);
        const courseStatus = getValues('public') ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        console.log(courseStatus);
        fromData.append("status",courseStatus);
        setLoading(true);
        const result = await editCourseDetail(fromData,token);
        if(result){
            goTOCourse();
        }
        setLoading(false);
    }
    const onSubmit = () => {
        console.log("onSubmit......");
        handleCoursePublish();
    }
    return (
        <div className='rounded-md border-[1px] bg-richblack-800 p-6 border-richblack-700 text-white'>
            <p>Publish Course</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="public">
                    <input 
                    type='checkbox'
                    id='public'
                    {...register('public')}
                    className='rounded h-4 w-4'
                    />
                    <span className='ml-3'>Make this Course as Publish</span>
                    </label>
                </div>
                <div className='flex justify-end gap-x-4'>
                    <button className='bg-richblack-300 flex items-center rounded-md px-5' disabled={loading} type='button' onClick={goBack}>Back</button>
                <IconBtn disabled={loading} text={"Save Changes"} />
                </div>
            </form>
        </div>
    )
}