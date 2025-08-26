import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./pages/Home/Home";
import Entrenamientos from "./pages/Entrenamientos/Entrenamientos";
import About from "./pages/About/About";
import Planes from "./pages/Planes/Planes";
import Entrenadores from "./pages/Entrenadores/Entrenadores";
import Login from "./pages/Login/Login";
import Perfil from "./pages/Perfil/Perfil";
import Rutina from "./pages/MiRutina/Rutina";
import Funcional from "./pages/Ejemplos/Funcional/Funcional";
import Casa from "./pages/Ejemplos/Casa/Casa";
import Gimnasio from "./pages/Ejemplos/Gimnacio/Gimnasio";
import Cardio from "./pages/Ejemplos/Cardio/Cardio";
import Registro from "./pages/Registro/Registro";
import RegistroEntrenadores from "./pages/Registro/RegistroEntrenadores";
import PlanesEntrenadores from "./pages/PlanesEntrenadores/PlanesEntrenadores";
import PerfilEntrenador from "./pages/Perfil/PerfilEntrenador";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AllUsers from "./pages/Admin/AllUsers";
import AllTrainers from "./pages/Admin/AllTrainers";
import AllAdmins from "./pages/Admin/AllAdmins";
import AllRoutines from "./pages/Admin/AllRoutines";
import AllPlans from "./pages/Admin/AllPlans";
import AllExercises from "./pages/Admin/AllExercises";
import AdminRoute from "./components/AdminRoute";

// Componente para rutas protegidas
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("tokenBlck");

  if (!token) {
    // Si no hay token, redirigir a login
    return <Navigate to="/login" replace />;
  }

  return children;
 };

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/entrenamientos" element={<Entrenamientos />} />
          <Route path="/sobre-nosotros" element={<About />} />
          <Route path="/planes" element={<Planes />} />
          <Route path="/entrenadores" element={<Entrenadores />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route
            path="/registro/entrenadores"
            element={<RegistroEntrenadores />}
          />
          <Route path="/entrenamiento-funcional" element={<Funcional />} />
          <Route path="/entrenamiento-casa" element={<Casa />} />
          <Route path="/entrenamiento-gimnasio" element={<Gimnasio />} />
          <Route path="/entrenamiento-cardiovascular" element={<Cardio />} />
        </Route>

        {/* Rutas protegidas */}
        <Route element={<Layout />}>
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mi-rutina"
            element={
              <ProtectedRoute>
                <Rutina />
              </ProtectedRoute>
            }
          />
          <Route
            path="/planes/entrenadores"
            element={
              <ProtectedRoute>
                <PlanesEntrenadores />
              </ProtectedRoute>
            }
          />
          <Route
            path="/entrenadores/perfil"
            element={
              <ProtectedRoute>
                <PerfilEntrenador />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Rutas de Administrador */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AllUsers />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/trainers"
          element={
            <AdminRoute>
              <AllTrainers />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/admins"
          element={
            <AdminRoute>
              <AllAdmins />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/routines"
          element={
            <AdminRoute>
              <AllRoutines />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/plans"
          element={
            <AdminRoute>
              <AllPlans />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/exercises"
          element={
            <AdminRoute>
              <AllExercises />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
