import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import RequirementField from './RequirementField';
import { setCourse, setStep } from '../../../../../slices/courseSlice';
import IconBtn from '../../../../common/IconBtn'
import toast from 'react-hot-toast';
function CourseInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
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
          setValue("courseRequirement", course.instruction);
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
      // currentValue.courseTags.toString() !== course.courseTag.toString() ||
      currentValue.courseBenefits !== course.whatYouWillLearn ||
      currentValue.courseCategory._id !== course.category._id ||
      // currentValue.courseImage !== course.thumbnail ||
      currentValue.courseRequirement.toString() !== course.instruction.toString()
    ) {
      return true;
    } else {
      return false;
    }
  }
  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdate()) {
        const currentValue = getValues();
        const formData = new FormData();
        formData.append("courseId", course._id);
        if (currentValue.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        }
        if (currentValue.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseTitle)
        }
        if (currentValue.coursePrice !== course.coursePrice) {
          formData.append("price", data.coursePrice)
        }
        // if(currentValue.courseTags !== course.courseTag){
        //   formData.append("courseTag",data.courseTags)
        // }
        if (currentValue.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits)
        }
        if (currentValue.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory)
        }
        // if (currentValue.courseImage !== course.thumbnail) {
        //   formData.append("thumbnail", data.courseImage)
        // }
        if (currentValue.courseRequirement.toString() !== course.instruction.toString()) {
          formData.append("instruction", JSON.stringify(data.courseRequirement))
        }
        setLoading(true);
        try {
          const result = 0;
          // const result = await editCourseDetails(formData, token);
          if (result) {
            setStep(2);
            dispatch(setCourse(result));
          }
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      }else{
        toast.error("No Changes Made So Far");
      }
      return;
    }
    const formData = new FormData();
    formData.append("courseName",data.courseTitle);
    formData.append("courseDescription",data.courseShortDesc);
    formData.append("price",data.coursePrice);
    formData.append("whatYouWillLearn",data.courseBenefits);
    formData.append("category",data.courseCategory);
    formData.append("instruction",data.JSON.stringify(data.courseRequirement));
    formData.append("courseName",data.courseTitle);
    formData.append("courseName",data.courseTitle);
    // formData.append("status",COURSE_STATUS.DRAFT);
    setLoading(true);
    const result = 0;
    // const result = await addCourseDetails(formData,token);
    if(result){
      setStep(2);
      dispatch(setCourse(result));
    }
    setLoading(false);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'>
      <div>
        <label htmlFor='courseTitle'>Course Title<sup>*</sup></label>
        <input id='courseTitle' placeholder='Enter Course Title' {...register("courseTitle", { required: true })} className='w-full' />
        {
          errors.courseTitle && (
            <span>Course Title is Required</span>
          )
        }
      </div>
      <div>
        <label htmlFor='courseShortDesc'>Course Short Description<sup>*</sup></label>
        <textarea className='min-h-[140px] w-full' id="courseShortDesc" placeholder='Enter Description' {...register("courseShortDesc", { required: true })}></textarea>
        {
          errors.courseShortDesc && (
            <span>Course Description is Required </span>
          )
        }
      </div>
      <div className='relative'>
        <label htmlFor='coursePrice'>Course Price<sup>*</sup></label>
        <input id='coursePrice' placeholder='Enter Course Price' {...register("coursePrice", { required: true, valueAsNumber: true, })} className='w-full' />
        <HiOutlineCurrencyRupee className='absolute top-1/2 text-richblack-400' />
        {
          errors.coursePrice && (
            <span>Course Price is Required</span>
          )
        }
      </div>
      <div>
        <label htmlFor='courseCategory'>Course Category<sup>*</sup></label>
        <select className='w-full text-black' id='courseCategory' defaultValue="" {...register("courseCategory", { required: true })}>
          <option value="" disabled>Choose A Category</option>
          {
            !loading && courseCategory.map((category, index) => (
              <option key={index} value={category?.id}>
                {
                  category?.name
                }
              </option>
            ))
          }
        </select>
        {
          errors.courseCategory && (
            <span>Course Category is Required</span>
          )
        }
      </div>
      {/* <ChipInput 
      label={"Tags"}
      name="CouseTags"
      placeholder="Enter tags and press enter"
      register={register}
      errors={errors}
      getValues={getValues}
      setValue={setValue}
      /> */}
      {/* <Upload 
      name=""
      label=""
      register={register}
      setValue={setValue}
      errors={errors}
      /> */}
      <div>
        <label htmlFor="coursebenifits">Benefits of the course<sup>*</sup></label>
        <textarea
          id='coursebenifits'
          placeholder='Enter benefits of the course'
          {...register("courseBenefits", { required: true })}
          className='min-h-[130px] w-full'
        />
        {
          errors.courseBenefits && (
            <span>Course Benefits is Required</span>
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