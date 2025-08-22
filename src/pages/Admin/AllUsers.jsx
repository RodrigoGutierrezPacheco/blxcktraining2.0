import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Components/Button";
import { getAllNormalUsers, getUserById, toggleUserStatus } from "../../services/admin";
import { 
  Users, 
  ArrowLeft, 
  Search, 
  Plus
} from "lucide-react";
import UsersTable from "./components/UsersTable";
import ViewUserModal from "./components/ViewUserModal";
import CreateUserModal from "./components/CreateUserModal";
import EditUserModal from "./components/EditUserModal";

export default function AllUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showViewUserModal, setShowViewUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [selectedUserForView, setSelectedUserForView] = useState(null);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError("");
      const data = await getAllNormalUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      setError(err.message || "Error al cargar los usuarios");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewUser = async (userId) => {
    try {
      setError("");
      const userData = await getUserById(userId);
      setSelectedUserForView(userData);
      setShowViewUserModal(true);
    } catch (err) {
      setError(err.message || "Error al cargar los datos del usuario");
    }
  };

  const handleEditUser = async (userId) => {
    try {
      setError("");
      const userData = await getUserById(userId);
      setSelectedUserForEdit(userData);
      setShowEditUserModal(true);
    } catch (err) {
      setError(err.message || "Error al cargar los datos del usuario");
    }
  };

  const handleCreateUser = () => {
    setShowCreateUserModal(true);
    setError("");
  };

  const handleToggleUserStatus = async (userId) => {
    try {
      setError("");
      await toggleUserStatus(userId);
      fetchUsers();
    } catch (err) {
      setError(err.message || "Error al cambiar el estado del usuario");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
                <div className="bg-blue-100 p-2 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Todos los Usuarios</h1>
                  <p className="text-gray-600">Gestiona todos los usuarios de la plataforma</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Total de usuarios</p>
                <p className="text-2xl font-bold text-blue-600">{users.length}</p>
              </div>
              <Button
                onClick={handleCreateUser}
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Crear Usuario
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar usuarios por nombre, email o ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <Button
              onClick={fetchUsers}
              className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2"
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

        {/* Users Table */}
        <UsersTable
          users={filteredUsers}
          searchTerm={searchTerm}
          onViewUser={handleViewUser}
          onEditUser={handleEditUser}
          onToggleStatus={handleToggleUserStatus}
        />
      </main>

      {/* Modals */}
      <ViewUserModal
        isOpen={showViewUserModal}
        user={selectedUserForView}
        onClose={() => setShowViewUserModal(false)}
        onToggleStatus={handleToggleUserStatus}
      />

      <CreateUserModal
        isOpen={showCreateUserModal}
        onClose={() => setShowCreateUserModal(false)}
        onCreateSuccess={() => {
          setShowCreateUserModal(false);
          fetchUsers();
        }}
        existingUsers={users}
      />

      <EditUserModal
        isOpen={showEditUserModal}
        user={selectedUserForEdit}
        onClose={() => {
          setShowEditUserModal(false);
          setSelectedUserForEdit(null);
        }}
        onEditSuccess={() => {
          setShowEditUserModal(false);
          setSelectedUserForEdit(null);
          fetchUsers();
        }}
      />
    </div>
  );
}
