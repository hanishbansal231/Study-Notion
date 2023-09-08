import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn'
function RenderTotalAmount() {
    const {total,cart} = useSelector((state) => state.cart);
    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);
        console.log(courses);
    }
  return (
    <div>
        <p>Total:</p>
        <p>Rs{total}</p>
        <IconBtn 
        text={"Buy Now"}
        onClick={handleBuyCourse}
        customClasses={"w-full justify-center"}
        />
    </div>
  )
}

export default RenderTotalAmount