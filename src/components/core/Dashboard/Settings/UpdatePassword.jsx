import React from 'react'
import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import IconBtn from '../../../common/IconBtn';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {changePassword} from '../../../../services/operations/settingAPI';
function UpdatePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token} = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: ""
  })
  const { oldPassword, newPassword } = formData;
  const [showOldPassword, setOldShowPassword] = useState(false);
  const [showNewShowPassword, setNewShowPassword] = useState(false);
  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  const submitHandler = (e) => {
    e.preventDefault();
    try{
      dispatch(changePassword(token,formData));
    }catch(error){
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  return (
    <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
      <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
      <div>
        <form onSubmit={submitHandler}>
          <div className='flex gap-x-3'>
            <div className='relative flex flex-col gap-2 w-[48%]'>
              <label htmlFor='oldPassword'>Current Password</label>
              <input name='oldPassword' value={oldPassword} id='oldPassword' onChange={changeHandler} className="form-style" type={!showOldPassword ? "password" : "text"} />
              <span onClick={() => {
                setOldShowPassword((prev) => !prev)
              }} className="absolute right-3 top-[50px] z-[10] cursor-pointer">
                {
                  !showOldPassword ? <AiOutlineEye fontSize={24} fill="#AFB2BF" /> : <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                }
              </span>
            </div>
            <div className='relative flex flex-col gap-2 w-[48%]'>
              <label htmlFor='newPassword'>New Password</label>
              <input name='newPassword' value={newPassword} id='newPassword' onChange={changeHandler} className="form-style" type={!showNewShowPassword ? "password" : "text"} />
              <span onClick={() => {
                setNewShowPassword((prev) => !prev)
              }} className="absolute right-3 top-[50px] z-[10] cursor-pointer">
                {
                  !showNewShowPassword ? <AiOutlineEye fontSize={24} fill="#AFB2BF" /> : <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                }
              </span>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => {
              navigate("/dashboard/myprofile");
            }} className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50">Cancel</button>
            <IconBtn text={"Update"} type={"submit"} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdatePassword