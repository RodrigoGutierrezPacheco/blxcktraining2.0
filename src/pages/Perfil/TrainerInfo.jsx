import { useState, useEffect } from "react";
import { Award, User, Star, Mail, Phone, MapPin } from "lucide-react";
import { getTrainerById } from "../../services/users";

export default function TrainerInfo({ trainerId }) {
  const [trainerData, setTrainerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrainerData = async () => {
      if (!trainerId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const trainerInfo = await getTrainerById(trainerId);
        setTrainerData(trainerInfo);
      } catch (err) {
        console.error("Error fetching trainer data:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrainerData();
  }, [trainerId]);

  if (isLoading) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-6">
        <p className="text-red-700 text-sm">
          No se pudo cargar la información del entrenador: {error}
        </p>
      </div>
    );
  }

  if (!trainerData) {
    return null;
  }

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
      <h3 className="text-lg font-semibold text-black mb-3 flex items-center gap-2">
        <Award className="h-5 w-5" />
        Tu Entrenador:
      </h3>
      {console.log("trainerData", trainerData)}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <User className="h-4 w-4 text-gray-600" />
          <span className="text-gray-700">
            <span className="font-semibold">{trainerData.fullName}</span>
            {trainerData.specialty && (
              <span className="text-gray-600"> - {trainerData.specialty}</span>
            )}
          </span>
        </div>

        {trainerData.email && (
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-gray-600" />
            <span className="text-gray-700 text-sm">{trainerData.email}</span>
          </div>
        )}

        {trainerData.phone && (
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-gray-600" />
            <span className="text-gray-700 text-sm">{trainerData.phone}</span>
          </div>
        )}

        {trainerData.location && (
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-gray-600" />
            <span className="text-gray-700 text-sm">{trainerData.location}</span>
          </div>
        )}

        {trainerData.rating && (
          <div className="flex items-center gap-3">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-gray-700 text-sm">
              {trainerData.rating} / 5 estrellas
            </span>
          </div>
        )}

        {trainerData.bio && (
          <div className="pt-2 border-t border-gray-200">
            <p className="text-gray-700 text-sm leading-relaxed">
              {trainerData.bio}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
