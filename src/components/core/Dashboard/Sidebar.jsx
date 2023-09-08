import React from 'react';
import { useDispatch } from 'react-redux';
import { sidebarLinks } from '../../../data/dashboard-links';
import { logout } from '../../../services/operations/authAPI';
import { useSelector } from 'react-redux';
import SidebarLink from './SidebarLink';
import { VscSettingsGear, VscSignOut } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ComfirmationModal from '../../common/ComfirmationModal';
function Sidebar() {
    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal,setConfirmationModal] = useState(null);
    if (profileLoading || authLoading) {
        return (
            <div className='mt-10'>
                Loading...
            </div>
        )
    }
    return (
        <div className='text-white fixed'>
            <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-300 min-h-[calc(100vh-3.5rem)]'>
                <div className='flex flex-col'>
                    {
                        sidebarLinks.map((link) => {
                            if (link.type && user.accountType !== link.type) return null;
                            return (
                                <SidebarLink key={link.id} link={link} iconName={link.icon} />
                            )
                        })
                    }
                </div>
                <div className='mx-auto mt-6 mb-6 h-[1px] w-11/12 bg-richblack-600'></div>
                <div>
                    <SidebarLink link={{ name: "Setting", path: "/dashboard/settings" }} iconName={"VscSettingsGear"} />
                    <button onClick={() => setConfirmationModal({
                        text1: "Are You Sure?",
                        text2: "You will be logged out of your account",
                        btn1text: "Logout",
                        btn2text: "Cancel",
                        btn1Handler: () => dispatch(logout(navigate)),
                        btn2Handler: () => setConfirmationModal(null),
                    })} className='text-sm font-medium text-richblack-300 '>
                        <div className='flex items-center gap-x-2'>
                            <VscSignOut className='text-lg' />
                            <span>Logout</span>
                        </div>
                    </button>
                </div>
            </div>
            {confirmationModal && <ComfirmationModal modalData={confirmationModal} />}
        </div>
    )
}

export default Sidebar