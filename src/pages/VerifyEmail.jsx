import React, { useState, useEffect } from 'react';
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, signUp } from '../services/operations/authAPI';
import { useNavigate, Link } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';
function VerifyEmail() {
    const [otp, setOtp] = useState('');
    const { signupData, loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!signupData) {
            navigate('/signup');
        }
    }, []);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData;
        dispatch(
            signUp(
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
                navigate
            )
        );
    };

    return (
        <div className='text-richblack-25 flex justify-center items-center min-h-[85vh] w-[100%]'>
            {loading ? (<div className='spinner'></div>) : (
                <div className='max-w-[400px]'>
                    <h2 className='text-4xl text-white'>Verify Email</h2>
                    <p className='text-sm mt-3 mb-3'>A Verification code has been sent to you. Enter the code below</p>
                    <form onSubmit={handleOnSubmit} className='w-full'>
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            containerStyle="otp-container"
                            renderInput={(props) => <input {...props} placeholder='-' style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }} className="w-[60px] border-0 m-1 mb-3 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50" />}
                        />
                        <button className='w-full border-none outline-none bg-yellow-100 text-richblack-900 h-[45px] rounded hover:bg-yellow-50 transition-all delay-200' type='submit'>Verify Email</button>
                    </form>
                    <div className='flex items-center justify-between mt-2'>
                        <div className='flex items-center gap-2 text-sm'>
                            <span className='text-2xl'><BsArrowLeftShort /></span>
                            <Link to={"/login"}><p>Back To Login</p></Link>
                        </div>
                        <button className='text-sm' onClick={() => dispatch(sendOtp(signupData.email))}>
                            Resend OTP
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default VerifyEmail;
