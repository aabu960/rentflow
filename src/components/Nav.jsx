import { useState } from "react"; // Import useState for menu toggle
import { hamburger } from "../assets/icons";
import { navLinks } from "../constants";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="padding-x py-8 absolute z-10 w-full bg-coral-red shadow-md">
      <nav className="flex justify-between items-center max-container">
        {/* Logo Section */}
        <a href="/" className="flex items-center gap-2">
          <div className="flex flex-col items-start">
            <span className="text-2xl font-bold text-primary">
              AAACO <span className="text-secondary">NASSARA</span>
            </span>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-4 h-1 bg-primary rotate-12"></div>
              <div className="w-6 h-1 bg-secondary"></div>
              <div className="w-4 h-1 bg-primary -rotate-12"></div>
            </div>
          </div>
        </a>

        {/* Navigation Links for Larger Screens */}
        <ul className="flex-1 flex justify-center items-center gap-16 max-lg:hidden">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="font-montserrat leading-normal text-lg text-primary hover:text-slate-gray"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Sign In & Explore Section for Larger Screens */}
        <div className="flex gap-2 text-lg leading-normal font-medium font-montserrat max-lg:hidden wide:mr-24">
          <a href="/Commingsoon" className="hover:text-primary">
            Sign in
          </a>
          <span>/</span>
          <a href="/products" className="hover:text-secondary">
            Explore now
          </a>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div
          className="hidden max-lg:block cursor-pointer"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <img src={hamburger} alt="hamburger icon" width={25} height={25} />
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg z-20">
          <ul className="flex flex-col gap-4 py-4 px-6">
            {navLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="font-montserrat text-lg text-black hover:text-coral-red"
                  onClick={() => setIsMenuOpen(false)} // Close menu on click
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 px-6 pb-4">
            <a
              href="/Commingsoon"
              className="font-montserrat text-lg text-primary hover:text-coral-red"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign in
            </a>
            <a
              href="/products"
              className="font-montserrat text-lg text-secondary hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Explore now
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Nav;
