const Pub = ({ pub }) => {
  return (
    <div className="h-[100px] w-full flex mb-2 mx-3 hover:bg-gray-50 border-t">
      <div className="flex justify-between" title={pub._id}>
        <div className="flex w-[970px] ">
          <div className="w-[170px] h-[100px] overflow-hidden">
            <div className="w-[120px] h-[78px] flex justify-center items-center">
            <img
              src={pub.image}
              alt={pub.image}
              className="h-full w-auto rounded "
            />
            </div>
          </div>
          <div className="mx-2 flex flex-col justify-between">
            <div className="flex justify-between flex-col">
              <h2 className="font-medium text-[22px] ">
                {pub.title.toUpperCase()}
              </h2>
              <span className="font-medium text-gray-700">
                {pub.category.name}
              </span>
            </div>
            <span className=" text-gray-600 " title={pub.subTitle}>
              {pub.subTitle}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pub;
