// import { useState } from "react";
// import { useSelector } from "react-redux";

// const ShippingInfo = () => {
//   const { userInfo } = useSelector((state) => state.auth);

//   const [address, setAddress] = useState(userInfo?.shippingAddress?.address || "");
//   const [city, setCity] = useState(userInfo?.shippingAddress?.city || "");
//   const [country, setCountry] = useState(userInfo?.shippingAddress?.country || "");
//   const [postalCode, setPostalCode] = useState(userInfo?.shippingAddress?.postalCode || "");
//   const [phone, setPhone] = useState(userInfo?.phone || "");

//   return (
//     <div className="min-h-[500px] ">
//       <div className="pt-16">
//         <label className="text-gray-500">Phone: *</label>
//         <input
//           type="number"
//           placeholder="phone number"
//           className="w-[100%] h-[40px] mt-1 pl-2 mb-3 outline-none bg-gray-100 rounded"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//         />
//         <label className="text-gray-500">Address: *</label>
//         <input
//           type="text"
//           placeholder="address"
//           className="w-[100%] h-[40px] mt-1 pl-2 mb-3 outline-none bg-gray-100 rounded"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//         />
//         <label className="text-gray-500">Country: *</label>
//         <input
//           type="text"
//           placeholder="country"
//           className="w-[100%] h-[40px] mt-1 pl-2 mb-3 outline-none bg-gray-100 rounded"
//           value={country}
//           onChange={(e) => setCountry(e.target.value)}
//         />
//         <label className="text-gray-500">City: *</label>
//         <input
//           type="text"
//           placeholder="city"
//           className="w-[100%] h-[40px] mt-1 pl-2 mb-3 outline-none bg-gray-100 rounded"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//         />
//         <label className="text-gray-500">Postal code: *</label>
//         <input
//           type="text"
//           placeholder="postal code"
//           className="w-[100%] h-[40px] mt-1 pl-2 mb-3 outline-none bg-gray-100 rounded"
//           value={postalCode}
//           onChange={(e) => setPostalCode(e.target.value)}
//         />
//       </div>
//     </div>
//   );
// };

// export default ShippingInfo;
