import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { MdClose } from "react-icons/md"
function ChipInput({ label, name, placeholder, register, errors, getValues, setValue }) {
    const { editCourse, course } = useSelector((state) => state.course);
    const [chips, setChilps] = useState([]);
    useEffect(() => {
        if (editCourse) {
            setChilps(course?.tag);
        }
        register(name, { required: true, validate: (value) => value.length > 0 })
    }, []);
    useEffect(() => {
        setValue(name, chips);
    }, [chips]);
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ',') {
            event.preventDefault();
            const chipValue = event.target.value.trim();
            if (chipValue && !chips.includes(chipValue)) {
                const newChip = [...chips, chipValue];
                setChilps(newChip);
                event.target.value = "";
            }
        }
    }
    const handleDeleteChip = (chipIndex) => {
        const updateChips = chips.filter((_, index) => index !== chipIndex);
        setChilps(updateChips)
    }
    return (
        <div>
            <label className="text-sm text-richblack-5" htmlFor={name}>{label}<sup>*</sup></label>
            <div className="flex w-full flex-wrap gap-y-2">
                {
                    chips.map((chip, index) => (
                        <div key={index} className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5">
                            {chip}
                            <button
                                type="button"
                                className="ml-2 focus:outline-none"
                                onClick={() => handleDeleteChip(index)}
                            >
                                <MdClose className="text-sm" />
                            </button>
                        </div>
                    ))
                }
                <input
                    type='text'
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    className="form-style w-full"
                    onKeyDown={handleKeyDown}
                />
            </div>
            {
                errors[name] && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">{label} is required</span>
                )
            }
        </div>
    )
}

export default ChipInput