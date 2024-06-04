/* eslint-disable react/prop-types */


const Pub = ({ pub }) => {
  return (
    <div className="h-[100px] max-md:h-auto w-full flex mb-2 mx-3 hover:bg-gray-50 border-t">
      <div className="flex justify-between" title={pub._id}>
        <div className="flex w-[970px] max-md:w-full">
          <div className="w-[170px] h-[100px] max-md:h-[60px] max-md:w-[100px] overflow-hidden ">
            <div className="w-[120px] h-[78px] max-md:h-[50px] max-md:w-[80px] flex justify-center items-center">
            <img
              src={pub.image}
              alt={pub.image}
              className="h-full w-auto rounded "
            />
            </div>
          </div>
          <div className="mx-2 flex flex-col justify-between max-md:justify-around">
            <div className="flex justify-between flex-col">
              <h2 className="font-medium text-[22px] max-md:text-sm">
                {pub.title.toUpperCase()}
              </h2>
              <span className="font-bold text-gray-700 max-md:text-xs">
                {pub.category.name}
              </span>
            </div>
            <span className=" text-gray-600 max-md:text-xs" title={pub.subTitle}>
              {pub.subTitle}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pub;
