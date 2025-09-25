import { Card, CardContent } from "./Card";
import { Button } from "./Button";
import { Dumbbell, BookOpen, Plus } from "lucide-react";

export default function TrainerRoutinesSection({ 
  routinesData, 
  isLoadingRoutines, 
  handleViewRoutines,
  handleCreateRoutine 
}) {
  return (
    <Card className="border ml-auto mr-auto border-gray-200 w-[345px] sm:w-[360px] md:w-full h-fit">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-gray-600" />
            Mis Rutinas
          </h2>
          <div className="text-sm font-medium text-gray-600">
            {routinesData?.length || 0} rutina{(routinesData?.length || 0) !== 1 ? "s" : ""}
          </div>
        </div>

        {isLoadingRoutines ? (
          <div className="text-center py-6">
            <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-gray-300 border-r-gray-600"></div>
            <p className="text-xs text-gray-500 mt-2">Cargando...</p>
          </div>
        ) : routinesData && routinesData.length > 0 ? (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Tienes rutinas creadas
              </h3>
              <p className="text-xs text-gray-600 mb-4">
                Gestiona todas tus rutinas desde aquí
              </p>
              <Button
                onClick={handleViewRoutines}
                className="bg-gray-600 text-white hover:bg-gray-700"
              >
                <BookOpen className="mr-2 h-3.5 w-3.5" />
                Ver Rutinas
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 bg-gray-50 rounded border border-gray-200">
            <Dumbbell className="h-8 w-8 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-600 mb-1">
              No tienes rutinas creadas
            </p>
            <p className="text-xs text-gray-500 mb-4">
              Crea rutinas personalizadas para tus clientes
            </p>
            <Button
              onClick={handleCreateRoutine}
              className="bg-gray-900 text-white hover:bg-gray-800"
            >
              <Plus className="mr-2 h-3.5 w-3.5" />
              Crear Rutina
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
