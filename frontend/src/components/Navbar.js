import React, { useState } from "react";
import { GemIcon, Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-zinc-900 text-white">
      <div className="flex items-center justify-between h-[60px] px-6 md:px-36">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-2xl">
          <GemIcon className="h-8 w-8 text-yellow-300" /> GemLedger
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-16 font-semibold text-lg">
          <div>111</div>
          <div>211</div>
          <div>311</div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu (Only visible when open) */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 py-4 bg-zinc-800">
          <div>111</div>
          <div>211</div>
          <div>311</div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
