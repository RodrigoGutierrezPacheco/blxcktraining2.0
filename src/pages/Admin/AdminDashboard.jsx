import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Components/Button";
import { useAuth } from "../../context/useAuth";
import { 
  Users, 
  Dumbbell, 
  TrendingUp, 
  Settings, 
  LogOut,
  Shield,
  BarChart3,
  Calendar
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    // Verificar si el usuario es admin
    if (!user || user.role !== "admin") {
      navigate("/admin/login");
      return;
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Panel Administrativo</h1>
                <p className="text-red-100">Bienvenido, {user.fullName}</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              className="bg-white/20 text-white hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-200"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Usuarios</p>
                <p className="text-3xl font-bold text-gray-900">1,234</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Entrenadores</p>
                <p className="text-3xl font-bold text-gray-900">56</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Dumbbell className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rutinas Activas</p>
                <p className="text-3xl font-bold text-gray-900">892</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sesiones Hoy</p>
                <p className="text-3xl font-bold text-gray-900">45</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="h-6 w-6 text-blue-600" />
              Gestión de Usuarios
            </h2>
            <div className="space-y-3">
              <Button 
                onClick={() => navigate("/admin/users")}
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
              >
                Ver Todos los Usuarios
              </Button>
              <Button 
                onClick={() => navigate("/admin/trainers")}
                className="w-full bg-green-600 text-white hover:bg-green-700"
              >
                Gestionar Entrenadores
              </Button>
              <Button 
                onClick={() => navigate("/admin/admins")}
                className="w-full bg-red-600 text-white hover:bg-red-700"
              >
                Gestionar Administradores
              </Button>
              <Button 
                onClick={() => navigate("/admin/routines")}
                className="w-full bg-purple-600 text-white hover:bg-purple-700"
              >
                Ver Todas las Rutinas
              </Button>
              <Button 
                onClick={() => navigate("/admin/plans")}
                className="w-full bg-orange-600 text-white hover:bg-orange-700"
              >
                Gestionar Planes
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Settings className="h-6 w-6 text-gray-600" />
              Configuración del Sistema
            </h2>
            <div className="space-y-3">
              <Button className="w-full bg-gray-600 text-white hover:bg-gray-700">
                Configuración General
              </Button>
              <Button className="w-full bg-red-600 text-white hover:bg-red-700">
                Gestión de Permisos
              </Button>
              <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700">
                Logs del Sistema
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-green-600" />
            Actividad Reciente
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Users className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Nuevo usuario registrado</p>
                  <p className="text-sm text-gray-600">Laura se unió a la plataforma</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">Hace 2 horas</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Dumbbell className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Rutina asignada</p>
                  <p className="text-sm text-gray-600">Entrenador Carlos asignó rutina a usuario</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">Hace 4 horas</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Nuevo entrenador verificado</p>
                  <p className="text-sm text-gray-600">Entrenador Ana completó verificación</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">Hace 6 horas</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
