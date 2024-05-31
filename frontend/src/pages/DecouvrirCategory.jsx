import { useState, useEffect } from "react";
import { useGetAllCategoriesQuery } from "../redux/api/categoryApiSlice";
import { Link } from "react-router-dom";
import Slider from "react-slick";

function DecovrirCategory() {
  const { data: categoryList } = useGetAllCategoriesQuery();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (categoryList) {
      setCategories(categoryList);
    }
  }, [categoryList]);

  const settings = {
    infinite: true,
    slidesToShow: 5,
    speed: 400,
    swipeToSlide: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <section className="py-16 bg-[##6E1E8EB]">
        <div className=" container mx-auto">
          <h2 className=" text-center mb-16 max-md:mb-6 text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Discover Categories
          </h2>

          <Slider {...settings}>
            {categories.map((category) => (
              <div key={category._id}>
                <div className="flex flex-col justify-center items-center">
                  <Link to={`/products/category/${category._id}`}>
                    <img
                      src={category.image}
                      alt=""
                      className="rounded-full object-cover w-44 h-44 max-md:size-20"
                    />
                  </Link>
                  <span className="text-center font-medium text-2xl max-md:text-sm pt-3">
                    {category.name}
                  </span>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
}

export default DecovrirCategory;
