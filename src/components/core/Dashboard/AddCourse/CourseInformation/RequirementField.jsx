import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

function RequirementField({ name, label, register, setValue, errors, getValues }) {
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);
    useEffect(() => {
        register(name,{
            required:true,
            // validate: (value) => value.length > 0
        })
    },[]);
    useEffect(() => {
         setValue(name,requirementList);
    },[requirementList]);
    const handleAddRequirement = () => {
        if (requirement) {
            setRequirementList([...requirementList, requirement])
            // setRequirement("");
        }
    }
    const handleRemoveRequirement = (index) => {
        const updateRequirementList = [...requirementList];
        updateRequirementList.splice(index, 1);
        setRequirementList(updateRequirementList);
    }
    return (
        <div>
            <label className="text-sm text-richblack-5" htmlFor={name}>{label}<sup className="text-pink-200">*</sup></label>
            <div>
                <input
                    type="text"
                    id={name}
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className="form-style w-full"
                />
                <button type='button' onClick={handleAddRequirement} className='font-semibold text-yellow-50'>Add</button>
            </div>
            {
                requirementList.length > 0 && (
                    <ul>
                        {
                            requirementList.map((item, index) => (
                                <li key={index} className='flex flex-col items-center text-richblack-5'>
                                    <span>{item} </span>
                                    <button onClick={() => handleRemoveRequirement(index)} type='button' className='text-pure-greys-300 text-xs'>Clear</button>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
            {
                errors[name] && (
                    <span  className="ml-2 text-xs tracking-wide text-pink-200">{label} is Required</span>
                )
            }
        </div>
    )
}

export default RequirementField