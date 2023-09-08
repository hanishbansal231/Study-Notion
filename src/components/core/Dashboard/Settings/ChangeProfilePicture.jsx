import React from 'react'
import IconBtn from '../../../common/IconBtn';
import { useState } from 'react';
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import {updateDisplayPicture} from '../../../../services/operations/settingAPI';
function ChangeProfilePicture() {
    const fileInputRef = useRef(null);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [imageFile,setImageFile] = useState(null);
    const [previewSource,setPreviewSource] = useState(null);
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const handleClick = () => {
        fileInputRef.current.click();
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
       if(file){
        setImageFile(file);
        previewFile(file);
       }
    }
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }
    const handleFileUpload = () => {
        try{
            console.log("Uploading...");
            setLoading(true);
            const formData = new FormData();
             formData.append("displayPicture",imageFile);
            dispatch(updateDisplayPicture(token,formData)).then(() => {
                setLoading(false)
            })

        }catch(error){
            console.log("ERROR MESSAGE - ", error.message)
        }
    }
    return (
        <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
            <div className="flex items-center gap-x-4">
                <img
                    src={previewSource || user?.image}
                    alt={user?.firstName}
                    className="aspect-square w-[78px] rounded-full object-cover"
                />
                <div className="space-y-2">
                    <p>Change Profile Picture</p>
                    <div className="flex flex-row gap-3">
                        <input
                            type='file'
                            className='hidden'
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/png, image/gif, image/jpeg"
                        />
                        <button onClick={handleClick} className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50">Select</button>
                        <IconBtn onClick={handleFileUpload} text={loading ? "Uploading..." : "Upload"} >
                            {
                                !loading && (
                                    <FiUpload className="text-lg text-richblack-900" />
                                )
                            }
                        </IconBtn>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangeProfilePicture