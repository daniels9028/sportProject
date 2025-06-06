import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Button } from "../components/Button";
import { Card, CardContent } from "../components/Card";

import { categoriesThunk } from "../features/category/categoryThunks";
import { sportActivitiesThunk } from "../features/activity/activityThunks";
import SportActivityList from "../components/SportActivity/SportActivityList";
import DashboardNavbar from "../components/DashboardNavbar";
import { ToastContainer } from "react-toastify";
import { Element } from "react-scroll";

const DashboardPage = () => {
  const user = useSelector((state) => state.profile.user);
  const category = useSelector((state) => state.category.category);
  const { activity, currentPage } = useSelector((state) => state.activity);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.role === "admin") navigate("/admin");
  }, [user, navigate]);

  useEffect(() => {
    dispatch(categoriesThunk());
    dispatch(sportActivitiesThunk({ page: currentPage }));
  }, []);

  return (
    <div className="bg-white min-h-screen font-mono text-black">
      <ToastContainer />
      {/* Header */}
      <DashboardNavbar />
      {/* Hero Section */}
      <Element name="home">
        <section className="relative bg-white py-12 px-6 md:py-20 md:px-12 text-left border-y-4 border-black mt-12">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight uppercase max-w-3xl md:max-w-4xl">
            Top Scorer <span className="text-gray-400">to the Final Match</span>
          </h2>
          <p className="text-base leading-relaxed max-w-lg md:max-w-2xl mt-6 md:mt-8">
            The EuroLeague Finals Top Scorer is the individual award for the
            player that gained the highest points in the EuroLeague Finals.
          </p>
          <Button className="mt-8 md:mt-10 bg-black text-white px-8 py-3 rounded-none border-2 border-black text-base md:text-lg w-full md:w-auto">
            Continue Reading
          </Button>
        </section>
      </Element>

      {/* Category Section */}
      <Element name="category">
        <section className="px-6 md:px-12 py-12 md:py-16 bg-white border-b-4 border-black mt-12">
          <h2 className="text-3xl md:text-4xl font-bold uppercase mb-8 md:mb-12">
            Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-8">
            {category?.map((item, index) => (
              <Card
                key={index}
                className="border-2 border-black bg-gray-100 hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer"
              >
                <img
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-36 md:h-48 object-cover border-b-2 border-black"
                />
                <CardContent className="p-3 md:p-6 text-center">
                  <h3 className="font-bold text-base md:text-lg uppercase">
                    {item?.name}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </Element>

      {/* Explore Section */}
      <Element name="explore">
        <section className="px-6 md:px-12 py-12 md:py-16 bg-white border-b-4 border-black mt-12">
          <h2 className="text-2xl md:text-4xl font-bold uppercase text-center">
            Explore
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-12 py-12 md:py-16 border-black bg-gray-50 mt-10">
            {activity?.map((item, index) => (
              <SportActivityList item={item} key={item.id} index={index} />
            ))}
          </div>
          <Link className="flex items-center justify-center" to="/explore">
            <button className="mt-10 bg-black text-white text-xl font-bold uppercase tracking-wider border-4 border-white px-6 py-4 shadow-[6px_6px_0px_#fff] hover:bg-white hover:text-black hover:border-black hover:shadow-[6px_6px_0px_#000] active:translate-y-1 transition-all cursor-pointer">
              Explore More...
            </button>
          </Link>
        </section>
      </Element>

      {/* Newsletter Section */}
      <section className="bg-black text-white px-6 md:px-12 py-16 md:py-20 text-center border-t-4 border-white mt-12">
        <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4 md:mb-6">
          Newsletter Subscription
        </h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-2 md:px-6 md:py-3 w-full md:w-72 border-2 border-white bg-transparent mb-6 text-center"
        />
        <Button className="bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded-none text-base md:text-lg border-2 border-black uppercase w-full md:w-auto">
          Subscribe
        </Button>
      </section>

      {/* Footer */}
      <Element name="about">
        <footer
          id="about"
          className="mt-12 flex flex-col sm:flex-row justify-center items-center py-6 bg-gray-100 border-t-4 border-black gap-4 md:gap-6"
        >
          {["Facebook", "Twitter", "Instagram"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-black uppercase hover:underline"
            >
              {item}
            </a>
          ))}
        </footer>
      </Element>
    </div>
  );
};

export default DashboardPage;
