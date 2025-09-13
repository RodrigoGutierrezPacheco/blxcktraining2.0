import { useState, useRef, useEffect } from "react";
import { Menu, X, Play, User, Dumbbell } from "lucide-react";
import { Button } from "./Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { isTokenExpired } from "../../utils/tokenUtils";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);
  const timeoutRef = useRef(null);
  const { user, logout, isTrainer, token } = useAuth();

  // Verificar si el token ha expirado
  useEffect(() => {
    if (token && isTokenExpired(token)) {
      console.warn('Token expired, logging out user');
      logout();
      navigate('/login');
    }
  }, [token, logout, navigate]);

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

  const handleLogout = () => {
    logout();
    navigate("/");
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="mx-auto">
        <div className="flex items-center h-16 w-full justify-between px-3">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <Play className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold text-black">
                BLXCK<span className="text-gray-600">TRAINING</span>
              </span>
            </a>
          </div>

          <div className="hidden lg:flex items-center justify-between gap-5">
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

          <div className="hidden lg:flex items-center justify-between gap-3">
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
                  {isTrainer ? (
                    <Dumbbell className="h-5 w-5 mr-2" />
                  ) : (
                    <User className="h-5 w-5 mr-2" />
                  )}
                  Bienvenido, {user.fullName.split(" ")[0].charAt(0).toUpperCase() + user.fullName.split(" ")[0].slice(1)}
                  {isTrainer && " (Entrenador)"}
                </button>
                {isProfileOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {!isActive("/perfil") && !isTrainer && (
                      <a
                        href="/perfil"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Ver Perfil
                      </a>
                    )}
                    {!isActive("/entrenadores/perfil") && isTrainer && (
                      <a
                        href="/entrenadores/perfil"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Ver Perfil de Entrenador
                      </a>
                    )}
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
              <>
                <a
                  href="/login"
                  className={`flex items-center text-gray-700 hover:text-black font-medium transition-colors duration-200 ${
                    isActive("/login") ? "text-black" : ""
                  }`}
                >
                  <User className="h-5 w-5 mr-2" />
                  Iniciar Sesión
                </a>
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
              </>
            )}
          </div>

          <div className="lg:hidden flex items-center justify-between">
            {!user && (
              <a href="/login" className="mr-4 text-gray-700 hover:text-black">
                <User className="h-5 w-5" />
              </a>
            )}
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-black focus:outline-none"
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
          className={`lg:hidden fixed inset-0 bg-white z-40 transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out`}
          style={{ top: "64px" }}
        >
          <div className="px-4 pt-2 pb-8 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`block px-4 py-3 text-lg font-medium rounded-lg ${
                  isActive(link.href)
                    ? "bg-gray-100 text-black"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}

            <div className="pt-4 border-t border-gray-200">
              {user ? (
                <>
                  {!isActive("/perfil") && !isTrainer && (
                    <a
                      href="/perfil"
                      className={`block px-4 py-3 text-lg font-medium rounded-lg ${
                        isActive("/perfil")
                          ? "bg-gray-100 text-black"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Mi Perfil
                    </a>
                  )}
                  {!isActive("/entrenadores/perfil") && isTrainer && (
                    <a
                      href="/entrenadores/perfil"
                      className={`block px-4 py-3 text-lg font-medium rounded-lg ${
                        isActive("/entrenadores/perfil")
                          ? "bg-gray-100 text-black"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Mi Perfil de Entrenador
                    </a>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 text-lg font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <Button
                  size="lg"
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
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
