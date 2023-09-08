import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';

function MyProfile() {
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();

    return (
        <div className='flex flex-col gap-10'>
            <h2 className="mb-5 text-3xl font-medium text-richblack-5">My Profile</h2>
            <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
                <div className='flex items-center gap-x-5'>
                    <img src={user?.image} alt={`profile-${user?.firstName}`} className='aspect-square w-[78px] rounded-full object-cover' />
                    <div>
                        <p>{user?.firstName + " " + user?.lastName}</p>
                        <p className='text-richblack-300'>{user?.email}</p>
                    </div>
                </div>
                <IconBtn text={"Edit"} onClick={() => {
                    navigate("/dashboard/settings")
                }} ></IconBtn>
            </div>
            <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
                <div className='flex items-center justify-between'>
                    <p>About</p>
                    <IconBtn
                        text={"Edit"}
                        onClick={() => {
                            navigate("/dashboard/settings")
                        }}
                    />
                </div>
                <p className='text-richblack-300'>{user?.additionalDetails?.about ?? "Write Something about Yourself"}</p>
            </div>
            <div className=" rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
                <div className='flex items-center justify-between'>
                    <p>Personal Details</p>
                    <IconBtn
                        text={"Edit"}
                        onClick={() => {
                            navigate("/dashboard/settings")
                        }}
                    />
                </div>
                <div className='flex items-center justify-between w-[50%]'>
                    <div>
                        <div className='h-[80px]'>
                            <p className='text-richblack-300'>First Name</p>
                            <p>{user?.firstName}</p>
                        </div>
                        <div className='h-[80px]'>
                            <p className='text-richblack-300'>Email</p>
                            <p>{user?.email}</p>
                        </div>
                        <div className='h-[80px]'>
                            <p className='text-richblack-300'>Gender</p>
                            <p>{user?.additionalDetails.gender ?? "Add Gender"}</p>
                        </div>
                    </div>
                    <div>
                        <div className='h-[80px]'>
                            <p className='text-richblack-300'>Last Name</p>
                            <p>{user?.lastName}</p>
                        </div>
                        <div className='h-[80px]'>
                            <p className='text-richblack-300'>Phone Number</p>
                            <p>{user?.additionalDetails.contactNumber ?? "Add Contact Number"}</p>
                        </div>
                        <div className='h-[80px]'>
                            <p className='text-richblack-300'>Date Of Birth</p>
                            <p>{user?.additionalDetails.dateOfBirth ?? "Add Date Of Birth"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile