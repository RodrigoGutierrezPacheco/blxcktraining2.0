import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Mail, Phone, User } from "lucide-react";

const FloatingContactButton = ({ trainerData }) => {
    console.log("Datos del entrenador:", trainerData);
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
      // Remove any non-numeric characters and format for WhatsApp
      const cleanPhone = trainerData.phone.replace(/\D/g, '');
      // Add country code if not present (assuming +52 for Mexico, adjust as needed)
      const formattedPhone = cleanPhone.startsWith('52') ? cleanPhone : `52${cleanPhone}`;
      const whatsappUrl = `https://wa.me/${formattedPhone}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  // Always show the button, even if trainer data is not available

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Contact Panel */}
      {isOpen && (
        <div 
          ref={modalRef}
          className="absolute bottom-16 right-0 bg-white rounded-xl shadow-2xl border border-gray-100 p-3 w-72 sm:w-80 max-w-[calc(100vw-2rem)] animate-in slide-in-from-bottom-2 duration-200"
        >
          {/* Header - Minimalist */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
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
              className="p-1 cursor-pointer hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          </div>

          {/* Separator */}
          <div className="border-t border-gray-100 mb-3"></div>

          {/* Contact Options - Compact */}
          <div className="space-y-2">
            {trainerData?.email ? (
              <button
                onClick={handleEmailClick}
                className="w-full cursor-pointer flex items-center gap-3 p-2.5 hover:bg-gray-50 rounded-lg transition-colors group"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm">Email</p>
                  <p className="text-xs text-gray-500 truncate">{trainerData.email}</p>
                </div>
              </button>
            ) : null}

            {trainerData?.phone ? (
              <button
                onClick={handleWhatsAppClick}
                className="w-full cursor-pointer flex items-center gap-3 p-2.5 hover:bg-gray-50 rounded-lg transition-colors group"
              >
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm">WhatsApp</p>
                  <p className="text-xs text-gray-500 truncate">{trainerData.phone}</p>
                </div>
              </button>
            ) : null}

            {!trainerData && (
              <div className="text-center cursor-pointer py-3">
                <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse mx-auto mb-2"></div>
                <p className="text-gray-500 text-xs">Cargando...</p>
              </div>
            )}

            {trainerData && !trainerData.email && !trainerData.phone && (
              <div className="text-center cursor-pointer py-3">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <User className="h-3 w-3 text-gray-400" />
                </div>
                <p className="text-gray-500 text-xs">Sin contacto disponible</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleContactPanel}
        className={`w-14 cursor-pointer h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group ${
          isOpen ? 'rotate-45' : 'rotate-0'
        }`}
        title="Contactar entrenador"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>
    </div>
  );
};

export default FloatingContactButton;
