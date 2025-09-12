import { Button } from "../Button";
import { Folder, Dumbbell } from "lucide-react";

export default function ExerciseFolderContent({ 
  folders, 
  onFolderClick 
}) {
  return (
    <div>
      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Folder className="h-5 w-5 text-purple-600" />
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
              className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg group-hover:bg-purple-200 transition-colors duration-200">
                    <Folder className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-800 text-lg">
                      {folder.title}
                    </h5>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Dumbbell className="h-4 w-4 text-gray-500" />
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-sm font-medium">
                    {folder.exerciseCount}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <Button
                  className="bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 px-3 py-1 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
                >
                  Seleccionar
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
