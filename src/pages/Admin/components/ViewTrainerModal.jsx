import { Button } from "../../Components/Button";
import { X, Mail, Phone, Calendar, User, Star, MapPin, Award, Users } from "lucide-react";

export default function ViewTrainerModal({ trainer, isOpen, onClose, isLoading = false }) {
  if (!isOpen) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!trainer) return null;

  console.log("Datos del entrenador para visualización:", trainer);

  const formatDate = (dateString) => {
    if (!dateString) return "Sin fecha";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Información del Entrenador
          </h2>
          <Button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Basic Info */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Información Personal
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <User className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Nombre Completo</p>
                    <p className="font-medium text-gray-900">
                      {trainer.fullName || "Sin nombre"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">
                      {trainer.email || "Sin email"}
                    </p>
                  </div>
                </div>
              </div>

              {trainer.phone && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Phone className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Teléfono</p>
                      <p className="font-medium text-gray-900">{trainer.phone}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Fecha de Registro</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(trainer.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Personal Info */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Información Adicional
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trainer.age && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-orange-100 p-2 rounded-full">
                      <User className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Edad</p>
                      <p className="font-medium text-gray-900">{trainer.age} años</p>
                    </div>
                  </div>
                </div>
              )}

              {trainer.dateOfBirth && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-pink-100 p-2 rounded-full">
                      <Calendar className="h-5 w-5 text-pink-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fecha de Nacimiento</p>
                      <p className="font-medium text-gray-900">
                        {formatDate(trainer.dateOfBirth)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {trainer.rfc && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-indigo-100 p-2 rounded-full">
                      <User className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">RFC</p>
                      <p className="font-mono font-medium text-gray-900">{trainer.rfc}</p>
                    </div>
                  </div>
                </div>
              )}

              {trainer.curp && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-teal-100 p-2 rounded-full">
                      <User className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">CURP</p>
                      <p className="font-mono font-medium text-gray-900">{trainer.curp}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Status and Verification */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Estado y Verificación
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      trainer.isActive ? "bg-green-400" : "bg-red-400"
                    }`}
                  ></div>
                  <div>
                    <p className="text-sm text-gray-500">Estado</p>
                    <p
                      className={`font-medium ${
                        trainer.isActive ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {trainer.isActive ? "Activo" : "Inactivo"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-100 p-2 rounded-full">
                    <Star className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Verificación</p>
                    <p
                      className={`font-medium ${
                        trainer.isVerified ? "text-green-700" : "text-yellow-700"
                      }`}
                    >
                      {trainer.isVerified ? "Verificado" : "Pendiente"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Estadísticas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Usuarios Asignados</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {trainer.assignedUsersCount || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Award className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">ID de Entrenador</p>
                    <p className="font-mono text-sm text-gray-900">
                      {trainer.id || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          {trainer.bio && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Biografía
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">{trainer.bio}</p>
              </div>
            </div>
          )}

                     {trainer.specialties && trainer.specialties.length > 0 && (
             <div className="mb-6">
               <h3 className="text-lg font-medium text-gray-900 mb-4">
                 Especialidades
               </h3>
               <div className="flex flex-wrap gap-2">
                 {trainer.specialties.map((specialty, index) => (
                   <span
                     key={index}
                     className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                   >
                     {specialty}
                   </span>
                 ))}
               </div>
             </div>
           )}

           {/* Verification Action */}
           <div className="mb-6">
             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
               <h4 className="text-sm font-medium text-blue-900 mb-2">
                 Estado de Verificación
               </h4>
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <Star className="h-5 w-5 text-yellow-500" />
                   <span className="text-sm text-blue-700">
                     {trainer.isVerified ? "Entrenador Verificado" : "Entrenador Pendiente de Verificación"}
                   </span>
                 </div>
                 <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                   trainer.isVerified 
                     ? "bg-green-100 text-green-800" 
                     : "bg-yellow-100 text-yellow-800"
                 }`}>
                   {trainer.isVerified ? "Verificado" : "Pendiente"}
                 </div>
               </div>
             </div>
           </div>
         </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <Button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 hover:bg-gray-400 px-4 py-2 rounded-lg"
          >
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}
