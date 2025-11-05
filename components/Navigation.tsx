'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [adminMode, setAdminMode] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  
  const handleLogoClick = () => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);
    
    // Secret activation on "@HVRS" pattern
    if (newCount === 5) {
      setShowAdminLogin(true);
      setLogoClickCount(0);
    }
    
    // Reset count after 2 seconds
    setTimeout(() => setLogoClickCount(0), 2000);
  };
  
  const handleAdminLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');
    
    if (username === 'HARSHA9949' && password === 'HARSHA9949') {
      setAdminMode(true);
      setShowAdminLogin(false);
    }
  };
  
  return (
    <>
      <nav className="sticky top-0 z-40 bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <button 
              onClick={handleLogoClick}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <span className="text-2xl font-bold text-gradient">Educent Pro</span>
              <span className="text-xs bg-gradient-primary text-white px-2 py-1 rounded">
                {adminMode ? 'ADMIN' : '@HVRS'}
              </span>
            </button>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-primary transition">
                Home
              </Link>
              <Link href="/dashboard/student" className="text-gray-700 hover:text-student transition">
                Student
              </Link>
              <Link href="/dashboard/lecturer" className="text-gray-700 hover:text-lecturer transition">
                Lecturer
              </Link>
              <Link href="/dashboard/principal" className="text-gray-700 hover:text-principal transition">
                Principal
              </Link>
              {adminMode && (
                <Link href="/admin" className="text-white bg-admin px-4 py-2 rounded-lg hover:bg-gray-900 transition">
                  Admin HQ
                </Link>
              )}
              <button className="px-5 py-2 gradient-primary text-white rounded-lg hover:opacity-90 transition">
                Sign In
              </button>
              <button className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                Request Demo
              </button>
            </div>
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-2">
              <Link href="/" className="block py-2 text-gray-700 hover:text-primary">
                Home
              </Link>
              <Link href="/dashboard/student" className="block py-2 text-gray-700 hover:text-student">
                Student
              </Link>
              <Link href="/dashboard/lecturer" className="block py-2 text-gray-700 hover:text-lecturer">
                Lecturer
              </Link>
              <Link href="/dashboard/principal" className="block py-2 text-gray-700 hover:text-principal">
                Principal
              </Link>
              {adminMode && (
                <Link href="/admin" className="block py-2 text-white bg-admin px-4 rounded">
                  Admin HQ
                </Link>
              )}
              <button className="w-full py-2 gradient-primary text-white rounded-lg">
                Sign In
              </button>
              <button className="w-full py-2 border border-gray-300 rounded-lg">
                Request Demo
              </button>
            </div>
          </div>
        )}
      </nav>
      
      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Main Admin Access</h2>
            <form onSubmit={handleAdminLogin}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="w-full px-4 py-2 border rounded-lg mb-3"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg mb-4"
                required
              />
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-admin text-white rounded-lg hover:bg-gray-900"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setShowAdminLogin(false)}
                  className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}