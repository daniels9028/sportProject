import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/Button";
import { Card, CardContent } from "../components/Card";

const DashboardPage = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "admin") navigate("/admin");
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <header className="flex justify-between items-center border-b-4 border-white pb-5">
        <h1 className="text-5xl font-extrabold uppercase tracking-widest">
          SportX
        </h1>
        <nav className="space-x-6 text-lg uppercase">
          <a href="#features" className="hover:underline">
            Features
          </a>
          <a href="#about" className="hover:underline">
            About
          </a>
          <a href="#contact" className="hover:underline">
            Contact
          </a>
        </nav>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-6xl font-extrabold uppercase leading-tight">
            Push Your Limits <br />{" "}
            <span className="text-red-500">Dominate the Game</span>
          </h2>
          <p className="text-xl uppercase tracking-wide">
            Join the future of sports performance with cutting-edge tools and
            community support.
          </p>
          <Button className="bg-red-500 text-white text-lg px-8 py-4 rounded-none border-4 border-white uppercase hover:bg-white hover:text-black transition">
            Get Started
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="bg-red-500 rounded-none border-4 border-white">
            <CardContent className="p-0">
              <img
                src="https://source.unsplash.com/800x600/?sports,fitness"
                alt="Sports Action"
                className="w-full h-full object-cover"
              />
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <section id="features" className="mt-32 border-t-4 border-white pt-20">
        <h3 className="text-4xl font-extrabold uppercase mb-12">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            "Personalized Training Plans",
            "Real-Time Performance Tracking",
            "Community Challenges",
          ].map((feature, index) => (
            <Card
              key={index}
              className="bg-black border-4 border-white rounded-none p-6 hover:bg-red-500 transition"
            >
              <CardContent className="text-xl font-bold uppercase">
                {feature}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section
        id="about"
        className="mt-32 border-t-4 border-white pt-20 text-center"
      >
        <h3 className="text-4xl font-extrabold uppercase mb-8">About SportX</h3>
        <p className="text-lg uppercase tracking-wider max-w-3xl mx-auto">
          SportX is designed for athletes who push boundaries. Our brutalist
          design reflects the raw determination and power needed to succeed in
          sports. Join a community built for winners.
        </p>
      </section>

      <footer
        id="contact"
        className="mt-32 border-t-4 border-white pt-10 text-center"
      >
        <h4 className="text-3xl font-extrabold uppercase mb-6">Get In Touch</h4>
        <Button className="bg-white text-black text-lg px-8 py-4 rounded-none border-4 border-black uppercase hover:bg-red-500 hover:text-white transition">
          Contact Us
        </Button>
        <p className="text-sm uppercase mt-6">
          &copy; 2025 SportX. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default DashboardPage;
