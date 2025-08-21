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

export default function TrainerInfo({ trainerData, formatDate }) {
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

          {trainerData.email && (
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-600" />
              <span>
                Email:{" "}
                <span className="font-semibold">{trainerData.email}</span>
              </span>
            </div>
          )}

          {trainerData.phone && (
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gray-600" />
              <span>
                Teléfono:{" "}
                <span className="font-semibold">{trainerData.phone}</span>
              </span>
            </div>
          )}

          {trainerData.location && (
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-gray-600" />
              <span>
                Ubicación:{" "}
                <span className="font-semibold">
                  {trainerData.location}
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

          {trainerData.experience && (
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gray-600" />
              <span>
                Experiencia:{" "}
                <span className="font-semibold">
                  {trainerData.experience}
                </span>
              </span>
            </div>
          )}

          <div className="pt-4">
            <Button
              variant="outline"
              className="w-full border-black text-black hover:bg-gray-100 bg-transparent"
              onClick={() => {
                // TODO: Implementar edición
              }}
            >
              <Edit className="mr-2 h-4 w-4" />
              Editar Perfil
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
