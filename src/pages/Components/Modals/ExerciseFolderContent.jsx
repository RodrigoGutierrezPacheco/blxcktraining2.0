import { Button } from "../Button";
import { Folder, Dumbbell } from "lucide-react";

export default function ExerciseFolderContent({ 
  folders, 
  onFolderClick 
}) {
  return (
    <div>
      <h4 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Folder className="h-4 w-4 text-gray-600" />
        Carpetas de Ejercicios
      </h4>
      
      {folders.length === 0 ? (
        <div className="text-center py-8">
          <Folder className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No hay carpetas disponibles</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {folders.map((folder) => (
            <div
              key={folder.id}
              onClick={() => onFolderClick(folder)}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-gray-200 transition-colors duration-200">
                    <Folder className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 text-base">
                      {folder.title}
                    </h5>
                    {folder.description && (
                      <p className="text-gray-600 text-sm mt-1">
                        {folder.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Dumbbell className="h-3 w-3 text-gray-500" />
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                    {folder.exerciseCount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
