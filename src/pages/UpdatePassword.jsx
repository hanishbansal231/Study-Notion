import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useLocation,Link, useNavigate } from 'react-router-dom';
import {resetPassword} from '../services/operations/authAPI';
import { BsArrowLeftShort } from 'react-icons/bs';
function UpdatePassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const { password, confirmPassword } = formData;
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { loading } = useSelector((state) => state.auth);
    const handleOnChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split("/").at(-1);
        dispatch(resetPassword(password,confirmPassword,token,navigate))
    }
    return (
        <div className='text-richblack-25 flex justify-center items-center min-h-[85vh] w-[100%]'>
            {
                loading ? (<div className='spinner'></div>) : (
                    <div className='max-w-[400px]'>
                        <h2 className='text-4xl text-white'>Choose New Password</h2>
                        <p className='text-sm mt-3 mb-3'>Almost done. Enter your new password and youre all set.</p>
                        <form onSubmit={handleOnSubmit}>
                            <label className='relative'>
                                <p>New Password <sup className='text-pink-200'>*</sup></p>
                                <input onChange={handleOnChange} required type={!showPassword ? "password" : "text"} name='password' value={password}  className='w-full h-[50px] bg-richblack-600 text-white p-2 rounded mt-2 mb-4' />
                                <span className='absolute right-4 top-[45px] text-2xl' onClick={() => setShowPassword((prev) => !prev)}>{!showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</span>
                            </label>
                            <label className='relative'>
                                <p>New Comfirm Password <sup className='text-pink-200'>*</sup></p>
                                <input onChange={handleOnChange} required type={!showConfirmPassword ? "password" : "text"} name='confirmPassword' value={confirmPassword}  className='w-full h-[50px] bg-richblack-600 text-white p-2 rounded mt-2 mb-4' />
                                <span className='absolute right-4 top-[95px] text-2xl' onClick={() => setShowConfirmPassword((prev) => !prev)}>{!showConfirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</span>
                            </label>
                            <button className='w-full border-none outline-none bg-yellow-100 text-richblack-900 h-[45px] rounded hover:bg-yellow-50 transition-all delay-200' type='submit'>Reset Password</button>
                        </form>
                        <div className='flex items-center gap-2 text-sm mt-2'>
                           <span className='text-2xl'><BsArrowLeftShort /></span>
                            <Link to={"/login"}><p>Back To Login</p></Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default UpdatePassword