import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Components/Button";
import { getAllAdmins } from "../../services/admin";
import { 
  Shield, 
  ArrowLeft, 
  Search, 
  Eye, 
  Edit, 
  Trash2,
  User,
  Calendar,
  Mail,
  Phone,
  Crown,
  CheckCircle,
  XCircle
} from "lucide-react";

export default function AllAdmins() {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAdmins();
  }, []);

  useEffect(() => {
    // Filtrar administradores basado en el término de búsqueda
    if (searchTerm.trim() === "") {
      setFilteredAdmins(admins);
    } else {
      const filtered = admins.filter(admin =>
        admin.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.id?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAdmins(filtered);
    }
  }, [searchTerm, admins]);

  const fetchAdmins = async () => {
    try {
      setIsLoading(true);
      setError("");
      const data = await getAllAdmins();
      setAdmins(data);
      setFilteredAdmins(data);
    } catch (err) {
      setError(err.message || "Error al cargar los administradores");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Sin fecha";
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleViewAdmin = (adminId) => {
    // TODO: Implementar vista detallada del administrador
    console.log("Ver administrador:", adminId);
  };

  const handleEditAdmin = (adminId) => {
    // TODO: Implementar edición del administrador
    console.log("Editar administrador:", adminId);
  };

  const handleDeleteAdmin = (adminId) => {
    // TODO: Implementar eliminación del administrador
    console.log("Eliminar administrador:", adminId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <Button
                onClick={() => navigate("/admin/dashboard")}
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 p-2 rounded-lg"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Todos los Administradores</h1>
                  <p className="text-gray-600">Gestiona todos los administradores de la plataforma</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total de administradores</p>
              <p className="text-2xl font-bold text-red-600">{admins.length}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-10">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar administradores por nombre, email o ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
            <Button
              onClick={fetchAdmins}
              className="bg-red-600 text-white hover:bg-red-700 px-6 py-2"
            >
              Actualizar
            </Button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600 text-center">{error}</p>
          </div>
        )}

        {/* Admins Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Administrador
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Información de Contacto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nivel de Acceso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha de Registro
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAdmins.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      {searchTerm ? "No se encontraron administradores que coincidan con la búsqueda" : "No hay administradores registrados"}
                    </td>
                  </tr>
                ) : (
                  filteredAdmins.map((admin) => (
                    <tr key={admin.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                              <Shield className="h-5 w-5 text-red-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {admin.fullName || "Sin nombre"}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {admin.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center gap-2 mb-1">
                            <Mail className="h-4 w-4 text-gray-400" />
                            {admin.email || "Sin email"}
                          </div>
                          {admin.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              {admin.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`h-2 w-2 rounded-full mr-2 ${
                            admin.isActive ? 'bg-green-400' : 'bg-red-400'
                          }`}></div>
                          <span className={`text-sm ${
                            admin.isActive ? 'text-green-800' : 'text-red-800'
                          }`}>
                            {admin.isActive ? 'Activo' : 'Inactivo'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Crown className="h-4 w-4 text-yellow-500 mr-2" />
                          <span className="text-sm text-yellow-700 font-medium">
                            {admin.role === 'admin' ? 'Administrador' : admin.role}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-900">
                            {formatDate(admin.createdAt)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => handleViewAdmin(admin.id)}
                            className="bg-blue-100 text-blue-700 hover:bg-blue-200 p-2 rounded-lg"
                            title="Ver administrador"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleEditAdmin(admin.id)}
                            className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 p-2 rounded-lg"
                            title="Editar administrador"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteAdmin(admin.id)}
                            className="bg-red-100 text-red-700 hover:bg-red-200 p-2 rounded-lg"
                            title="Eliminar administrador"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
