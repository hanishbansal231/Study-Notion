import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RxDropdownMenu } from 'react-icons/rx';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BiSolidDownArrow } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import ComfirmationModal from '../../../../common/ComfirmationModal'
import SubSectionModal from './SubSectionModal';
import { setCourse } from '../../../../../slices/courseSlice';
import {deleteSection,deleteSubSection} from '../../../../../services/operations/courseDetailsAPI';
function NestedView({ handleChangeEditSectionName }) {
    const { course } = useSelector((state) => state.course);
    console.log("Course -> ",course);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);
    const [comfirmationModal, setComfirmationModal] = useState(null);
    const handleDeleteSection = async (sectionId) => { 
        const result = await deleteSection({sectionId,courseId:course._id},token);
        if(result){
            dispatch(setCourse(result));
        }
        
    }
    const handleDeleteSubSection = async (subSectionId, sectionId) => { 
        const result = await deleteSubSection({subSectionId,sectionId},token);
        if(result){
            const updateCourseContent = course.courseContent.map((section) => section._id === sectionId ? result : section);
            const updateCourse = {...course,courseContent:updateCourseContent};
            dispatch(setCourse(updateCourse));
        }
        setComfirmationModal(null);
    }
    return (
        <div className='mt-10'>
            <div className='rounded-md bg-richblack-700 p-6 px-8'>
                {
                    course.courseContent?.map((section) => (
                        <details key={section._id} open>
                            <summary className='flex items-center justify-between gap-x-3 border-b-2'>
                                <div className='flex items-center gap-x-3'>
                                    <RxDropdownMenu />
                                    <p>{section.sectionName}</p>
                                </div>
                                <div className='flex items-center gap-x-3'>
                                    <button
                                        onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}
                                        className='flex items-center gap-x-3'
                                    >
                                        <MdEdit />
                                    </button>
                                    <button onClick={() => {
                                        setComfirmationModal({
                                            text1: "Delete this Section",
                                            text2: "All the lectures in this section will be deleted",
                                            btn1text: "Delete",
                                            btn2text: "Cancle",
                                            btn1Handler: () => handleDeleteSection(section._id),
                                            btn2Handler: () => setComfirmationModal(null),
                                        })
                                    }}>
                                        <RiDeleteBin6Line />
                                    </button>
                                    <span>|</span>
                                    <BiSolidDownArrow className={`text-xl text-richblack-300`} />
                                </div>
                            </summary>
                            <div>
                                {
                                    section.subSection.map((data) => (
                                        <div key={data?._id} onClick={() => setViewSubSection(data)} className='flex items-center justify-between gap-x-3 border-b-2'>
                                            <div className='flex items-center justify-between'>
                                                <RxDropdownMenu />
                                                <p>{data.title}</p>
                                            </div>
                                            <div className='flex items-center gap-x-3' onClick={(e) => e.stopPropagation()}>
                                                <button
                                                    onClick={() => setEditSubSection({ ...data, sectionId: section._id })}
                                                >
                                                    <MdEdit />
                                                </button>
                                                <button onClick={() => {
                                                    setComfirmationModal({
                                                        text1: "Delete this Section",
                                                        text2: "All the lectures in this section will be deleted",
                                                        btn1text: "Delete",
                                                        btn2text: "Cancle",
                                                        btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                                        btn2Handler: () => setComfirmationModal(null),
                                                    })
                                                }}>
                                                    <RiDeleteBin6Line />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }
                                <button
                                    onClick={() => setAddSubSection(section._id)}
                                    className='mt-4 flex items-center gap-x-2 text-yellow-50'
                                >
                                    <AiOutlinePlus />
                                    <p>Add Lecture</p>
                                </button>
                            </div>
                        </details>
                    ))
                }
            </div>
            {
                addSubSection
                    ? (<SubSectionModal
                        modalData={addSubSection}
                        setModalData={setAddSubSection}
                        add={true}
                    />)
                    : viewSubSection
                        ? (<SubSectionModal
                            modalData={viewSubSection}
                            setModalData={setViewSubSection}
                            view={true}
                        />)
                        : editSubSection
                            ? (<SubSectionModal
                                modalData={editSubSection}
                                setModalData={setEditSubSection}
                                edit={true}
                            />)
                            : (<div></div>)
            }
            {
                comfirmationModal 
                ? (<ComfirmationModal modalData={comfirmationModal
                } />)
                : (<div></div>)
            }
        </div>
    )
}

export default NestedView