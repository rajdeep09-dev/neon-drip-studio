import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm py-6 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-serif font-bold text-2xl text-coffee-brown tracking-wide">
            Coffeeeo
          </span>
          <Star className="w-5 h-5 text-coffee-brown fill-coffee-brown rotate-[15deg]" />
        </Link>

        {/* Center: Links */}
        <div className="hidden md:flex items-center gap-10">
           {["Our Coffee", "Service", "About us"].map((item) => (
             <Link
               key={item}
               to="#"
               className="font-sans text-sm font-medium text-coffee-brown hover:text-coffee-red transition-colors relative group"
             >
               {item}
               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-coffee-red transition-all group-hover:w-full"></span>
             </Link>
           ))}
        </div>

        {/* Right: CTA */}
        <div className="flex items-center">
          <button className="px-6 py-2.5 rounded-full border border-coffee-brown text-coffee-brown font-sans text-sm font-medium hover:bg-coffee-brown hover:text-white transition-all duration-300">
            Contact us
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
