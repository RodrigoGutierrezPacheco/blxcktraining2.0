import { Card, CardContent } from "./Card";
import { Users, Award, Clock } from "lucide-react";

export default function TrainerStatsBio({ trainerData, usersData }) {
  return (
    <Card className="border-2 border-black h-full">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
          <Users className="h-6 w-6" />
          Estadísticas y Biografía
        </h2>

        {trainerData ? (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-black">
                  {usersData.length}
                </div>
                <div className="text-sm text-gray-600">Clientes</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-black">
                  {trainerData.activePrograms || 0}
                </div>
                <div className="text-sm text-gray-600">
                  Programas Activos
                </div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-black">
                  {trainerData.completedSessions || 0}
                </div>
                <div className="text-sm text-gray-600">
                  Sesiones Completadas
                </div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-black">
                  {trainerData.rating || "N/A"}
                </div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </div>

            {/* Bio Section */}
            {trainerData.bio && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-black mb-3">
                  Sobre mí
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {trainerData.bio}
                </p>
              </div>
            )}

            {/* Certifications */}
            {trainerData.certifications &&
              trainerData.certifications.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-black mb-3">
                    Certificaciones
                  </h3>
                  <div className="space-y-2">
                    {trainerData.certifications.map((cert, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2"
                      >
                        <Award className="h-4 w-4 text-blue-600" />
                        <span className="text-gray-700">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Specialties */}
            {trainerData.specialties &&
              trainerData.specialties.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-black mb-3">
                    Especialidades
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {trainerData.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg mb-4">
              No hay información disponible del entrenador.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
