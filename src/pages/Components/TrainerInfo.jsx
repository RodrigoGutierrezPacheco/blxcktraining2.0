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
  console.log("tr ", trainerData)
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
    <Card className="border-2 border-black h-full">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
          <Dumbbell className="h-6 w-6" />
          Información del Entrenador
        </h2>
        <div className="space-y-4 text-gray-700">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-gray-600" />
            <span>
              Entrenador desde:{" "}
              <span className="font-semibold">
                {trainerData.createdAt
                  ? formatDate(trainerData.createdAt)
                  : "Fecha no disponible"}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Dumbbell className="h-5 w-5 text-gray-600" />
            <span>
              ID:{" "}
              <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                {trainerData.id}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Dumbbell className="h-5 w-5 text-gray-600" />
            <span>
              Rol:{" "}
              <span className="font-semibold capitalize">
                {trainerData.role}
              </span>
            </span>
          </div>

          {trainerData.email && (
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-600" />
              <span>
                Email:{" "}
                <span className="font-semibold">{trainerData.email}</span>
              </span>
            </div>
          )}

          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-gray-600" />
            <span>
              Verificado:{" "}
              <span className={`font-semibold px-2 py-1 rounded-full text-sm ${
                trainerData.isVerified 
                  ? "bg-green-100 text-green-800 border border-green-200" 
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}>
                {trainerData.isVerified ? "✓ Verificado" : "✗ No Verificado"}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-gray-600" />
            <span>
              Estado:{" "}
              <span className={`font-semibold px-2 py-1 rounded-full text-sm ${
                trainerData.isActive 
                  ? "bg-blue-100 text-blue-800 border border-blue-200" 
                  : "bg-gray-100 text-gray-800 border border-gray-200"
              }`}>
                {trainerData.isActive ? "✓ Activo" : "✗ Inactivo"}
              </span>
            </span>
          </div>

          {trainerData.phone && (
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gray-600" />
              <span>
                Teléfono:{" "}
                <span className="font-semibold">{trainerData.phone}</span>
              </span>
            </div>
          )}

          {trainerData.age && (
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-600" />
              <span>
                Edad:{" "}
                <span className="font-semibold">{trainerData.age} años</span>
              </span>
            </div>
          )}

          {trainerData.dateOfBirth && (
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-600" />
              <span>
                Fecha de Nacimiento:{" "}
                <span className="font-semibold">
                  {(() => {
                    try {
                      const date = new Date(trainerData.dateOfBirth);
                      // Verificar si la fecha es válida
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
              </span>
            </div>
          )}

          {trainerData.curp && (
            <div className="flex items-center gap-3">
              <Dumbbell className="h-5 w-5 text-gray-600" />
              <span>
                CURP:{" "}
                <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                  {trainerData.curp}
                </span>
              </span>
            </div>
          )}

          {trainerData.rfc && (
            <div className="flex items-center gap-3">
              <Dumbbell className="h-5 w-5 text-gray-600" />
              <span>
                RFC:{" "}
                <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                  {trainerData.rfc}
                </span>
              </span>
            </div>
          )}

          {trainerData.updatedAt && (
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gray-600" />
              <span>
                Última actualización:{" "}
                <span className="font-semibold">
                  {formatDate(trainerData.updatedAt)}
                </span>
              </span>
            </div>
          )}

          {trainerData.rating && (
            <div className="flex items-center gap-3">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>
                Calificación:{" "}
                <span className="font-semibold">
                  {trainerData.rating} / 5 estrellas
                </span>
              </span>
            </div>
          )}

          <div className="pt-4">
            <Button
              variant="outline"
              className="w-full border-black text-black hover:bg-gray-100 bg-transparent"
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
