import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../../../services/operations/settingAPI';
function EditProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useSelector((state) => state.auth);
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
        dispatch(updateProfile(token, formData, navigate));
    }
    console.log(formData);
    return (
        <div>
            <h2>Profile Information</h2>
            <div>
                <form onSubmit={submitHandler} className='flex items-center gap-x-5 text-richblack-300'>
                    <div className='w-[50%]'>
                        <label htmlFor='firstName'>First Name</label>
                        <input className='w-full' onChange={changeHandler} type='text' id='firstName' value={firstName} name='firstName' />
                        <label htmlFor='dateOfBirth'>Date Of Birth</label>
                        <input className='w-full' onChange={changeHandler} type='date' id='dateOfBirth' value={dateOfBirth} name='dateOfBirth' />
                        <label htmlFor='contactNumber'>Contact Number</label>
                        <input className='w-full' onChange={changeHandler} type='text' id='contactNumber' value={contactNumber} name='contactNumber' />
                    </div>
                    <div>
                    <label htmlFor='lastName'>Last Name</label>
                        <input className='w-full' onChange={changeHandler} type='text' id='lastName' value={lastName} name='lastName' />
                        <label htmlFor='gender'>Gender</label>
                       <select name='gender' value={gender} className='w-full' onChange={changeHandler}>
                        <option>Male</option>
                        <option>Female</option>
                       </select>
                        <label htmlFor='about'>About</label>
                        <input className='w-full' onChange={changeHandler} type='text' id='about' value={about} name='about' />
                    </div>
                    <button type='submit'>Save</button>
                </form>
            </div>
        </div>
    )
}

export default EditProfile