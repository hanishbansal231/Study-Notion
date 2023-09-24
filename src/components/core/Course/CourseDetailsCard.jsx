import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import { toast } from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import {addToCart} from '../../../slices/cartSlice';
function CourseDetailsCard({ course, setComfirmationModal, handleBuyCourse }) {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log("USER -> ", user);
    const {
        courseName,
        thumNail,
        price,
    } = course;
    const handleAddToCart = () => {
        if (user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor, you Cant buy a course");
        }
        if (token) {
            dispatch(addToCart(course));
            return;
        }
        setComfirmationModal({
            text1: "You Are Not Logged in",
            text2: "Please Login To Add to Cart",
            btn1text: "Login",
            btn2text: "Cancel",
            btn1Handler: () => { navigate("/login") },
            btn2Handler: () => { setComfirmationModal(null) }
        });
    }
    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link Copied to Clipboard");
    }
    return (
        <div className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}>
            <img src={thumNail} alt={courseName} className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full" />
            <div className="space-x-3 pb-4 text-3xl font-semibold">
                Rs. {price}
            </div>
            <div className="flex flex-col gap-4">
                <button className="yellowButton" onClick={
                    user && course?.studentEnrolled.includes(user?._id) ? () =>
                        navigate("/dashboard/enrolled-courses") : handleBuyCourse
                }>
                    {
                        user && course?.studentEnrolled.includes(user?._id) ? "Go to Course" : "Buy Now"
                    }
                </button>
                {
                    (!course?.studentEnrolled.includes(user?._id)) && (
                        <button className="blackButton" onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                    )
                }
            </div>
            <div>
                <p className="pb-3 pt-6 text-center text-sm text-richblack-25">30-Days Money-Back Guarantee</p>
                <p className={`my-2 text-xl font-semibold `}>This is Includes:</p>
                <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
                    {
                        course?.instructions?.map((item, index) => (
                            <p key={index} className={`flex gap-2`}>
                                <BsFillCaretRightFill />
                                <span>
                                    {item}
                                </span>
                            </p>
                        ))
                    }
                </div>
            </div>
            <div className="text-center">
                <button className="mx-auto flex items-center gap-2 py-6 text-yellow-100 " onClick={handleShare}> <FaShareSquare size={15} /> Share</button>
            </div>
        </div>
    )
}

export default CourseDetailsCard