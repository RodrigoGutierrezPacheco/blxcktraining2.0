import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Mail, Phone, User } from "lucide-react";

const FloatingTrainerContactButton = ({ trainerData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const toggleContactPanel = () => {
    setIsOpen(!isOpen);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleEmailClick = () => {
    if (trainerData?.email) {
      window.open(`mailto:${trainerData.email}`, '_blank');
    }
  };

  const handleWhatsAppClick = () => {
    if (trainerData?.phone) {
      const cleanPhone = trainerData.phone.replace(/\D/g, '');
      const formattedPhone = cleanPhone.startsWith('52') ? cleanPhone : `52${cleanPhone}`;
      const whatsappUrl = `https://wa.me/${formattedPhone}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleCallClick = () => {
    if (trainerData?.phone) {
      window.open(`tel:${trainerData.phone}`, '_blank');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {isOpen && (
        <div 
          ref={modalRef}
          className="absolute bottom-16 right-0 bg-white rounded-xl shadow-2xl border border-gray-100 p-3 w-72 sm:w-80 max-w-[calc(100vw-2rem)] animate-in slide-in-from-bottom-2 duration-200"
        >
          {/* Header - Minimalist */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <User className="h-3 w-3 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  {trainerData?.fullName || "Entrenador"}
                </h3>
                <p className="text-xs text-gray-500">¿Tienes alguna duda?</p>
              </div>
            </div>
            <button
              onClick={toggleContactPanel}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          </div>

          {/* Separator */}
          <div className="border-t border-gray-100 mb-3"></div>

          {/* Contact Options - Compact */}
          <div className="space-y-2">
            {/* Email Option */}
            {trainerData?.email ? (
              <button
                onClick={handleEmailClick}
                className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors group"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm">Email</p>
                  <p className="text-xs text-gray-500 truncate">{trainerData.email}</p>
                </div>
              </button>
            ) : (
              <div className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <div className="text-left flex-1">
                  <p className="font-medium text-gray-500 text-sm">Email</p>
                  <p className="text-xs text-gray-400">No disponible</p>
                </div>
              </div>
            )}

            {/* Phone Options */}
            {trainerData?.phone ? (
              <div className="space-y-2">
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                >
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">WhatsApp</p>
                    <p className="text-xs text-gray-500 truncate">{trainerData.phone}</p>
                  </div>
                </button>
                
                <button
                  onClick={handleCallClick}
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                >
                  <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">Llamar</p>
                    <p className="text-xs text-gray-500 truncate">{trainerData.phone}</p>
                  </div>
                </button>
              </div>
            ) : (
              <div className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-4 w-4 text-gray-400" />
                </div>
                <div className="text-left flex-1">
                  <p className="font-medium text-gray-500 text-sm">Teléfono</p>
                  <p className="text-xs text-gray-400">No disponible</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer - Minimalist */}
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="flex justify-end">
              <button
                onClick={toggleContactPanel}
                className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleContactPanel}
        className="bg-green-600 hover:bg-green-700 text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
        aria-label="Contactar entrenador"
      >
        <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
};

export default FloatingTrainerContactButton;
