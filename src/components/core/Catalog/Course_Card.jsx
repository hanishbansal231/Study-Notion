import React from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../../common/RatingStars'
function Course_Card({course,Height}) {
    console.log("course -> ",course);
    return (
        <div>
            <Link to={`/course/${course._id}`}>
                <div>
                    <div className="rounded-lg">
                        <img src={course?.thumNail} alt={course?.courseName}  className={`${Height} w-full rounded-xl object-cover `} />
                    </div>
                    <div className="flex flex-col gap-2 px-1 py-3">
                        <p className="text-xl text-richblack-5">{course?.courseName}</p>
                        <p className="text-sm text-richblack-50">{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                        <div className="flex items-center gap-2">
                            <span  className="text-yellow-5">0</span>
                            <RatingStars />
                            <span className="text-richblack-400">{course?.ratingAndReviews.length} Ratings</span>
                        </div>
                        <p className="text-xl text-richblack-5">Rs. {course?.price}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Course_Card