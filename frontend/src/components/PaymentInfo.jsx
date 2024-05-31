import { useState } from "react";
import { PayPal, MasterCard, Visa } from "../assets/assets.js";
import ProgressSteps from "./ProgressSteps.jsx";
import { useNavigate } from "react-router";
import { savePaymentInfos } from "../redux/features/cart/cartSlice.js";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const PaymentInfo = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("paypal");

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardExpiration, setCardExpiration] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!cardCvv || !cardExpiration || !cardName || !cardNumber) {
      return toast.error("all fields are required");
    }

    dispatch(
      savePaymentInfos({
        paymentMethod: selectedPaymentMethod,
        cardName,
        cardNumber,
        cardCvv,
        cardExpiration,
      })
    );
    navigate("/placeorder");
  };

  return (
    <div className="center w-full">
      <div className="min-h-[500px] py-6">
        <ProgressSteps step1 step2 step3 />
        {/*  selection of type payment (Paypal, visa, masterCard...)  */}
        <label className="text-gray-600">paymant methods</label>
        <div className="flex gap-4 py-2">
          <img
            src={PayPal}
            alt="paypal"
            title="paypal"
            className={`cursor-pointer ${
              selectedPaymentMethod === "paypal" ? "scale-125" : "scale-1"
            } `}
            onClick={() => setSelectedPaymentMethod("paypal")}
          />
          <img
            src={Visa}
            alt="visa"
            title="visa"
            className={`cursor-pointer ${
              selectedPaymentMethod === "visa" ? "scale-125" : "scale-1"
            } `}
            onClick={() => setSelectedPaymentMethod("visa")}
          />
          <img
            src={MasterCard}
            alt="masterCard"
            title="MasterCard"
            className={`cursor-pointer ${
              selectedPaymentMethod === "MasterCard" ? "scale-125" : "scale-1"
            } `}
            onClick={() => setSelectedPaymentMethod("MasterCard")}
          />
        </div>

        <div className="flex flex-col py-10">
          <label className="text-gray-500">Name In Card: *</label>
          <input
            type="text"
            placeholder="Name In Card"
            className="w-[100%] h-[40px] mt-1 pl-2 mb-3 outline-none bg-gray-100 rounded"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />

          <label className="text-gray-500">Card Number: *</label>
          <input
            type="text"
            placeholder="Card Number"
            className="w-[100%] h-[40px] mt-1 pl-2 mb-3 outline-none bg-gray-100 rounded"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />

          <label className="text-gray-500">CCV Card Number: *</label>
          <input
            type="text"
            placeholder="CCV Card Number"
            className="w-[100%] h-[40px] mt-1 pl-2 mb-3 outline-none bg-gray-100 rounded"
            value={cardCvv}
            onChange={(e) => setCardCvv(e.target.value)}
          />

          <label className="text-gray-500">Expiration Date: *</label>
          <input
            type="date"
            placeholder="Expiration Date"
            className="w-[100%] h-[40px] mt-1 px-2 mb-3 outline-none text-gray-400 bg-gray-100 rounded"
            value={cardExpiration}
            onChange={(e) => setCardExpiration(e.target.value)}
          />
        </div>
        <button
          className="bg-gray-800 text-white mt-10 py-2 px-4 rounded text-lg w-full"
          onClick={submitHandler}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default PaymentInfo;
