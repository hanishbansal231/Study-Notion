import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useForm } from 'react-hook-form';

function ContactUsForm() {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessfull },
    } = useForm();
    const submitContectForm = async (data) => {

    }
    useEffect(() => {
        if (isSubmitSuccessfull) {
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                phoneNo: "",
            });
        }
    }, [isSubmitSuccessfull, reset]);
    return (
        <form onSubmit={handleSubmit(submitContectForm)}>
            <div className='flex flex-col gap-14'>
                <div className='flex gap-5'>
                    <div className='flex flex-col'>
                        <label htmlFor='firstname'>First Name</label>
                        <input type="text" name='firstname' id='firstname' placeholder='Enter first name' {...register("firstname", { required: true })} />
                        {
                            errors.firstname && (
                                <span>Please enter your name</span>
                            )
                        }
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='lastname'>Last Name</label>
                        <input type="text" name='lastname' id='lastname' placeholder='Enter last name' {...register("lastname")} />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='email'>Email Address</label>
                    <input type='email' name='email' id='email' placeholder='Enter email address' {...register("email", { required: true })} />
                    {
                        errors.email && (
                            <span>Please Enter your email</span>
                        )
                    }
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="message">Message</label>
                    <textarea id='message' name='message' placeholder='Enter Your Message Here' cols={30} rows={7} {...register("message", { required: true })}></textarea>
                    {
                        errors.message && (
                            <span>Please Enter your message</span>
                        )
                    }
                </div>
            </div>
            <button type='submit' className='w-full bg-yellow-50 text-center rounded-md px-6 text-[16px] font-bold text-black'>Send Message</button>
        </form>
    )
}

export default ContactUsForm