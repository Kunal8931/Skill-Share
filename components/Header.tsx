import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-white text-indigo-600 font-bold text-lg px-3 py-1 rounded-lg shadow">
            Skill<span className="text-pink-600">Share</span>
          </div>
        </Link>

        {/* Search bar (hidden on mobile) */}
        <div className="hidden md:flex items-center bg-white rounded-xl overflow-hidden shadow-inner w-1/3">
          <input
            type="text"
            placeholder="Search courses..."
            className="flex-1 px-3 py-2 text-gray-700 outline-none"
            aria-label="Search courses"
          />
          <button
            aria-label="Search"
            className="bg-indigo-500 text-white px-4 py-2 hover:bg-indigo-600 transition-all"
          >
            🔍
          </button>
        </div>

        {/* Nav buttons */}
        <nav className="flex items-center space-x-3 text-sm font-medium">
          <Link href="/courses" className="hover:text-yellow-200 transition-colors">
            Courses
          </Link>
          <Link href="/admin" className="hover:text-yellow-200 transition-colors">
            Admin
          </Link>
          <Link
            href="/auth/signin"
            className="bg-white text-indigo-600 px-4 py-1.5 rounded-full font-semibold hover:bg-yellow-50 transition-all"
          >
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
