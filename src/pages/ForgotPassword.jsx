import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {getPasswordResetToken} from '../services/operations/authAPI';
function ForgotPassword() {
    const [emailSend,setEmailSend] = useState(false);
    const [email,setEmail] = useState("");
    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    function handleOnSubmit(e){
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSend));
    }
  return (
    <div className='text-richblack-25 flex justify-center items-center min-h-[70vh] w-[100%]'>
        {
            loading ? (<div>Loading...</div>) : (
                <div className='max-w-[600px]'>
                    <h2>
                        {
                            !emailSend ? "Reset your Password" : "Check Your Email"
                        }
                    </h2>
                    <p>
                        {
                             !emailSend ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to ${email}`
                        }
                    </p>
                    <form onSubmit={handleOnSubmit}>
                        {
                            !emailSend && (
                                <label>
                                    <p>Email Address*</p>
                                    <input  
                                    type='email'
                                    required
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Enter Your Email Address'
                                    />
                                </label>
                            )
                        }
                        <button type='submit'>
                            {
                                !emailSend ? "Reset Password" : "Reset Email"
                            }
                        </button>
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

export default ForgotPassword