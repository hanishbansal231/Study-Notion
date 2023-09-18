import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { fetchCourseCategories, addCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import RequirementField from './RequirementField';
import { setCourse, setStep } from '../../../../../slices/courseSlice';
import IconBtn from '../../../../common/IconBtn'
import ChipInput from './ChipInput';
import Upload from '../Upload';
import toast from 'react-hot-toast';
import { COURSE_STATUS } from "../../../../../utils/constants"
function CourseInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategory, setCourseCategory] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      try {
        const categories = await fetchCourseCategories();
        console.log(categories);
        if (categories.length > 0) {
          setCourseCategory(categories);
        }
        if (editCourse) {
          setValue("courseTitle", course.courseName);
          setValue("courseShortDesc", course.courseDescription);
          setValue("coursePrice", course.coursePrice);
          setValue("courseTags", course.courseTag);
          setValue("courseBenefits", course.whatYouWillLearn);
          setValue("courseCategory", course.category);
          setValue("courseRequirement", course.instructions);
          setValue("courseImage", course.thumbnail);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getCategories();
  }, []);

  const isFormUpdate = () => {
    const currentValue = getValues();
    if (
      currentValue.courseTitle !== course.courseName ||
      currentValue.courseShortDesc !== course.courseDescription ||
      currentValue.coursePrice !== course.coursePrice ||
      currentValue.courseTags.toString() !== course.courseTag.toString() ||
      currentValue.courseBenefits !== course.whatYouWillLearn ||
      currentValue.courseCategory._id !== course.category._id ||
      currentValue.courseImage !== course.thumbnail ||
      currentValue.courseRequirement.toString() !== course.instructions.toString()
    ) {
      return true;
    } else {
      return false;
    }
  }
  const onSubmit = async (data) => {

    if (editCourse) {
    
      if (isFormUpdate()) {
        const currentValues = getValues()
        const formData = new FormData()
        // console.log(data)
        formData.append("courseId", course._id)
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc)
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice)
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags))
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits)
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory_.id)
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          )
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)
        }
        // console.log("Edit Form data: ", formData)
        setLoading(true)
        // const result = await editCourseDetails(formData, token)
        const result = false;
        setLoading(false)
        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }
    const formData = new FormData()
    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    formData.append("tag", JSON.stringify(data.CouseTags))
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.courseRequirement))
    formData.append("thumbnailImage", data.courseImage)
    console.log("Data -> ",data);
    setLoading(true)
    const result = await addCourseDetails(formData, token)
    console.log("TOKEN CHECK ->",token);
    if (result) {
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }
    setLoading(false)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'>
      <div>
        <label className="text-sm text-richblack-5" htmlFor='courseTitle'>Course Title<sup className="text-pink-200">*</sup></label>
        <input className="form-style w-full" id='courseTitle' placeholder='Enter Course Title' {...register("courseTitle", { required: true })} />
        {
          errors.courseTitle && (
            <span  className="ml-2 text-xs tracking-wide text-pink-200">Course Title is Required</span>
          )
        }
      </div>
      <div>
        <label className="text-sm text-richblack-5" htmlFor='courseShortDesc'>Course Short Description<sup className="text-pink-200">*</sup></label>
        <textarea   className="form-style resize-x-none min-h-[130px] w-full" id="courseShortDesc" placeholder='Enter Description' {...register("courseShortDesc", { required: true })}></textarea>
        {
          errors.courseShortDesc && (
            <span  className="ml-2 text-xs tracking-wide text-pink-200">Course Description is Required </span>
          )
        }
      </div>
      <div className='relative'>
        <label className="text-sm text-richblack-5" htmlFor='coursePrice'>Course Price<sup className="text-pink-200">*</sup></label>
        <input id='coursePrice' placeholder='Enter Course Price' {...register("coursePrice", { required: true, valueAsNumber: true, })}    className="form-style w-full !pl-10" />
        <HiOutlineCurrencyRupee className="absolute left-3 top-[57px] inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        {
          errors.coursePrice && (
            <span  className="ml-2 text-xs tracking-wide text-pink-200">Course Price is Required</span>
          )
        }
      </div>
      <div>
        <label className="text-sm text-richblack-5" htmlFor='courseCategory'>Course Category<sup className="text-pink-200">*</sup></label>
        <select className="form-style w-full" id='courseCategory' defaultValue="" {...register("courseCategory", { required: true })}>
          <option value="" disabled>Choose A Category</option>
          {
            !loading && courseCategory.map((category, index) => (
              <option key={index} value={category?._id}>
                {
                  category?.name
                }
              </option>
            ))
          }
        </select>
        {
          errors.courseCategory && (
            <span  className="ml-2 text-xs tracking-wide text-pink-200">Course Category is Required</span>
          )
        }
      </div>
      <ChipInput 
      label={"Tags"}
      name="CouseTags"
      placeholder="Enter tags and press enter"
      register={register}
      errors={errors}
      getValues={getValues}
      setValue={setValue}
      />
      <Upload 
       name="courseImage"
       label="Course Thumbnail"
       register={register}
       setValue={setValue}
       errors={errors}
       editData={editCourse ? course?.thumbnail : null}
      />
      <div>
        <label className="text-sm text-richblack-5" htmlFor="coursebenifits">Benefits of the course<sup className="text-pink-200">*</sup></label>
        <textarea
          id='coursebenifits'
          placeholder='Enter benefits of the course'
          {...register("courseBenefits", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {
          errors.courseBenefits && (
            <span  className="ml-2 text-xs tracking-wide text-pink-200">Course Benefits is Required</span>
          )
        }
      </div>
      <RequirementField
        name="courseRequirement"
        label="Requirements/Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      <div>
        {
          editCourse && (
            <button
              onClick={() => dispatch(setStep(2))}
              className='flex items-center gap-x-2 bg-richblack-300'
            >
              Continue Without Saving
            </button>
          )
        }
        <IconBtn text={!editCourse ? "Next" : "Save Changes"} />
      </div>
    </form>
  )
}

export default CourseInformationForm