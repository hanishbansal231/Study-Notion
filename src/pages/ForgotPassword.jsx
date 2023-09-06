import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';
import { BsArrowLeftShort } from 'react-icons/bs';
function ForgotPassword() {
    const [emailSend, setEmailSend] = useState(false);
    const [email, setEmail] = useState("");
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    function handleOnSubmit(e) {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSend));
    }
    return (
        <div className='text-richblack-25 flex justify-center items-center min-h-[85vh] w-[100%]'>
            {
                loading ? (<div className='spinner'></div>) : (
                    <div className='max-w-[400px]'>
                        <h2 className='text-4xl text-white'>
                            {
                                !emailSend ? "Reset your Password" : "Check Your Email"
                            }
                        </h2>
                        <p className='text-md mt-3 mb-3'>
                            {
                                !emailSend ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to ${email}`
                            }
                        </p>
                        <form onSubmit={handleOnSubmit}>
                            {
                                !emailSend && (
                                    <label className='text-white'>
                                        <p>Email Address <sup className='text-pink-200'>*</sup></p>
                                        <input
                                            type='email'
                                            required
                                            name='email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder='Enter Your Email Address'
                                            className='w-full h-[50px] bg-richblack-600 text-white p-2 rounded mt-2 mb-4'
                                        />
                                    </label>
                                )
                            }
                            <button type='submit' className='w-full border-none outline-none bg-yellow-100 text-richblack-900 h-[45px] rounded hover:bg-yellow-50 transition-all delay-200'>
                                {
                                    !emailSend ? "Reset Password" : "Reset Email"
                                }
                            </button>
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

export default ForgotPassword