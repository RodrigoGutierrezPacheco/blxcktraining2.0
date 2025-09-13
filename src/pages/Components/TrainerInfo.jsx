import { Card, CardContent } from "./Card";
import { Button } from "./Button";
import {
  Calendar,
  Dumbbell,
  Mail,
  Phone,
  MapPin,
  Star,
  Clock,
  Edit,
} from "lucide-react";
import { useState } from "react";
import EditTrainerProfileModal from "./Modals/EditTrainerProfileModal";

export default function TrainerInfo({ trainerData, formatDate, onUpdate }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleProfileUpdate = (updatedData) => {
    if (onUpdate) {
      onUpdate(updatedData);
    }
  };

  return (
    <Card className="border border-gray-200 h-full">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Dumbbell className="h-5 w-5 text-gray-600" />
          Información del Entrenador
        </h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Calendar className="h-4 w-4 text-gray-600" />
            <div>
              <label className="block text-xs font-medium text-gray-500">
                Entrenador desde
              </label>
              <span className="text-sm font-medium text-gray-900">
                {trainerData.createdAt
                  ? formatDate(trainerData.createdAt)
                  : "Fecha no disponible"}
              </span>
            </div>
          </div>

          {trainerData.email && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="h-4 w-4 text-gray-600" />
              <div>
                <label className="block text-xs font-medium text-gray-500">
                  Email
                </label>
                <span className="text-sm font-medium text-gray-900">
                  {trainerData.email}
                </span>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Mail className="h-4 w-4 text-gray-600" />
            <div>
              <label className="block text-xs font-medium text-gray-500">
                Verificado
              </label>
              <span className={`text-sm font-medium px-2 py-1 rounded ${
                trainerData.isVerified 
                  ? "bg-green-100 text-green-700" 
                  : "bg-red-100 text-red-700"
              }`}>
                {trainerData.isVerified ? "Verificado" : "No Verificado"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Clock className="h-4 w-4 text-gray-600" />
            <div>
              <label className="block text-xs font-medium text-gray-500">
                Estado
              </label>
              <span className={`text-sm font-medium px-2 py-1 rounded ${
                trainerData.isActive 
                  ? "bg-green-100 text-green-700" 
                  : "bg-gray-100 text-gray-700"
              }`}>
                {trainerData.isActive ? "Activo" : "Inactivo"}
              </span>
            </div>
          </div>

          {trainerData.phone && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="h-4 w-4 text-gray-600" />
              <div>
                <label className="block text-xs font-medium text-gray-500">
                  Teléfono
                </label>
                <span className="text-sm font-medium text-gray-900">
                  {trainerData.phone}
                </span>
              </div>
            </div>
          )}

          {trainerData.age && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="h-4 w-4 text-gray-600" />
              <div>
                <label className="block text-xs font-medium text-gray-500">
                  Edad
                </label>
                <span className="text-sm font-medium text-gray-900">
                  {trainerData.age} años
                </span>
              </div>
            </div>
          )}

          {trainerData.dateOfBirth && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="h-4 w-4 text-gray-600" />
              <div>
                <label className="block text-xs font-medium text-gray-500">
                  Fecha de Nacimiento
                </label>
                <span className="text-sm font-medium text-gray-900">
                  {(() => {
                    try {
                      const date = new Date(trainerData.dateOfBirth);
                      if (isNaN(date.getTime())) {
                        return "Fecha inválida";
                      }
                      return date.toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      });
                    } catch {
                      return "Fecha no disponible";
                    }
                  })()}
                </span>
              </div>
            </div>
          )}

          {trainerData.curp && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Dumbbell className="h-4 w-4 text-gray-600" />
              <div>
                <label className="block text-xs font-medium text-gray-500">
                  CURP
                </label>
                <span className="font-mono text-sm bg-white px-2 py-1 rounded border border-gray-200">
                  {trainerData.curp}
                </span>
              </div>
            </div>
          )}

          {trainerData.rfc && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Dumbbell className="h-4 w-4 text-gray-600" />
              <div>
                <label className="block text-xs font-medium text-gray-500">
                  RFC
                </label>
                <span className="font-mono text-sm bg-white px-2 py-1 rounded border border-gray-200">
                  {trainerData.rfc}
                </span>
              </div>
            </div>
          )}

          {trainerData.updatedAt && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Clock className="h-4 w-4 text-gray-600" />
              <div>
                <label className="block text-xs font-medium text-gray-500">
                  Última actualización
                </label>
                <span className="text-sm font-medium text-gray-900">
                  {formatDate(trainerData.updatedAt)}
                </span>
              </div>
            </div>
          )}

          {trainerData.rating && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Star className="h-4 w-4 text-gray-600" />
              <div>
                <label className="block text-xs font-medium text-gray-500">
                  Calificación
                </label>
                <span className="text-sm font-medium text-gray-900">
                  {trainerData.rating} / 5 estrellas
                </span>
              </div>
            </div>
          )}

          <div className="pt-4">
            <Button
              className="w-full bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-lg font-medium transition-all duration-200"
              onClick={handleEditClick}
            >
              <Edit className="mr-2 h-4 w-4" />
              Editar Perfil
            </Button>
          </div>
        </div>
      </CardContent>
      <EditTrainerProfileModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        trainerData={trainerData}
        onUpdate={handleProfileUpdate}
      />
    </Card>
  );
}
