import React, { useRef } from 'react'
import { useState } from 'react';
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import {logout} from '../../../services/operations/authAPI';
function ProfileDropDown() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef(null);
  const { user } = useSelector((state) => state.profile);
  const [open, setOpen] = useState(false);
  if(!user) return null;
  return (
    <div className='text-richblack-25'>
      <button className='relative' onClick={() => setOpen(true)}>
        <div className='flex items-center gap-1'>
          <img src={user?.image} alt={user?.firstName} className='w-[30px] rounded-full aspect-square' />
          <AiOutlineCaretDown className='text-md text-richblack-100' />
        </div>
       {open && 
       (
         <div ref={ref} onClick={(e) => e.stopPropagation()} className='absolute bg-richblack-800 border-richblack-700 overflow-hidden rounded-md border-[1px] top-[130%] right-0 z-[1000] divide-y-[1px] divide-richblack-700'>

         <Link to="/dashboard/my-profile">
           <div className='flex items-center gap-2 w-full  hover:bg-richblack-700 hover:text-richblack-25" p-3 px-10'>
             <VscDashboard className="text-lg" />
             Dashboard
           </div>
         </Link>

         <div onClick={() => {
          dispatch(logout(navigate));
          setOpen(false);
         }} className='flex items-center gap-2 w-full  hover:bg-richblack-700 hover:text-richblack-25" p-3 px-10'>
           <VscSignOut className="text-lg" />
           Logout
         </div>
       </div>
       )
       }
      </button>
    </div>
  )
}

export default ProfileDropDown