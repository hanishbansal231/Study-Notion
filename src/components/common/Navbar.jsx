import React from 'react'
import { NavbarLinks } from '../../data/navbar-links';
import logo from '../../assets/Logo/Logo-Full-Light.png';
import { Link, matchPath } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { IoIosArrowDown } from 'react-icons/io';
import { useState } from 'react';
import { useEffect } from 'react';
import { apiConnector } from '../../services/apiconnector';
import { categories } from '../../services/apis';
function Navbar() {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const location = useLocation();
    const [subLinks, setSubLinks] = useState([]);
    const fetchSubLinks = async () => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            setSubLinks(result.data.data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchSubLinks();
    }, []);
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }
    return (
        <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-600'>
            <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
                <Link to={"/"}><img src={logo} alt='mainLogo' width={160} height={42} loading='lazy' /></Link>
                <nav>
                    <ul className='flex gap-x-6 text-richblack-25'>
                        {
                            NavbarLinks.map((item, index) => {
                                return (
                                    <li key={index}>
                                        {
                                            item.title === 'Catalog' ? (
                                                <div className='relative flex items-center gap-0 group'>
                                                    <p>{item.title} </p>
                                                    <IoIosArrowDown />
                                                    <div className=' z-10 invisible absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 w-[300px]'>
                                                        <div className='absolute left-[50%] top-0 translate-y-[-45%] translate-x-[80%] h-6 w-6 rotate-45 rounded bg-richblack-5'> </div>
                                                        {
                                                            subLinks.length ? (

                                                                subLinks.map((item, index) => (
                                                                    <Link to={`/catalog/${item.name.split(" ").join("-").toLowerCase()}`} key={index}>
                                                                        <p>{item.name}</p>
                                                                    </Link>
                                                                ))

                                                            ) : (<div></div>)
                                                        }
                                                    </div>
                                                </div>
                                            ) : (
                                                <Link to={item?.path}><p className={`${matchRoute(item?.path) ? "text-yellow-25" : "text-richblack-25"}`}>{item.title}</p></Link>
                                            )
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
                <div className='flex gap-x-5 items-center'>
                    {
                        user && user?.accountType !== "Instructor" && (
                            <Link to={"/dashboard/cart"} className='relative'>
                                <AiOutlineShoppingCart className='text-richblack-25 text-2xl' />
                                {
                                    totalItems > 0 && (
                                        <span  className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">{totalItems}</span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to={"/login"}>
                                <button className='border border-richblack-700 bg-richblack-800 px-[15px] py-[5px] text-richblack-100 rounded-md'>Log in</button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to={"/signup"}>
                                <button className='border border-richblack-700 bg-richblack-800 px-[15px] py-[5px] text-richblack-100 rounded-md'>sign up</button>
                            </Link>
                        )
                    }
                    {
                        token !== null && <ProfileDropDown />
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar