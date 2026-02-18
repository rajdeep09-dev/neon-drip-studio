import { Search, Menu, Coffee, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 py-4 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Left: Menu & Search */}
        <div className="flex items-center gap-6">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors group">
            <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center group-hover:bg-orange-100 transition-colors">
               <Menu className="w-5 h-5 text-orange-500" />
            </div>
          </button>

          <div className="hidden md:flex items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-full border border-gray-100 w-64 focus-within:ring-2 focus-within:ring-orange-100 transition-all">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Searching..."
              className="bg-transparent border-none outline-none text-sm font-poppins text-gray-700 placeholder:text-gray-400 w-full"
            />
          </div>
        </div>

        {/* Center: Logo */}
        <Link to="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group">
          <div className="relative">
             <Coffee className="w-6 h-6 text-orange-500 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <span className="font-serif font-bold text-lg tracking-tight text-gray-900 group-hover:text-orange-500 transition-colors">
            Coffee Shop
          </span>
        </Link>

        {/* Right: Profile */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 hover:bg-gray-50 p-1.5 pr-3 rounded-full transition-colors cursor-pointer border border-transparent hover:border-gray-100">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop"
                alt="Sohan"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:flex flex-col items-start">
               <span className="text-sm font-semibold font-poppins text-gray-900 leading-none">Sohan</span>
               <span className="text-[10px] text-gray-500 font-poppins font-medium">Member</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
