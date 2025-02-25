import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card, CardContent } from "../components/Card";
import { Menu, X } from "lucide-react";
import { categoriesThunk } from "../features/category/categoryThunks";

const news = [
  {
    title: "Ethiopian runners took the top four spots",
    date: "Feb 24, 2025",
    image: "/images/runners.jpg",
  },
  {
    title: "IndyCar Detroit: Dixon qualifies in second practice",
    date: "Feb 24, 2025",
    image: "/images/indycar.jpg",
  },
];

const DashboardPage = () => {
  const { user } = useSelector((state) => state.profile);
  const { category } = useSelector((state) => state.category);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (user?.role === "admin") navigate("/admin");
  }, [user, navigate]);

  useEffect(() => {
    dispatch(categoriesThunk());
  }, []);

  console.log(category);

  return (
    <div className="bg-white min-h-screen font-mono text-black">
      {/* Header */}
      <header className="border-b-4 border-black bg-gray-100 uppercase px-6 py-6 md:px-12">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tighter">
            Sport News
          </h1>

          {/* Burger Icon for Mobile */}
          <button
            className="lg:hidden border-2 border-black p-2"
            onClick={toggleMenu}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex flex-wrap justify-center gap-8 text-base lg:text-lg">
            {["Home", "Category", "Explore", "About"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:underline underline-offset-4 decoration-2"
              >
                {item}
              </a>
            ))}
          </nav>

          <Link
            to="/login"
            className="cursor-pointer hidden lg:block border-2 border-black bg-black text-white px-6 py-2 hover:bg-gray-800 transition"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="flex flex-col justify-center items-center w-full gap-4 mt-4 lg:hidden">
            {["Home", "Category", "Explore", "About"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:underline underline-offset-4 decoration-2"
              >
                {item}
              </a>
            ))}
            <Link
              to="/login"
              className="border-2 w-full border-black bg-black text-white px-6 py-2 hover:bg-gray-800 transition cursor-pointer"
            >
              Login
            </Link>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-white py-12 px-6 md:py-20 md:px-12 text-left border-y-4 border-black">
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

      {/* Trending Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 md:px-12 py-12 md:py-16 border-b-4 border-black bg-gray-50">
        {news.map((item, index) => (
          <Card key={index} className="border-2 border-black bg-white">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-4 md:p-6">
              <p className="text-sm uppercase text-gray-600">{item.date}</p>
              <h3 className="text-lg md:text-xl font-semibold mt-2 uppercase leading-snug">
                {item.title}
              </h3>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Category Section */}
      <section className="px-6 md:px-12 py-12 md:py-16 bg-white border-b-4 border-black">
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

      {/* Newsletter Section */}
      <section className="bg-black text-white px-6 md:px-12 py-16 md:py-20 text-center border-t-4 border-white">
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
      <footer className="flex flex-col sm:flex-row justify-center items-center py-6 bg-gray-100 border-t-4 border-black gap-4 md:gap-6">
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
    </div>
  );
};

export default DashboardPage;
