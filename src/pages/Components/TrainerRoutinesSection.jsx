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
    <Card className="border-2 border-black">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black flex items-center gap-2">
            <Dumbbell className="h-6 w-6" />
            Mis Rutinas
          </h2>
          <div className="text-lg font-semibold text-gray-700">
            Total: {routinesData?.length || 0} rutina
            {(routinesData?.length || 0) !== 1 ? "s" : ""}
          </div>
        </div>

        {isLoadingRoutines ? (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg">
              Cargando rutinas...
            </p>
          </div>
        ) : routinesData && routinesData.length > 0 ? (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Tienes rutinas creadas
              </h3>
              <p className="text-blue-700 mb-4">
                Haz clic en el botón para ver todas tus rutinas y gestionarlas.
              </p>
              <Button
                onClick={handleViewRoutines}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Ver Rutinas
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Dumbbell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-2">
              No tienes rutinas creadas aún
            </p>
            <p className="text-gray-500 mb-4">
              Crea rutinas personalizadas para tus clientes
            </p>
            <Button
              onClick={handleCreateRoutine}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Crear Rutina
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
