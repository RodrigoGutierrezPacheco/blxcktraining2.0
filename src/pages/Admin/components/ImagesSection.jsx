import { useEffect, useState } from "react";
import { Button } from "../../Components/Button";
import { imagesService } from "../../../services/images";
import UploadImageModal from "./UploadImageModal";

export default function ImagesSection({ onUpload }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [folders, setFolders] = useState({});
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await imagesService.getByFolder();

        const grouped = data.reduce((acc, item) => {
          const key = item.folder || "Sin carpeta";
          if (!acc[key]) acc[key] = [];
          acc[key].push(item);
          return acc;
        }, {});

        setFolders(grouped);
      } catch (e) {
        setError(e.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Imágenes</h2>
        <div className="flex items-center gap-3">
          <Button onClick={() => setShowUploadModal(true)} className="bg-red-600 text-white hover:bg-red-700">
            Agregar imagen
          </Button>
          {onUpload && (
            <Button onClick={onUpload} className="bg-gray-100 text-gray-800 hover:bg-gray-200">
              Subir Imagen (legacy)
            </Button>
          )}
        </div>
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      )}

      {error && (
        <div className="p-4 mb-6 rounded-md bg-red-50 text-red-700 text-sm">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-6">
          {selectedFolder === null ? (
            <>
              {Object.keys(folders).length === 0 ? (
                <div className="text-gray-600">No hay imágenes disponibles.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {Object.entries(folders).map(([folderName, items]) => (
                    <button
                      key={folderName}
                      onClick={() => setSelectedFolder(folderName)}
                      className="group border rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-shadow text-left"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold text-gray-900 group-hover:text-red-700">
                          {folderName}
                        </h3>
                        <span className="inline-flex items-center justify-center text-xs font-medium px-2 py-1 rounded-full bg-red-50 text-red-700">
                          {items.length} ejercicios
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-gray-500">Click para ver ejercicios</p>
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedFolder}</h3>
                  <span className="text-sm text-gray-500">{folders[selectedFolder]?.length || 0} ejercicios</span>
                </div>
                <Button
                  onClick={() => setSelectedFolder(null)}
                  className="bg-gray-100 text-gray-800 hover:bg-gray-200"
                >
                  Volver a carpetas
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {(folders[selectedFolder] || []).map((img) => (
                  <div key={img.id} className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                      <img
                        src={img.url}
                        alt={img.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3">
                      <div className="text-sm font-medium text-gray-900 truncate" title={img.name}>
                        {img.name}
                      </div>
                      {img.description && (
                        <div className="text-xs text-gray-500 mt-1 line-clamp-2" title={img.description}>
                          {img.description}
                        </div>
                      )}
                      <a
                        href={img.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block mt-3 text-xs text-red-600 hover:text-red-700"
                      >
                        Abrir
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {showUploadModal && (
        <UploadImageModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
        />
      )}
    </div>
  );
}


