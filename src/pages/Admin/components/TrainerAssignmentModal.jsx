import { Button } from "../../Components/Button";

export default function TrainerAssignmentModal({ isOpen, user, onClose, onAssign }) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Asignar Entrenador
        </h3>
        <p className="text-gray-600 mb-4">
          Usuario: <strong>{user.fullName}</strong>
        </p>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Seleccionar Entrenador
          </label>
          <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
            <option value="">Seleccionar entrenador...</option>
            {/* TODO: Listar entrenadores disponibles */}
          </select>
        </div>
        <div className="flex justify-end gap-3">
          <Button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 hover:bg-gray-400 px-4 py-2 rounded-lg"
          >
            Cancelar
          </Button>
          <Button
            onClick={onAssign}
            className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            Asignar
          </Button>
        </div>
      </div>
    </div>
  );
}
