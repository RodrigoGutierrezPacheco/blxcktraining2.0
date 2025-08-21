import { Button } from "../Button";

export default function AssignRoutineModal({ isOpen, onClose, userName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl max-w-md w-full shadow-2xl border border-gray-200">
        <div className="p-6 text-center">
          <h3 className="text-2xl font-bold text-black mb-4">
            Asignar Rutina
          </h3>
          <p className="text-gray-600 mb-6">
            Funcionalidad en desarrollo para {userName}
          </p>
          <Button
            onClick={onClose}
            className="bg-gray-500 text-white hover:bg-gray-600 px-6 py-3"
          >
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}
