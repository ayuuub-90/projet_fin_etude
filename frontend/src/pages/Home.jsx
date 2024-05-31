import Navigation from "./Navigation.jsx";
import ProductCarousal from "./product/ProductCarousal.jsx";
import Footer from "./Footer.jsx";
import { FaCheck, FaShippingFast, FaPhoneVolume } from "react-icons/fa";
import DecovrirCategory from "./DecouvrirCategory.jsx";
import NewArrivals from "./NewArrivals.jsx";
import TopProducts from "./TopProducts.jsx";

const Home = () => {
  return (
    <>
      <Navigation />
      <div className="bg-[#6E1E8EB]">
        <ProductCarousal />
        <DecovrirCategory />
        <NewArrivals />
        <TopProducts />
        <section className="bg-white py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div className="col-span-full text-center mb-8">
              <h2 className="text-3xl font-semibold text-gray-900">
                WHY SHOP WITH US
              </h2>
            </div>
          </div>
          <div className="container mx-auto max-lg:px-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-center border-2">
                <div className="text-primary mr-4 text-4xl">
                  <FaCheck />
                </div>
                <h5 className="font-semibold text-lg">Quality Product</h5>
              </div>
              <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-center border-2">
                <div className="text-primary mr-4 text-4xl">
                  <FaShippingFast />
                </div>
                <h5 className="font-semibold text-lg">Free Shipping</h5>
              </div>
              <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-center border-2">
                <div className="text-primary mr-4 text-4xl">
                  <FaPhoneVolume />
                </div>
                <h5 className="font-semibold text-lg">24/7 Support</h5>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Home;
