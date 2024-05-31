import { useNavigate, useParams } from "react-router";
import { useGetProductByIdQuery } from "../../redux/api/productApiSlice.js";
import Navigation from "../Navigation.jsx";

import { FaStar, FaUserCircle } from "react-icons/fa";

import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAddReviewMutation } from "../../redux/api/productApiSlice.js";
import { toast } from "react-toastify";
import moment from "moment";
import Footer from "../Footer.jsx";
import ProductLike from "./ProductLike.jsx";
import { addToCart } from "../../redux/features/cart/cartSlice.js";

import { addFavoriteToLocalStorage } from "../../utils/localStorageFavorite.js";
import { useEffect } from "react";
const ProductDetails = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [addReview] = useAddReviewMutation();
  const plusMinuceButton =
    "flex h-8 w-8  bg-white cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500";
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const params = useParams();
  const { data: product, refetch } = useGetProductByIdQuery(params.id);
  const [idCategory, setIdCategory] = useState("");

  useEffect(() => {
    if (product && product.category && product.category._id) {
      const categoryId = product.category._id.toString();
      setIdCategory(categoryId);
    } else {
      setIdCategory("");
    }
  }, [product]);

  const handleAddReview = async () => {
    try {
      const res = await addReview({
        data: { rating, comment },
        id: params.id,
      }).unwrap();
      setRating("");
      setComment("");
      setState(2);
      refetch();
      return toast.success(res.message);

      //
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const clear = () => {
    setRating("");
    setComment("");
  };

  const [state, setState] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(1);
  const handleThumbnailClick = (imageSrc) => {
    document.getElementById("principaleImage").src = imageSrc;
  };

  const addHandler = (quantity, product) => {
    dispatch(addToCart({ ...product, quantity: Number(quantity) }));
    toast.success("Product added successfully to cart", {
      autoClose: 1000,
    });
  };
  const plusQuantity = () => {
    setCounter(counter + 1);
  };
  const minsQuantity = () => {
    setCounter(counter - 1);
  };

  const addToFavrites = () => {
    addFavoriteToLocalStorage(product);
  };

  return (
    <>
      <Navigation />

      <div className="relative bg-gray-200">
        <section className="bg-gray-200 w-full container mx-auto px-4 lg:px-0 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="relative bg-gray-200 lg:col-start-1 flex flex-col lg:flex-row gap-8 p-8 items-center">
            {product?.images &&
              product?.images?.image1 &&
              product?.images?.image2 && (
                <div
                  id="image_secondaire"
                  className="lg:mr-8 flex-shrink-0 flex flex-col justify-center items-center"
                >
                  <div className="flex flex-col gap-4">
                    {Object.entries(product.images).map(
                      ([, image], index) =>
                        image && (
                          <div key={index} className="rounded-lg">
                            <img
                              src={image}
                              alt=""
                              className="size-24 rounded-md shadow-sm cursor-pointer hover:scale-105 transform transition duration-300 ease-in-out object-contain"
                              onClick={() => handleThumbnailClick(image)}
                            />
                          </div>
                        )
                    )}
                  </div>
                </div>
              )}

            <div className="flex justify-center items-center min-w-[400px] ">
              <img
                id="principaleImage"
                src={product?.images.image1}
                alt={product?.name}
                className="h-auto max-h-[400px] w-auto max-w-[600px] drop-shadow-lg"
              />
            </div>
          </div>

          <div className="bg-gray-200 flex flex-col">
            <div>
              <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800 mb-2">
                {product?.name}
              </h1>
              <div className="flex items-center mb-[30px]">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`text-sm ${
                      index < Math.floor(product?.rating)
                        ? "text-red-400"
                        : "text-gray-500"
                    }`}
                  />
                ))}
                <span className="text-gray-500 ml-1">
                  ({product?.numReviews} reviews)
                </span>
              </div>
              <p className="text-lg text-gray-700 font-semibold mb-4">
                Availability:{" "}
                <span
                  className={`${
                    product?.countInStock > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {product?.countInStock > 0 ? "In Stock" : "Expired"}
                </span>
              </p>
              <p className="text-3xl lg:text-4xl font-bold text-violet-900 mb-4">
                ${product?.price}
              </p>
              <p className="text-lg text-gray-700 mb-6">
                {product?.description.substring(0, 780)}...{" "}
                <span className="cursor-pointer font-medium ">see more</span>
              </p>
            </div>

            <div className="mt-6 mb-5 ">
              <p className="pb-2 text-xs text-gray-500">Quantity</p>
              <div className="flex ">
                <button
                  className={`${plusMinuceButton}`}
                  onClick={minsQuantity}
                  disabled={counter == 1}
                >
                  −
                </button>
                <div className="flex bg-white h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500">
                  {counter}
                </div>
                <button
                  className={`${plusMinuceButton}`}
                  onClick={plusQuantity}
                  disabled={counter == product?.countInStock}
                >
                  {" "}
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex gap-4 mb-4 lg:mb-0">
                <button
                  onClick={() => addHandler(Number(counter), product)}
                  className="flex items-center justify-center h-12 w-52 bg-violet-900 text-white duration-100 hover:bg-blue-800 rounded-lg"
                >
                  <BiShoppingBag className="w-6 h-6 mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={addToFavrites}
                  className="flex items-center justify-center h-12 w-52 bg-amber-400 duration-100 hover:bg-yellow-300 rounded-lg"
                >
                  <AiOutlineHeart className="w-6 h-6 mr-2" />
                  Wishlist
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="pb-10 bg-gray-50">
        <div className="flex gap-6 justify-center pt-10 ">
          <h1
            onClick={() => setState(1)}
            className={`cursor-pointer ${
              state === 1 ? "text-black font-medium" : "text-gray-400"
            } `}
          >
            Products You Might Also Like
          </h1>
          <h1
            onClick={() => setState(2)}
            className={`cursor-pointer ${
              state === 2 ? "text-black font-medium" : "text-gray-400"
            } `}
          >
            Reviews
          </h1>
          <h1
            onClick={() => setState(3)}
            className={`cursor-pointer ${
              state === 3 ? "text-black font-medium" : "text-gray-400"
            } `}
          >
            Add Review
          </h1>
        </div>
        {state === 1 && (
          <>
            <ProductLike id={idCategory} />;
          </>
        )}
        {state === 2 && (
          <>
            <div className="flex justify-center items-center flex-col m-10 gap-4">
              <h1 className="text-left w-[800px] font-medium text-2xl pb-4">
                All Reviews
              </h1>
              {product?.reviews?.map((review) => (
                <div
                  key={Math.random()}
                  className="w-[800px] bg-white shadow-sm md:shadow-lg rounded-lg "
                >
                  <div className="flex mb-2">
                    <FaUserCircle className="w-[60px] h-[60px] m-6 text-gray-200 " />
                    <div className="mt-6 flex flex-col">
                      <div>
                        <span className="font-medium text-[18px] ">
                          {review.name}
                        </span>
                        {"   • "}
                        <span className="text-gray-500 text-[15px]">
                          {moment(review.createdAt).fromNow()}{" "}
                        </span>
                        <div className="flex gap-1">
                          <FaStar
                            className={`${
                              review?.rating - 1 >= 0
                                ? "text-yellow-300"
                                : "text-gray-300"
                            }`}
                          />
                          <FaStar
                            className={`${
                              review?.rating - 2 >= 0
                                ? "text-yellow-300"
                                : "text-gray-300"
                            }`}
                          />
                          <FaStar
                            className={`${
                              review?.rating - 3 >= 0
                                ? "text-yellow-300"
                                : "text-gray-300"
                            }`}
                          />
                          <FaStar
                            className={`${
                              review?.rating - 4 >= 0
                                ? "text-yellow-300"
                                : "text-gray-300"
                            }`}
                          />
                          <FaStar
                            className={`${
                              review?.rating - 5 >= 0
                                ? "text-yellow-300"
                                : "text-gray-300"
                            }`}
                          />
                        </div>
                      </div>
                      <div className="mt-1">
                        <div className="text-gray-800 text-[15px] max-w-[630px] mb-2 ">
                          {review.comment}{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {state === 3 && (
          <>
            {userInfo ? (
              <>
                <div className="flex justify-center items-center flex-col m-10 gap-2">
                  <h1 className="text-left w-[653px] font-medium text-2xl pb-4">
                    Add Review
                  </h1>
                  <select
                    placeholder="rating..."
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="rounded p-4 w-[653px] outline-none focus:border shadow-sm md:shadow-lg text-gray-500"
                  >
                    <option value="0" selected>
                      --Select your rating--
                    </option>
                    <option value="1">Inferior</option>
                    <option value="2">Decent</option>
                    <option value="3">Great</option>
                    <option value="4">Excellent</option>
                    <option value="5">Exceptional</option>
                  </select>
                  <textarea
                    rows="8"
                    placeholder="message content..."
                    className="text-gray-500 rounded p-4 resize-none outline-none focus:border w-[653px] shadow-sm md:shadow-lg"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <div className="flex gap-2 mt-4">
                    <button
                      className="w-[323px] p-2 bg-gray-500 text-white "
                      onClick={clear}
                    >
                      Cancel
                    </button>
                    <button
                      className="w-[323px] p-2 bg-black text-white "
                      onClick={handleAddReview}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>{navigate("/login")}</>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
{
  /*       <div className="h-full w-[50%] flex flex-col px-10 py-[60px] ">
          <span className="font-medium text-5xl font-[arial] h-[60px] w-full relative">
            {product?.name.toUpperCase()}
          </span>

          <div className="flex gap-2 items-center">
            <FaStar
              className={`${
                product?.rating - 1 >= 0 ? "text-yellow-300" : "text-gray-300"
              }`}
            />
            <FaStar
              className={`${
                product?.rating - 2 >= 0 ? "text-yellow-300" : "text-gray-300"
              }`}
            />
            <FaStar
              className={`${
                product?.rating - 3 >= 0 ? "text-yellow-300" : "text-gray-300"
              }`}
            />
            <FaStar
              className={`${
                product?.rating - 4 >= 0 ? "text-yellow-300" : "text-gray-300"
              }`}
            />
            <FaStar
              className={`${
                product?.rating - 5 >= 0 ? "text-yellow-300" : "text-gray-300"
              }`}
            />
            <span className="text-gray-500">
              ({product?.numReviews} reviews)
            </span>
          </div>

          <div className="mt-4 mr-10" title={product?.description}>
            {product?.description.substring(0, 915)}...
          </div>

          <div className="my-4 text-4xl font-medium">
            $ {product?.price.toFixed(2)}
          </div>

          <div className="flex justify-between pt-4 mr-10 w-full">
            {product?.countInStock > 1 && (
              <div className="w-[29%]">
                <select
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full outline-none p-2 border border-gray-300 rounded-md"
                >
                  <option defaultValue={1}>Select Quantity</option>
                  {[...Array(product.countInStock).keys()].map((item) => (
                    <option key={item + 1} value={item + 1}>
                      {item + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div
              className="hover:bg-black rounded text-center flex items-center justify-center w-[70%] cursor-pointer bg-gray-900"
              onClick={() => addHandler(Number(quantity), product)}
            >
              <span className="text-white">Add To Cart</span>
              <FiShoppingCart className="ml-2 text-white" />
            </div>
          </div>
          <Link to={`/api/ordre`} className="text-white flex items-center" >

        <div className=" mt-[30px]  justify-center w-[70%] ml-[226px] hover:bg-orange-300 rounded text-center flex items-center justify-center h-[40px] w-[400px] cursor-pointer bg-orange-400">
          <span>Acheter</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bag ml-[8px]" viewBox="0 0 16 16">
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
          </svg>
        </div>
      </Link>
        </div> */
}
{
  /*  <div className="flex h-[77vh] ">
        <div className="bg-gray-50 h-full w-[50%] flex justify-center items-center relative">
  {product?.images && (
     <div className="absolute mt-[550px] flex">
      {Object.entries(product.images).map(([key, image], index) => (
        image && (
          <img
            key={index}
            src={image}
            alt=""
            className="w-12 h-12 m-2 border border-gray-400"
            onMouseOver={() => handleThumbnailClick(image)}
          />
        )
      ))}
    </div>
  )}
  <img
    id="principaleImage"
    src={product?.images.image1}
    alt={product?.name}
    className="h-auto max-h-[400px] w-auto mt-[80px] drop-shadow-[0_15px_15px_rgba(0,0,0.5)]"
  />
</div> 

              <div className="h-full w-[50%] flex flex-col px-10 py-[60px] font-sans">
  <span className="font-semibold text-4xl uppercase h-[60px] w-full relative">
    {product?.name}
  </span>

  <div className="flex gap-2 items-center">
    {[...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`text-yellow-300 ${
          index < Math.floor(product?.rating) ? "text-yellow-300" : "text-gray-300"
        }`}
      />
    ))}
    <span className="text-gray-500">
      ({product?.numReviews} reviews)
    </span>
  </div>

  <div className="mt-4 mr-10" title={product?.description}>
    {product?.description}
  </div>

  <div className="my-4 text-4xl font-medium">
    $ {product?.price.toFixed(2)}
  </div>

  <div className="flex justify-between pt-4 mr-10 w-full">
    {product?.countInStock > 1 && (
      <div className="w-[29%]">
        <select
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full outline-none p-2 border border-gray-300 rounded-md"
        >
          <option defaultValue={1}>Select Quantity</option>
          {[...Array(product.countInStock)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>
    )}
    <div
      className="hover:bg-black rounded text-center flex items-center justify-center w-[70%] cursor-pointer bg-gray-900 text-white"
      onClick={() => addHandler(Number(quantity), product)}
    >
      <span>Add To Cart</span>
      <FiShoppingCart className="ml-2" />
    </div>
  </div>

  <Link to={`/api/ordre`} className="text-white flex items-center">
    <div className="mt-[30px] justify-center w-[70%] ml-[226px] hover:bg-orange-300 rounded text-center flex items-center justify-center h-[40px] w-[400px] cursor-pointer bg-orange-400">
      <span className="text-white">Acheter</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bag ml-[8px]" viewBox="0 0 16 16">
        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
      </svg>
    </div>
  </Link>
</div> 

      </div>
 */
}
{
  /* 
<section className="bg-gray-200 w-[100%] h-[100%] container mx-auto px- lg:px-0 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

  <div className="flex justify-center items-center relative">
    {product?.images && (
      <div className="absolute top-0 left-0 p-4 shadow-md bg-white rounded-md">
        {Object.entries(product.images).map(([key, image], index) => (
          image && (
            <div key={index} className="mb-2">
              <img
                src={image}
                alt=""
                className="w-16 h-16 border border-gray-300 rounded-md shadow-md cursor-pointer hover:shadow-lg"
                onMouseOver={() => handleThumbnailClick(image)}
              />
            </div>
          )
        ))}
      </div>
    )}
    <img
      id="principaleImage"
      src={product?.images.image1}
      alt={product?.name}
      className="max-h-[400px] w-full object-contain"
    />
  </div>


  <div className="flex flex-col justify-between">
    <div>
      <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800 mb-2">{product?.name}</h1>
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`text-yellow-300 ${
              index < Math.floor(product?.rating) ? "text-yellow-300" : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-gray-500 ml-1">({product?.numReviews} reviews)</span>
      </div>
      <p className="text-lg text-gray-700 font-semibold mb-4">
        Availability:{" "}
        <span className={`${
          product?.quantity ? "text-green-600" : "text-red-600"
        }`}>
          {product?.quantity ? "In Stock" : "Expired"}
        </span>
      </p>
      <p className="text-3xl lg:text-4xl font-bold text-violet-900 mb-4">${product?.price}</p>
      <p className="text-lg text-gray-700 mb-6">{product?.description}</p>
    </div>

    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
      <div className="flex gap-4 mb-4 lg:mb-0">
        <button className="flex items-center justify-center h-12 w-52 bg-violet-900 text-white duration-100 hover:bg-blue-800 rounded-lg">
          <BiShoppingBag className="w-6 h-6 mr-2" />
          Add to Cart
        </button>
        <button className="flex items-center justify-center h-12 w-52 bg-amber-400 duration-100 hover:bg-yellow-300 rounded-lg">
          <AiOutlineHeart className="w-6 h-6 mr-2" />
          Wishlist
        </button>
      </div>
      <div className="flex items-center">
        <p className="text-xs text-gray-600 mr-2">Size:</p>
  
      </div>
    </div>
  </div>
</section> */
}
