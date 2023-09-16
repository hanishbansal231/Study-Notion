import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../../../../slices/courseSlice';
import { RxCross1 } from 'react-icons/rx';
import Upload from '../Upload';
import IconBtn from '../../../../common/IconBtn';
import {createSubSection,updateSubSection} from '../../../../../services/operations/courseDetailsAPI';
function SubSectionModal({
  modalData,
  setModalData,
  add,
  view,
  edit,
}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    getValues,
  } = useForm();
  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVedio", modalData.videoUrl);
    }
  }, [])
  const isFormUpdated = () => {
    const currentValues = getValues();
    if (currentValues.lectureTitle !== modalData.title || currentValues.lectureDesc !== modalData.description || currentValues.lectureVedio !== modalData.videoUrl) {
      return true;
    } else {
      return false;
    }
  }
  const handleEditSubSection = async (data) => {
    const currentValues = getValues();
    const formData = new FormData();
    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);
    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", data.lectureTitle);
    }
    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", data.lectureDesc);
    }
    if (currentValues.lectureVedio !== modalData.videoUrl) {
      formData.append("vedio", data.lectureVedio);
    }
    setLoading(true);
    const result = await updateSubSection(formData, token);
    console.log(result);
    if (result) {
      const updateCourseContent = course.courseContent.map((section) => section._id ===  modalData.sectionId ? result : section);
      const updateCourse = {...course,courseContent:updateCourseContent};
      dispatch(setCourse(updateCourse));
    }
    setModalData(null);
    setLoading(false);
  }
  const onSubmit = async (data) => {
    if (view) {
      return;
    }
    if (edit) {
      if (!isFormUpdated) {
        toast.error("No Changes made to the form");
      } else {
        handleEditSubSection(data);
      }
      return;
    }
    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("vedio", data.lectureVedio);
    setLoading(true);
    const result = await createSubSection(formData, token);
    if (result) {
      const updateCourseContent = course.courseContent.map((section) => section._id ===  modalData ? result : section);
      const updateCourse = {...course,courseContent:updateCourseContent};
      dispatch(setCourse(updateCourse));
    }
    setModalData(null);
    setLoading(false);
  }
  console.log(modalData);
  return (
    <div>
      <div>
        <div>
          <p>{view && "Viewing"}{add && "Adding"}{edit && "Editing"}Lecture</p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross1 />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Upload
            name={"lectureVedio"}
            label={"Lecture Vedio"}
            register={register}
            errors={errors}
            setValue={setValue}
            video={true}
            viewData={view ? modalData.vedioUrl : null}
            editData={edit ? modalData.vedioUrl : null}
          />
          <div>
            <label htmlFor="lectureTitle">Lecture Title</label>
            <input className="form-style w-full" type="text" id='lectureTitle' placeholder='Enter Lecture Titlte' {...register("lectureTitle", { required: true })} />
            {
              errors.lectureTitle && (
                <span>Lecture Title is Required</span>
              )
            }
          </div>
          <div>
            <label htmlFor="lectureDesc">Lecture Description</label>
            <textarea className="form-style resize-x-none min-h-[130px] w-full" type="text" id='lectureDesc' placeholder='Enter Lecture Description' {...register("lectureDesc", { required: true })} />
            {
              errors.lectureDesc && (
                <span>Lecture Description is Required</span>
              )
            }
          </div>
          {
            !view && (
              <div>
                <IconBtn
                text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
                />
              </div>
            )
          }
        </form>
      </div>
    </div>
  )
}

export default SubSectionModal