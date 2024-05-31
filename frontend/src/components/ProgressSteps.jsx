import { IoCheckmarkDoneCircle } from "react-icons/io5";

const ProgressSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="flex justify-center items-center space-x-4 mt-10">
      <div className={`${step1 ? "text-blue-400 font-medium" : "text-gray-300"}`}>
        <span className="ml-2">Login</span>
      </div>
      <IoCheckmarkDoneCircle className="text-blue-500 size-6" />

      {step2 && (
        <>
          {step1 && <div className="h-0.5 w-[10rem] bg-blue-400"></div>}
          <div className={`${step1 ? "text-blue-400 font-medium" : "text-gray-300"}`}>
            <span>Shipping</span>
          </div>
          <IoCheckmarkDoneCircle className="text-blue-500 size-6" />
        </>
      )}

      <>
        {step1 && step2 && step3 ? (
          <div className="h-0.5 w-[10rem] bg-blue-400"></div>
        ) : (
          ""
        )}

        <div className={`center gap-4 ${step3 ? "text-blue-400 font-medium" : "text-gray-300 font-medium"}`}>
          <span className={`${!step3 ? "ml-[10rem]" : ""}`}>payment</span>
          {step1 && step2 && step3 ? (
            <IoCheckmarkDoneCircle className="text-blue-500 size-6" />
          ) : (
            ""
          )}
        </div>
      </>

      <>
        {step1 && step2 && step3 && step4 ? (
          <div className="h-0.5 w-[10rem] bg-blue-400"></div>
        ) : (
          ""
        )}

        <div className={`center gap-4 ${step4 ? "text-blue-400 font-medium" : "text-gray-300 font-medium"}`}>
          <span className={`${!step4 ? "ml-[10rem]" : ""}`}>Summary</span>
          {step1 && step2 && step3 && step4 ? (
            <IoCheckmarkDoneCircle className="text-blue-500 size-6" />
          ) : (
            ""
          )}
        </div>
      </>
      
    </div>
  );
};

export default ProgressSteps;

// step 1: login
// step 2: shipping information
// step 3: payment information
