import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import { BsPlusCircle } from 'react-icons/bs'
import { BiRightArrow } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection,updateSection } from '../../../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView';
function CourseBuilderForm() {
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const disptach = useDispatch();
  const { course } = useSelector((state) => state.course);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const cancleEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  }
  const goToBack = () => {
    disptach(setStep(1));
    disptach(setEditCourse(true));
  }
  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add atleast one section");
      return;
    }
    if (course.courseContent.some((section) => section.subSection.length === 0)) {
      toast.error("Please add atleast one section in each section");
      return;
    }
    disptach(setStep(3));
  }
  const onSubmit = async (data) => {
    setLoading(true);
    let result;
    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        }, token
      )
    } else {
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course._id,
      }, token
      )
    }
    if(result){
      disptach(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }
  }
  const handleChangeEditSectionName = (sectionId,sectionName) =>{
   if(editSectionName === sectionId){
    cancleEdit();
    return;
   }
   setEditSectionName(sectionId);
   setValue("sectionName",sectionName);
  }
  return (
    <div className='text-white'>
      <h2>Course Builder</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="sectionName">Section name <sup>*</sup></label>
          <input className='w-full' type='text' id='sectionName' placeholder='Add Section Name' {...register("sectionName", { required: true })} />
          {
            errors.sectionName && (
              <span>Section Name is Required</span>
            )
          }
        </div>
        <div className='mt-10 flex gap-x-5'>
          <IconBtn type="Submit" text={editSectionName ? "Edit Section Name" : "Create Course"} outline={true} customClasses={"text-white"} >
            <BsPlusCircle className='text-yellow-50' />
          </IconBtn>
          {
            editSectionName && (
              <button type='button' onClick={cancleEdit} className='text-sm text-richblack-300 underline'>
                Cancel Edit
              </button>
            )
          }
        </div>
      </form>
      {
        course.courseContent.length > 0 && (
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
        )
      }
      <div className='flex justify-end gap-x-3'>
        <button onClick={goToBack}>Back</button>
        <IconBtn text={"Next"} onClick={goToNext}><BiRightArrow /></IconBtn>
      </div>
    </div>
  )
}

export default CourseBuilderForm