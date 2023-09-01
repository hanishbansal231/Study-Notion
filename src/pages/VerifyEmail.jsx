import React, { useState, useEffect } from 'react';
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, signUp } from '../services/operations/authAPI';
import { useNavigate, Link } from 'react-router-dom';

function VerifyEmail() {
    const [otp, setOtp] = useState('');
    const { signupData, loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!signupData) {
            // Redirect to the signup page if signupData is missing.
            navigate('/signup');
        }
    }, [signupData, navigate]);

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
        <div className='text-richblack-25'>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <h2>Verify Email</h2>
                    <p>A Verification code has been sent to you. Enter the code below</p>
                    <form onSubmit={handleOnSubmit}>
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                           renderInput={(props) => <input {...props}  />}
                        />
                        <button type='submit'>Verify Email</button>
                    </form>
                    <div>
                        <div>
                            <Link to='/login'>
                                <p>Back To Login</p>
                            </Link>
                        </div>
                        <button onClick={() => dispatch(sendOtp(signupData.email))}>
                            Resend OTP
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default VerifyEmail;
