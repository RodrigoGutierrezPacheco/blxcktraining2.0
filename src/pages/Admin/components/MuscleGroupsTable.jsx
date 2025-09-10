import { Edit, Trash2 } from "lucide-react";
import { Button } from "../../Components/Button";

export default function MuscleGroupsTable({
  muscleGroups,
  loading,
  onCreate,
  onEdit,
  onDelete,
  onToggleStatus,
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Grupos Musculares</h2>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              {muscleGroups.filter((mg) => mg.isActive).length} Activos
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              {muscleGroups.filter((mg) => !mg.isActive).length} Inactivos
            </span>
          </div>
        </div>
        <Button onClick={onCreate} className="bg-red-600 text-white hover:bg-red-700">
          Nuevo Grupo Muscular
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {muscleGroups.map((muscleGroup) => (
                <tr key={muscleGroup.id} className={`hover:bg-gray-50 ${!muscleGroup.isActive ? "bg-gray-50 opacity-75" : ""}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{muscleGroup.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{muscleGroup.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => onToggleStatus(muscleGroup.id, muscleGroup.isActive)}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                        muscleGroup.isActive
                          ? "bg-green-500 text-white hover:bg-green-600 shadow-sm"
                          : "bg-red-500 text-white hover:bg-red-600 shadow-sm"
                      }`}
                    >
                      {muscleGroup.isActive ? "✓ Activo" : "✗ Inactivo"}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button onClick={() => onEdit(muscleGroup)} className="text-indigo-600 hover:text-indigo-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button onClick={() => onDelete(muscleGroup.id)} className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


