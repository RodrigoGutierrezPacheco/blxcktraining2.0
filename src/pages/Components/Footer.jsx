import {
  Play,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
} from "lucide-react";
import { Button } from "./Button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { name: "Inicio", href: "#inicio" },
    { name: "Entrenamientos", href: "#entrenamientos" },
    { name: "Sobre Nosotros", href: "#sobre-nosotros" },
    { name: "Testimonios", href: "#testimonios" },
    { name: "Contacto", href: "#contacto" },
  ];

  const trainingTypes = [
    { name: "Entrenamiento en Casa", href: "#casa" },
    { name: "Entrenamiento en Gimnasio", href: "#gimnasio" },
    { name: "Entrenamiento Funcional", href: "#funcional" },
    { name: "Cardio Intensivo", href: "#cardio" },
    { name: "Fuerza y Resistencia", href: "#fuerza" },
  ];

  const legalLinks = [
    { name: "Términos y Condiciones", href: "#terminos" },
    { name: "Política de Privacidad", href: "#privacidad" },
    { name: "Política de Reembolso", href: "#reembolso" },
    { name: "Preguntas Frecuentes", href: "#faq" },
  ];

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "#instagram" },
    { name: "Facebook", icon: Facebook, href: "#facebook" },
    { name: "Twitter", icon: Twitter, href: "#twitter" },
    { name: "YouTube", icon: Youtube, href: "#youtube" },
  ];

  return (
    <footer className="bg-black text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Mantente en Forma con Nosotros
            </h3>
            <p className="text-gray-300 mb-6">
              Recibe tips de entrenamiento, rutinas exclusivas y ofertas
              especiales directamente en tu email.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
              />
              <Button className="bg-white text-black hover:bg-gray-100 px-6 py-3">
                Suscribirse
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Play className="h-4 w-4 text-black" />
              </div>
              <span className="text-xl font-bold">
                BLXCK<span className="text-gray-400">TRAINING</span>
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transformamos vidas a través del entrenamiento funcional. Entrena
              donde quieras, cuando quieras, con los mejores profesionales.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300 text-sm">
                  info@blxcktraining.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300 text-sm">
                  Ciudad de México, México
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Training Types */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Entrenamientos</h4>
            <ul className="space-y-2">
              {trainingTypes.map((training) => (
                <li key={training.name}>
                  <a
                    href={training.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {training.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Soporte</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {currentYear} BLXCK Training. Todos los derechos reservados.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm mr-2">Síguenos:</span>
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <IconComponent className="h-4 w-4" />
                  </a>
                );
              })}
            </div>

            {/* Additional Info */}
            <div className="text-gray-400 text-sm">
              Hecho con ❤️ para tu transformación
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
