import { Award } from "lucide-react";

export default function TrainerProfileHeader({ trainerData }) {
  return (
    <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative">
          <img
            src="/public/images/BTNegro.png"
            alt="Imagen de perfil del entrenador"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border border-gray-200"
          />
          {trainerData.verified && (
            <div className="absolute -bottom-1 -right-1 bg-gray-600 text-white rounded-full p-1">
              <Award className="h-3 w-3" />
            </div>
          )}
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">
            {trainerData.fullName}
          </h1>
          <p className="text-gray-600 text-sm">
            Entrenador en BLXCK Training
          </p>
          {trainerData.specialty && (
            <p className="text-gray-500 text-sm mt-1">
              {trainerData.specialty}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
