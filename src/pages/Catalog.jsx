import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
import Course_Card from '../components/core/Catalog/Course_Card';
import CourseSlider from '../components/core/Catalog/CourseSlider';
function Catalog() {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  useEffect(() => {
    const getCategorys = async () => {
      const response = await apiConnector("GET", categories.CATEGORIES_API);
      const category_Id = response?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase())[0]._id;
      setCategoryId(category_Id);
    }
    getCategorys();
  }, [catalogName]);
  console.log("category_Id", categoryId);
  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const response = await getCatalogaPageData(categoryId);
        setCatalogPageData(response);
      } catch (error) {
        console.log(error);
      }
    }
    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);
  console.log(catalogPageData);
  return (
    <div className='text-white'>

      <div>
        <p>
          {`Home / Catalog / `}
          <span>{catalogPageData?.data?.selectedCategory?.name}</span>
        </p>
        <p>{catalogPageData?.data?.selectedCategory?.name}</p>
        <p>{catalogPageData?.data?.selectedCategory?.description}</p>
      </div>

      <div>

        <div>
          <div>Courses to get you started</div>
          <div className='flex gap-x-3'>
            <p>Most Popular</p>
            <p>New</p>
          </div>
          <div>
            <CourseSlider courses={catalogPageData?.data?.selectedCategory?.courses} />
          </div>
        </div>

        <div>
          <p>Top Courses in {catalogPageData?.data?.selectedCategory?.name}</p>
          <div>
            <CourseSlider courses={catalogPageData?.data?.differentCategory?.courses} />
          </div>
        </div>

        <div>
          <p>Frequently Bought Together</p>
          <div className='py-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
              {
                catalogPageData?.data?.mostSellingCourses?.slice(0, 4)
                  .map((course, index) => (
                    <Course_Card course={course} key={index} Height={"h-[400px]"} />
                  ))
              }
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Catalog