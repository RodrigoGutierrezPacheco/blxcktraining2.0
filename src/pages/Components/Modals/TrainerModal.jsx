import { X, Mail, Phone, Calendar, Award, Users, CheckCircle } from "lucide-react"
import { Button } from "../Button"

export default function TrainerModal({ isOpen, onClose, trainer }) {
  if (!isOpen || !trainer) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
      <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black transition-colors"
          aria-label="Cerrar"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Trainer Image and Basic Info */}
          <div className="flex flex-col items-center text-center">
            <img
              src={trainer.image || "/placeholder.svg"}
              alt={trainer.name}
              className="w-48 h-48 rounded-full object-cover mb-6 border-4 border-black"
            />
            <h2 className="text-3xl font-bold text-black mb-2">{trainer.name}</h2>
            <p className="text-xl text-gray-700 mb-4">{trainer.specialty}</p>
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
              <Award className="h-4 w-4" />
              <span>{trainer.experience} de experiencia</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-6">
              <Users className="h-4 w-4" />
              <span>{trainer.clients} clientes satisfechos</span>
            </div>
            <Button className="w-full bg-black text-white hover:bg-gray-800 py-3">
              <Calendar className="mr-2 h-5 w-5" />
              Agendar Cita
            </Button>
          </div>

          {/* Detailed Info */}
          <div className="text-left">
            <h3 className="text-2xl font-bold text-black mb-4">Acerca de {trainer.name}</h3>
            <p className="text-gray-700 leading-relaxed mb-6">{trainer.bio}</p>

            <h4 className="text-xl font-semibold text-black mb-3">Especialidades:</h4>
            <ul className="space-y-2 mb-6">
              {trainer.specialtiesList.map((spec, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>

            <h4 className="text-xl font-semibold text-black mb-3">Filosofía de Entrenamiento:</h4>
            <p className="text-gray-700 leading-relaxed mb-6">{trainer.philosophy}</p>

            <h4 className="text-xl font-semibold text-black mb-3">Contacto:</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="h-5 w-5" />
                <span>{trainer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="h-5 w-5" />
                <span>{trainer.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
