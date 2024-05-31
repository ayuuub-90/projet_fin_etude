/* import { useGetAllPubQuery } from "../../redux/api/pubApiSlice.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./bg.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ProductCarousal = () => {
  const { data: pubs, refetch } = useGetAllPubQuery();
  const setting = {
    dots: true,
    infinite: true,
    speed: 500,
    slideToShow: 1,
    slideToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className=" ">
      <Slider className="w-[full] " {...setting}>
        {pubs?.map((pub) => (
          <div key={pub._id} className="h-[600px]  css-selector relative ">
            <div className="ball"></div>
            <div className="ball"></div>
            <div className="ball"></div>
            <div className="ball"></div>

            <h1 className="absolute text-black top-[120px] left-[130px] w-[63rem] text-8xl font-sans font-bold drop-shadow-[0_10px_8px_rgba(25,25,25.5)]">
              {pub.title.toUpperCase()}{" "}
            </h1>
            <h1 className="absolute top-[250px] left-[130px] text-black text-4xl w-[45rem] font-bold tracking-wide brightness-200 drop-shadow-[0_10px_8px_rgba(25,25,25.5)]">
              {pub.subTitle.toUpperCase()}{" "}
            </h1>
            <Link to={`/products/category/${pub.category._id}`}>
              <button className="absolute top-[420px] left-[130px] px-10 py-4 hover:backdrop-blur-lg hover:bg-black/50 bg-black/90 text-white border hover:border">
                SHOW MORE
              </button>
            </Link>
            <img
              className="absolute h-[400px] top-[100px] right-[160px] object-cover object-center drop-shadow-[0_15px_15px_rgba(0,0,0.5)]"
              src={pub.image}
              alt={pub.title}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousal;
 */
import { useGetAllPubQuery } from "../../redux/api/pubApiSlice.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./bg.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const { data: pubs, refetch } = useGetAllPubQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    fade: true,
    pauseOnHover: true,
    arrows: false,
    adaptiveHeight: true,
  };

  const renderCarouselItem = (pub) => (
    <div key={pub._id} className="relative h-[650px]">
    <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
    <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
        {pub.title.toUpperCase()}
      </h1>
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light mb-8">
        {pub.subTitle}
      </p>
      <Link to={`/products/category/${pub.category._id}`}>
        <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-700 hover:to-pink-900 text-white font-semibold rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
          SHOW MORE
        </button>
      </Link>
      {/* Ajouter des éléments supplémentaires attrayants ici */}
    </div>
    <img
      className="object-contain mx-auto max-w-full h-auto max-h-[650px] mt-[20px]"
      src={pub.image}
      alt={pub.title}
    />
  </div>
  
  
  );

  return (
    <div className="relative">
      <Slider {...settings}>
        {pubs?.map((pub) => renderCarouselItem(pub))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
