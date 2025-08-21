import { Button } from "../Button";
import {
  Plus,
  Calendar,
  Mail,
  User,
  Heart,
  Activity,
  Ruler,
  Scale,
} from "lucide-react";

export default function ClientTrainer({
  selectedUser,
  handleCloseModal,
  formatUserDate,
}) {
  console.log("selectedUser", selectedUser);
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-2xl font-bold text-black mb-2">
                Información Completa del Cliente
              </h3>
              <p className="text-gray-600">
                Perfil detallado de {selectedUser.fullName}
              </p>
            </div>
            <Button
              onClick={handleCloseModal}
              className="text-gray-500 hover:text-gray-700 bg-transparent hover:bg-gray-100 p-2 rounded-full"
            >
              ✕
            </Button>
          </div>

          {/* User Avatar and Basic Info */}
          <div className="flex items-center gap-6 mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {selectedUser.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedUser.fullName}
              </h2>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{selectedUser.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Información Personal
              </h4>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Fecha de Registro
                    </label>
                    <p className="text-gray-900 font-medium">
                      {formatUserDate(selectedUser.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-green-600" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Fecha de Nacimiento
                    </label>
                    <p className="text-gray-900 font-medium">
                      {selectedUser.dateOfBirth
                        ? formatUserDate(selectedUser.dateOfBirth)
                        : "Sin información"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <User className="h-5 w-5 text-purple-600" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Edad
                    </label>
                    <p className="text-gray-900 font-medium">
                      {selectedUser.age
                        ? `${selectedUser.age} años`
                        : "Sin información"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Physical Measurements */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Medidas Físicas
              </h4>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Scale className="h-5 w-5 text-orange-600" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Peso
                    </label>
                    <p className="text-gray-900 font-medium">
                      {selectedUser.weight
                        ? `${selectedUser.weight} kg`
                        : "Sin información"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Ruler className="h-5 w-5 text-teal-600" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Altura
                    </label>
                    <p className="text-gray-900 font-medium">
                      {selectedUser.height
                        ? `${selectedUser.height} cm`
                        : "Sin información"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Health Information */}
          <div className="mb-8">
            <h4 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
              Información de Salud
            </h4>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <Activity className="h-5 w-5 text-gray-600" />
                  <h5 className="font-semibold text-gray-800">
                    Problemas de Salud
                  </h5>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {selectedUser.healthIssues || "Sin información"}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <Button
              onClick={handleCloseModal}
              className="bg-gray-500 text-white hover:bg-gray-600 px-6 py-3"
            >
              Cerrar
            </Button>
            <Button className="bg-green-600 text-white hover:bg-green-700 px-6 py-3">
              <Plus className="mr-2 h-5 w-5" />
              Asignar Rutina Personalizada
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
