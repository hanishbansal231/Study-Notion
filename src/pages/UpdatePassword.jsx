import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useLocation,Link } from 'react-router-dom';
import {resetPassword} from '../services/operations/authAPI';
function UpdatePassword() {
    const dispatch = useDispatch();
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
        dispatch(resetPassword(password,confirmPassword,token))
    }
    return (
        <div className='text-richblack-25'>
            {
                loading ? (<div>Loading....</div>) : (
                    <div>
                        <h2>Choose New Password</h2>
                        <p>Almost done. Enter your new password and youre all set.</p>
                        <form onSubmit={handleOnSubmit}>
                            <label>
                                <p>New Password*</p>
                                <input onChange={handleOnChange} required type={!showPassword ? "password" : "text"} name='password' value={password} />
                                <span onClick={() => setShowPassword((prev) => !prev)}>{!showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</span>
                            </label>
                            <label>
                                <p>New Comfirm Password*</p>
                                <input onChange={handleOnChange} required type={!showConfirmPassword ? "password" : "text"} name='confirmPassword' value={confirmPassword} />
                                <span onClick={() => setShowConfirmPassword((prev) => !prev)}>{!showConfirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</span>
                            </label>
                            <button type='submit'>Reset Password</button>
                        </form>
                        <div>
                            <Link to={"/login"}><p>Back To Login</p></Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default UpdatePassword