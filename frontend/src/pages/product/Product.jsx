/* eslint-disable react/prop-types */

const Product = ({ product }) => {
  return (
    <>
      <div className="h-[80px] max-md:h-auto w-full flex mb-2 mx-3 hover:bg-gray-50 border-t">
        <div className="flex justify-between">
          <div className="flex w-[970px] max-md:w-full">
            <div className="w-[120px] h-[78px] max-md:h-[50px] max-md:w-[80px] flex justify-center">
              <img
                src={product.images.image1}
                alt={product.images.image1}
                className=" w-auto h-full rounded"
              />
            </div>
            <div className="mx-2 my-1 flex flex-col justify-between">
              <h2 className="font-medium text-[18px] max-md:text-sm">
                {product.name.toUpperCase()}
              </h2>
              <span className="font-medium text-gray-700 max-md:hidden">
                {product.brand?.name}
              </span>
              <span className=" text-gray-600 max-md:text-xs" title={product.description}>
                {product.description.substring(0, 50)}...
              </span>
            </div>
          </div>
          <div className="flex w-[100px]">
            <div className="flex items-center justify-center">
              <span className="font-medium text-[21px] max-md:text-sm md:text-left">
                $ {product.price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
