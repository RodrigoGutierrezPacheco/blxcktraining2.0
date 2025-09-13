import { useEffect } from "react";
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
  X,
} from "lucide-react";

export default function ClientTrainer({
  selectedUser,
  handleCloseModal,
  formatUserDate,
}) {
  console.log("selectedUser", selectedUser);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Información del Cliente
              </h3>
            </div>
            <Button
              onClick={handleCloseModal}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition-all duration-200"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-6">

          {/* User Avatar and Basic Info */}
          <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 text-lg font-semibold">
              {selectedUser.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                {selectedUser.fullName}
              </h2>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <span className="text-sm">{selectedUser.email}</span>
              </div>
            </div>
          </div>

          {/* Main Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Personal Information */}
            <div className="space-y-4">
              <h4 className="text-base font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Información Personal
              </h4>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                  <Calendar className="h-4 w-4 text-gray-600" />
                  <div>
                    <label className="block text-xs font-medium text-gray-500">
                      Fecha de Registro
                    </label>
                    <p className="text-gray-900 font-medium text-sm">
                      {formatUserDate(selectedUser.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                  <Calendar className="h-4 w-4 text-gray-600" />
                  <div>
                    <label className="block text-xs font-medium text-gray-500">
                      Fecha de Nacimiento
                    </label>
                    <p className="text-gray-900 font-medium text-sm">
                      {selectedUser.dateOfBirth
                        ? formatUserDate(selectedUser.dateOfBirth)
                        : "Sin información"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                  <User className="h-4 w-4 text-gray-600" />
                  <div>
                    <label className="block text-xs font-medium text-gray-500">
                      Edad
                    </label>
                    <p className="text-gray-900 font-medium text-sm">
                      {selectedUser.age
                        ? `${selectedUser.age} años`
                        : "Sin información"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Physical Measurements */}
            <div className="space-y-4">
              <h4 className="text-base font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Medidas Físicas
              </h4>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                  <Scale className="h-4 w-4 text-gray-600" />
                  <div>
                    <label className="block text-xs font-medium text-gray-500">
                      Peso
                    </label>
                    <p className="text-gray-900 font-medium text-sm">
                      {selectedUser.weight
                        ? `${selectedUser.weight} kg`
                        : "Sin información"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                  <Ruler className="h-4 w-4 text-gray-600" />
                  <div>
                    <label className="block text-xs font-medium text-gray-500">
                      Altura
                    </label>
                    <p className="text-gray-900 font-medium text-sm">
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
          <div className="mb-6">
            <h4 className="text-base font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
              Información de Salud
            </h4>

            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Activity className="h-4 w-4 text-gray-600" />
                <h5 className="font-medium text-gray-800 text-sm">
                  Problemas de Salud
                </h5>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                {selectedUser.healthIssues || "Sin información"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              onClick={handleCloseModal}
              className="bg-gray-500 text-white hover:bg-gray-600 px-4 py-2 rounded-lg font-medium transition-all duration-200"
            >
              Cerrar
            </Button>
            <Button className="bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-lg font-medium transition-all duration-200">
              <Plus className="mr-2 h-4 w-4" />
              Asignar Rutina
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
