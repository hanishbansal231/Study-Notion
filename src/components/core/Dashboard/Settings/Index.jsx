import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
function index() {
  return (
    <div className='text-white w-full'>
      <h2 className="mb-14 text-3xl font-medium text-richblack-5"> Edit Profile</h2>
      <ChangeProfilePicture />
      <EditProfile />
    </div>
  )
}

export default index