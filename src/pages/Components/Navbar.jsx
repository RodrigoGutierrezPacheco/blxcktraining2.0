import { useState, useEffect, useRef } from "react";
import { Menu, X, Play, User } from "lucide-react";
import { Button } from "./Button";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userBlck");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsProfileOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsProfileOpen(false);
    }, 300);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("userBlck");
    setUser(null);
    navigate("/");
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Entrenamientos", href: "/entrenamientos" },
    { name: "Sobre Nosotros", href: "/sobre-nosotros" },
    { name: "Planes", href: "/planes" },
    { name: "Entrenadores", href: "/entrenadores" },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
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

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-gray-700 hover:text-black font-medium transition-colors duration-200 relative group ${
                  isActive(link.href) ? "text-black" : ""
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-black transition-all duration-200 ${
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div
                className="relative"
                ref={profileMenuRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="flex items-center text-gray-700 hover:text-black font-medium transition-colors duration-200"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <User className="h-5 w-5 mr-2" />
                  Bienvenido, Rodrigo
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-black transition-all duration-200 ${
                      isActive("/perfil") ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </button>
                {isProfileOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <a
                      href="/perfil"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Ver Perfil
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="/login"
                className={`flex items-center text-gray-700 hover:text-black font-medium transition-colors duration-200 group relative ${
                  isActive("/login") ? "text-black" : ""
                }`}
              >
                <User className="h-5 w-5 mr-2" />
                Iniciar Sesión
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-black transition-all duration-200 ${
                    isActive("/login") ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </a>
            )}
            {!user && (
              <Button
                size="sm"
                className="bg-black text-white hover:bg-gray-800 px-6"
                onClick={() =>
                  window.open(
                    "https://wa.me/5638686467?text=Hola!%20quisiera%20mi%20entrenamiento%20de%20prueba%20por%202%20semanas",
                    "_blank"
                  )
                }
              >
                Comenzar Ahora
              </Button>
            )}
          </div>

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
                className={`block px-3 py-2 font-medium transition-colors duration-200 rounded-md ${
                  isActive(link.href)
                    ? "text-black bg-gray-100"
                    : "text-gray-700 hover:text-black hover:bg-gray-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              {user ? (
                <>
                  <a
                    href="/perfil"
                    className={`flex items-center px-3 py-2 font-medium transition-colors duration-200 rounded-md ${
                      isActive("/perfil")
                        ? "text-black bg-gray-100"
                        : "text-gray-700 hover:text-black hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5 mr-2" />
                    Bienvenido, Rodrigo
                  </a>
                  <Button
                    size="sm"
                    className="w-full bg-black text-white hover:bg-gray-800 mt-2"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </Button>
                </>
              ) : (
                <>
                  <a
                    href="/login"
                    className={`flex items-center px-3 py-2 font-medium transition-colors duration-200 rounded-md ${
                      isActive("/login")
                        ? "text-black bg-gray-100"
                        : "text-gray-700 hover:text-black hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5 mr-2" />
                    Iniciar Sesión
                  </a>
                  <Button
                    size="sm"
                    className="w-full bg-black text-white hover:bg-gray-800 mt-2"
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.open(
                        "https://wa.me/5638686467?text=Hola!%20quisiera%20mi%20entrenamiento%20de%20prueba%20por%202%20semanas",
                        "_blank"
                      );
                    }}
                  >
                    Comenzar Ahora
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
