import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../../../services/operations/settingAPI';
import IconBtn from '../../../common/IconBtn';
function EditProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    console.log(user);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        contactNumber: "",
        gender: "Male",
        about: "",
    });
    const { firstName, lastName, dateOfBirth, contactNumber, gender, about } = formData;
    const changeHandler = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }
    const submitHandler = (e) => {
        e.preventDefault();
       try{
        dispatch(updateProfile(token, formData, navigate));
       }catch(error){
        console.log(error);
       }
    }
    return (
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
            <h2 className="text-lg font-semibold text-richblack-5">Profile Information</h2>
            <div>
                <form onSubmit={submitHandler} className=' text-richblack-300'>
                    <div className='flex items-center gap-x-5'>
                        <div className='w-[50%]'>
                            <label htmlFor='firstName'>First Name</label>
                            <input className="form-style" onChange={changeHandler} type='text' id='firstName' value={firstName} name='firstName' />
                            <label htmlFor='dateOfBirth'>Date Of Birth</label>
                            <input className="form-style" onChange={changeHandler} type='date' id='dateOfBirth' value={dateOfBirth} name='dateOfBirth' />
                            <label htmlFor='contactNumber'>Contact Number</label>
                            <input className="form-style" onChange={changeHandler} type='text' id='contactNumber' value={contactNumber} name='contactNumber' />
                        </div>
                        <div className='w-[50%]'>
                            <label htmlFor='lastName'>Last Name</label>
                            <input className="form-style" onChange={changeHandler} type='text' id='lastName' value={lastName} name='lastName' />
                            <label htmlFor='gender'>Gender</label>
                            <select name='gender' value={gender} className="form-style" onChange={changeHandler}>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                            <label htmlFor='about'>About</label>
                            <input className="form-style" onChange={changeHandler} type='text' id='about' value={about} name='about' />
                        </div>
                    </div>
                    <div className='flex justify-end gap-2'>
                        <button onClick={() => {
                              navigate("/dashboard/myprofile")
                        }}  className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50">Cancel</button>
                        <IconBtn type="submit" text="Save" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfile