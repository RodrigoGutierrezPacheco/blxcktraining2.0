import { useState, useEffect } from "react";
import { imagesService } from "../../../services/images";

export default function UploadImageModal({ isOpen, onClose }) {
  const humanizeFromFilename = (raw) => {
    if (!raw) return "";
    const withoutExt = raw.replace(/\.[a-z0-9]+$/i, "");
    return withoutExt.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  };
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [missing, setMissing] = useState([]);
  const [activeFolder, setActiveFolder] = useState(null);
  const [selectedMissing, setSelectedMissing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setDescription("");
      setMissing([]);
      setActiveFolder(null);
      setError(null);
      setSuccess("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const fetchMissing = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await imagesService.getMissing("Ejercicios");
        setMissing(data || []);
      } catch (e) {
        setError(e.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };
    fetchMissing();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!selectedMissing) return;
    try {
      setSaving(true);
      setError(null);
      await imagesService.upsert({
        folder: selectedMissing.folder,
        filePath: selectedMissing.filePath || selectedMissing.path,
        url: selectedMissing.url,
        name,
        description,
      });
      setSuccess("Imagen guardada correctamente");
      // Remover el ejercicio guardado de la lista de faltantes
      setMissing((prev) => {
        const updated = (prev || []).map((group) => {
          if (group.folder !== selectedMissing.folder) return group;
          const remainingFiles = (group.files || []).filter(
            (f) => f.path !== (selectedMissing.filePath || selectedMissing.path)
          );
          return { ...group, files: remainingFiles };
        });
        // Eliminar grupos vacíos
        const cleaned = updated.filter((g) => (g.files?.length || 0) > 0);
        // Si la carpeta activa quedó vacía, resetear selección de carpeta
        const stillExists = cleaned.find((g) => g.folder === activeFolder);
        if (!stillExists) {
          setActiveFolder(null);
        }
        return cleaned;
      });
      // Limpiar formulario tras éxito
      setName("");
      setDescription("");
      setSelectedMissing(null);
    } catch (e) {
      setError(e.message || "Error al guardar");
    } finally {
      setSaving(false);
    }
  };


  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>
      <div className="absolute inset-0 bg-white overflow-auto">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Agregar imagen</h3>
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cerrar
            </button>
          </div>

          {error && (
            <div className="p-4 mb-6 rounded-md bg-red-50 text-red-700 text-sm">{error}</div>
          )}
          {success && (
            <div className="p-4 mb-6 rounded-md bg-green-50 text-green-700 text-sm">{success}</div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-gray-50 border rounded-xl p-6">
              {!selectedMissing ? (
                <div className="text-sm text-gray-500">Selecciona una imagen faltante para editar su información.</div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-28 h-28 bg-gray-100 flex items-center justify-center overflow-hidden rounded">
                      <img src={selectedMissing.url} alt={selectedMissing.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Carpeta</label>
                        <input disabled value={selectedMissing.folder} className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-600" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ruta</label>
                        <input disabled value={selectedMissing.filePath} className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-600" />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                      <input
                        value={name}
                        onChange={(e) => {
                          const v = e.target.value;
                          setName(v);
                          setDescription(v);
                        }}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                      <input value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
                    </div>
                    <div className="md:col-span-2 flex items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={onClose}
                          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                        >
                          Cancelar
                        </button>
                        <button
                          type="button"
                          onClick={handleSave}
                          disabled={saving}
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                        >
                          {saving ? "Guardando..." : "Guardar"}
                        </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white border rounded-xl p-0 overflow-hidden">
              <div className="px-4 py-3 border-b bg-gray-50 font-medium">Faltantes en almacenamiento</div>
              {loading ? (
                <div className="p-4 text-sm text-gray-600">Cargando...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  <div className="border-r max-h-[60vh] overflow-auto">
                    {missing.map((group) => (
                      <button
                        key={group.folder}
                        className={`w-full text-left px-4 py-2 border-b hover:bg-gray-50 ${activeFolder === group.folder ? "bg-gray-100" : ""}`}
                        onClick={() => setActiveFolder(group.folder)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{group.folder}</span>
                          <span className="text-xs text-gray-500">{group.files?.length || 0}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="max-h-[60vh] overflow-auto p-3">
                    {!activeFolder ? (
                      <div className="text-sm text-gray-500">Selecciona una carpeta para ver imágenes</div>
                    ) : (
                      (missing.find((g) => g.folder === activeFolder)?.files || []).map((f) => (
                        <button
                          type="button"
                          key={f.path}
                          className={`w-full flex items-center gap-3 p-2 border-b text-left ${selectedMissing?.path === f.path ? "bg-gray-50" : ""}`}
                          onClick={() => {
                            setSelectedMissing({ ...f, folder: activeFolder, filePath: f.path });
                            const base = f.name || f.path || "";
                            setName(humanizeFromFilename(base));
                            setDescription(humanizeFromFilename(base));
                          }}
                        >
                          <div className="w-16 h-16 bg-gray-100 flex items-center justify-center overflow-hidden rounded">
                            <img src={f.url} alt={f.name} className="w-full h-full object-cover" loading="lazy" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate" title={f.name}>{f.name}</div>
                            <div className="text-xs text-gray-500 truncate" title={f.path}>{f.path}</div>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Eliminado panel duplicado; ahora la edición está a la izquierda */}
        </div>
      </div>
    </div>
  );
}


