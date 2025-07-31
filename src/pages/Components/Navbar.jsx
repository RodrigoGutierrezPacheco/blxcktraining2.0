import { useState } from "react";
import { Menu, X, Play, User } from "lucide-react";
import { Button } from "./Button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Entrenamientos", href: "/entrenamientos" },
    { name: "Sobre Nosotros", href: "/sobre-nosotros" },
    { name: "Planes", href: "/planes" },
    { name: "Entrenadores", href: "/entrenadores" },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <Play className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold text-black">
                BLXCK<span className="text-gray-600">TRAINING</span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-black font-medium transition-colors duration-200 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-200 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/login"
              className="flex items-center text-gray-700 hover:text-black font-medium transition-colors duration-200 group"
            >
              <User className="h-5 w-5 mr-2" />
              Iniciar Sesión
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-200 group-hover:w-full"></span>
            </a>
            <Button
              size="sm"
              className="bg-black text-white hover:bg-gray-800 px-6"
            >
              Comenzar Ahora
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-black focus:outline-none focus:text-black transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-96 opacity-100 pb-4"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="pt-4 pb-2 space-y-1 border-t border-gray-100">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 text-gray-700 hover:text-black hover:bg-gray-50 font-medium transition-colors duration-200 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="/inicio-sesion"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-black hover:bg-gray-50 font-medium transition-colors duration-200 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-5 w-5 mr-2" />
                Iniciar Sesión
              </a>
            </div>
            <div className="pt-2">
              <Button
                size="sm"
                className="w-full bg-black text-white hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Comenzar Ahora
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
