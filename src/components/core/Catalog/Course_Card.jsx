import React from 'react'
import { Link } from 'react-router-dom'

function Course_Card({course,Height}) {
    console.log("course -> ",course);
    return (
        <div>
            <Link to={`/course/${course._id}`}>
                <div>
                    <div>
                        <img src={course?.thumNail} alt={course?.courseName} className={`${Height} w-full rounded-xl object-cover`} />
                    </div>
                    <div>
                        <p>{course?.courseName}</p>
                        <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                        <div>
                            <span>0</span>
                            {/* <RatingStars /> */}
                            <span>{course?.ratingAndReviews.length} Ratings</span>
                        </div>
                        <p>{course?.price}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Course_Card