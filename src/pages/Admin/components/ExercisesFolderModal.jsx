export default function ExercisesFolderModal({ isOpen, onClose, folderName, items, onAdd }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>
      <div className="absolute inset-0 overflow-auto">
        <div className="max-w-3xl mx-auto my-8 bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">{folderName}</h3>
            <div className="flex items-center gap-3">
              {onAdd && (
                <button onClick={onAdd} className="px-3 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700">Agregar ejercicio</button>
              )}
              <button onClick={onClose} className="px-3 py-1.5 rounded-md text-gray-700 hover:bg-gray-100">Cerrar</button>
            </div>
          </div>
          <div className="divide-y">
            {items.map((ex) => (
              <div key={ex.id} className="py-3">
                <div className="text-sm font-medium text-gray-900">{ex.name}</div>
                {ex.description && (
                  <div className="text-xs text-gray-600 mt-0.5">{ex.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


