import {
  X,
  Mail,
  Phone,
  Calendar,
  Award,
  Users,
  CheckCircle,
} from "lucide-react";
import { Button } from "../Button";

export default function TrainerModal({ isOpen, onClose, trainer }) {
  if (!isOpen || !trainer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Fondo mejorado con overlay semitransparente y blur sutil */}
      <div
        className="fixed inset-0 bg-opacity-50 backdrop-blur-sm backdrop-filter"
        onClick={onClose}
      />

      {/* Contenido del modal - ahora con mejor contraste */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-300 transform transition-all duration-300 scale-[0.98] hover:scale-100">
        {/* Close Button más destacado */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full p-2 transition-all duration-200 z-10 shadow-sm"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Trainer Image and Basic Info */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <img
                src={trainer.image || "/placeholder.svg"}
                alt={trainer.name}
                className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className="absolute inset-0 rounded-full border-2 border-black/10 pointer-events-none"></div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {trainer.name}
            </h2>
            <p className="text-xl text-gray-600 mb-4">{trainer.specialty}</p>
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
              <Award className="h-4 w-4 text-yellow-600" />
              <span>{trainer.experience} de experiencia</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-6">
              <Users className="h-4 w-4 text-blue-600" />
              <span>{trainer.clients} clientes satisfechos</span>
            </div>
            <Button className="w-full bg-gradient-to-r from-black to-gray-800 text-white hover:from-gray-800 hover:to-black py-3 shadow-lg">
              <Calendar className="mr-2 h-5 w-5" />
              Agendar Cita
            </Button>
          </div>

          {/* Detailed Info */}
          <div className="text-left">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Acerca de {trainer.name}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">{trainer.bio}</p>

            <h4 className="text-xl font-semibold text-gray-900 mb-3">
              Especialidades:
            </h4>
            <ul className="space-y-2 mb-6">
              {trainer.specialtiesList.map((spec, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 mb-3">
              Filosofía de Entrenamiento:
            </h4>
            <p className="text-gray-700 leading-relaxed mb-6">
              {trainer.philosophy}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
