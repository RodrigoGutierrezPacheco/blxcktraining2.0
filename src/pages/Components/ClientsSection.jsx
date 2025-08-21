import { Card, CardContent } from "./Card";
import { Button } from "./Button";
import { Users, Eye, BookOpen, Plus } from "lucide-react";

export default function ClientsSection({ 
  usersData, 
  formatUserDate, 
  handleViewUser, 
  handleViewRoutine, 
  handleAssignRoutine, 
  loadingRoutine 
}) {
  return (
    <Card className="border-2 border-black">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black flex items-center gap-2">
            <Users className="h-6 w-6" />
            Mis Clientes
          </h2>
          <div className="text-lg font-semibold text-gray-700">
            Total: {usersData.length} usuario
            {usersData.length !== 1 ? "s" : ""}
          </div>
        </div>

        {usersData.length > 0 ? (
          <div className="grid gap-4">
            {usersData.map((user) => (
              <div
                key={user.id}
                className="bg-gray-50 p-4 rounded-lg border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-black mb-2">
                      {user.fullName}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-700">
                      <div>
                        <span className="font-medium">Email:</span>{" "}
                        {user.email}
                      </div>
                      {user.age && (
                        <div>
                          <span className="font-medium">Edad:</span>{" "}
                          {user.age} años
                        </div>
                      )}
                      {user.weight && (
                        <div>
                          <span className="font-medium">Peso:</span>{" "}
                          {user.weight} kg
                        </div>
                      )}
                      {user.height && (
                        <div>
                          <span className="font-medium">Altura:</span>{" "}
                          {user.height} cm
                        </div>
                      )}
                      <div>
                        <span className="font-medium">Registrado:</span>{" "}
                        {formatUserDate(user.createdAt)}
                      </div>
                    </div>

                    {(user.chronicDiseases || user.healthIssues) && (
                      <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                        <h4 className="font-medium text-yellow-800 mb-2">
                          Información de Salud:
                        </h4>
                        {user.chronicDiseases && (
                          <p className="text-sm text-yellow-700">
                            <span className="font-medium">
                              Enfermedades crónicas:
                            </span>{" "}
                            {user.chronicDiseases}
                          </p>
                        )}
                        {user.healthIssues && (
                          <p className="text-sm text-yellow-700 mt-1">
                            <span className="font-medium">
                              Problemas de salud:
                            </span>{" "}
                            {user.healthIssues}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <Button
                      onClick={() => handleViewUser(user)}
                      className="bg-blue-600 text-white hover:bg-blue-700 text-sm px-3 py-2"
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      Ver Detalles
                    </Button>
                    {user.hasRoutine ? (
                      <Button
                        onClick={() => handleViewRoutine(user)}
                        disabled={loadingRoutine}
                        className="bg-purple-600 text-white hover:bg-purple-700 text-sm px-3 py-2"
                      >
                        <BookOpen className="mr-1 h-4 w-4" />
                        {loadingRoutine ? "Cargando..." : "Ver Rutina"}
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleAssignRoutine(user)}
                        className="bg-green-600 text-white hover:bg-green-700 text-sm px-3 py-2"
                      >
                        <Plus className="mr-1 h-4 w-4" />
                        Asignar Rutina
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-2">
              No tienes usuarios asignados aún
            </p>
            <p className="text-gray-500">
              Los usuarios que se registren con tu código aparecerán aquí
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
