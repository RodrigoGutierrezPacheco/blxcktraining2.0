import { useState } from "react";
import { Button } from "../Button";
import { deleteRoutine } from "../../../services/routines";
import {
  X,
  AlertTriangle,
  Trash2,
  Users,
  Dumbbell,
  Loader2,
} from "lucide-react";

export default function DeleteRoutineModal({
  isOpen,
  onClose,
  routine,
  onRoutineDeleted,
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDeleteRoutine = async () => {
    if (!routine?.id) {
      setError("No se ha seleccionado una rutina válida");
      return;
    }

    try {
      setIsDeleting(true);
      setError("");
      
      await deleteRoutine(routine.id);
      
      // Notificar que se eliminó la rutina
      if (onRoutineDeleted) {
        onRoutineDeleted();
      }
      
      // Cerrar el modal
      onClose();
    } catch (err) {
      setError(err.message || "Error al eliminar la rutina");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-md w-full mx-4 shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-full">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold">
                  Eliminar Rutina
                </h2>
                <p className="text-red-100 text-xs">
                  Esta acción no se puede deshacer
                </p>
              </div>
            </div>
            <Button
              onClick={onClose}
              className="bg-white/20 text-white hover:bg-white/30 p-1.5 rounded-lg"
              disabled={isDeleting}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-red-600 text-center text-sm">{error}</p>
            </div>
          )}

          {/* Routine Info */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-3 rounded-lg mb-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-500 p-2 rounded-full">
                <Dumbbell className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1 text-sm">
                  {routine?.name || "Rutina"}
                </h3>
                <p className="text-gray-600 mb-2 text-xs leading-relaxed">
                  {routine?.description || "Sin descripción"}
                </p>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full">
                    <Users className="h-3 w-3 text-blue-600" />
                    <span className="font-medium text-gray-700">
                      {routine?.assignedUsers || 0} usuarios
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full">
                    <span className="font-medium text-gray-700">
                      {routine?.totalWeeks || 0} semanas
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Warning Messages */}
          <div className="space-y-3 mb-4">
            <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <div className="bg-red-500 p-1.5 rounded-full flex-shrink-0">
                  <AlertTriangle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-red-800 mb-1 text-sm">
                    ⚠️ Advertencia Importante
                  </h4>
                  <p className="text-red-700 text-xs leading-relaxed">
                    Al eliminar esta rutina, <strong className="text-red-800">todos los usuarios que la tengan asignada perderán su rutina de entrenamiento</strong> y deberán ser asignados a una nueva rutina.
                  </p>
                </div>
              </div>
            </div>

            {routine?.assignedUsers > 0 && (
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <div className="bg-orange-500 p-1.5 rounded-full flex-shrink-0">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-orange-800 mb-1 text-sm">
                      Usuarios Afectados
                    </h4>
                    <p className="text-orange-700 text-xs leading-relaxed">
                      Esta rutina está asignada a <strong className="text-orange-800">{routine.assignedUsers} usuario{routine.assignedUsers !== 1 ? 's' : ''}</strong>. 
                      Deberás asignarles una nueva rutina después de la eliminación.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <div className="bg-gray-500 p-1.5 rounded-full flex-shrink-0">
                  <Trash2 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1 text-sm">
                    Acción Permanente
                  </h4>
                  <p className="text-gray-700 text-xs leading-relaxed">
                    Una vez eliminada, no podrás recuperar esta rutina ni su contenido. 
                    Todos los ejercicios, semanas y configuraciones se perderán permanentemente.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Confirmation Question */}
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-300 rounded-lg p-3 mb-4">
            <div className="text-center">
              <div className="bg-yellow-500 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white text-sm font-bold">!</span>
              </div>
              <p className="text-yellow-800 font-bold text-sm">
                ¿Estás seguro de que deseas eliminar esta rutina?
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-3 rounded-b-xl">
          <div className="flex justify-end gap-2">
            <Button
              onClick={onClose}
              className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm"
              disabled={isDeleting}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleDeleteRoutine}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 text-sm"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Eliminando...
                </>
              ) : (
                <>
                  <Trash2 className="h-3 w-3" />
                  Eliminar Rutina
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
