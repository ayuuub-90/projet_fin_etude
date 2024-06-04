import {
  useGetAllPubQuery,
  useDeletePubMutation,
} from "../../redux/api/pubApiSlice.js";
import Pub from "../pub/Pub.jsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CgDetailsMore } from "react-icons/cg";
import { toast } from "react-toastify";

const PubsList = () => {
  const { data: pubs, refetch } = useGetAllPubQuery();
  const [deletePub] = useDeletePubMutation();

  const [isOpened, setIsOpened] = useState(false);
  const [pubId, setPubId] = useState(null);

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this pub?")) {
        await deletePub(id);
        toast.success("Pub deleted successfully");
        setPubId(null);
        refetch();
      }
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <h2 className="text-2xl font-medium mb-6 max-md:mb-2">Products Pub</h2>
      <div className="h-[480px] max-md:h-[450px] overflow-auto ">
        {!pubs?.length ? (
          <>
            <div className="font-medium text-xl text-gray-700 text-center">
              there is no publications right now, <b>CREATE ONE</b>
            </div>
          </>
        ) : (
          <>
            {pubs?.map((pub) => (
              <div key={pub._id} className="flex">
                <Pub pub={pub} />
                <div
                  className="relative flex items-center justify-center hover:bg-gray-50 text-gray-600 cursor-pointer w-[50px] "
                  onClick={() => {
                    setIsOpened(!isOpened);
                    setPubId(pub._id);
                  }}
                >
                  <CgDetailsMore />
                  {isOpened && pubId === pub._id && (
                    <>
                      <div className="absolute bg-white rounded top-0 right-[30px] w-[180px] h-[80px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
                        <div className="flex flex-col border h-full">
                          <Link
                            to={`update-pub/${pub._id}`}
                            className="h-[50%] flex items-center pl-2 hover:bg-gray-50 font-medium"
                          >
                            UPDATE PRODUCT
                          </Link>
                          <Link
                            className="h-[50%] flex items-center pl-2 hover:bg-gray-50 font-medium"
                            onClick={() => {
                              handleDelete(pubId);
                            }}
                          >
                            DELETE PRODUCT
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <Link to={"add-pub"} className="mt-4">
        <button className="bg-black text-white w-[200px] max-md:center max-md:w-full mt-4 rounded hover:bg-gray-900 h-[40px]">
          Create New Pub
        </button>
      </Link>
    </>
  );
};

export default PubsList;
