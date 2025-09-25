import { useState } from "react";
import { Button } from "../Button";
import { X, Mail, Phone, MessageCircle, User, Copy, Check } from "lucide-react";

export default function ContactUserModal({
  isOpen,
  onClose,
  userName,
  userEmail,
  userPhone,
}) {
  const [copiedField, setCopiedField] = useState(null);

  const handleCopyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
  };

  const handleEmailClick = () => {
    if (userEmail) {
      window.open(`mailto:${userEmail}`, '_blank');
    }
  };

  const handleWhatsAppClick = () => {
    if (userPhone) {
      // Remove any non-numeric characters and format for WhatsApp
      const cleanPhone = userPhone.replace(/\D/g, '');
      // Add country code if not present (assuming +52 for Mexico, adjust as needed)
      const formattedPhone = cleanPhone.startsWith('52') ? cleanPhone : `52${cleanPhone}`;
      const whatsappUrl = `https://wa.me/${formattedPhone}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleCallClick = () => {
    if (userPhone) {
      window.open(`tel:${userPhone}`, '_self');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-sm w-full shadow-xl border border-gray-100">
        <div className="p-4">
          {/* Header - Minimalist */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                <User className="h-3 w-3 text-white" />
              </div>
              <h3 className="text-sm font-medium text-gray-900">
                {userName}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Contact Options - Minimalist */}
          <div className="space-y-2">
            {/* Email Option */}
            {userEmail ? (
              <button
                onClick={handleEmailClick}
                className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors group"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm">Email</p>
                  <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyToClipboard(userEmail, 'email');
                  }}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  {copiedField === 'email' ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
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

            {/* Phone Option */}
            {userPhone ? (
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
                    <p className="text-xs text-gray-500 truncate">{userPhone}</p>
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
                    <p className="text-xs text-gray-500 truncate">{userPhone}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyToClipboard(userPhone, 'phone');
                    }}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    {copiedField === 'phone' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
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
                onClick={onClose}
                className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
