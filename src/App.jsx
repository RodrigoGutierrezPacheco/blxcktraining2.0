import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./pages/Home/Home";
import Entrenamientos from "./pages/Entrenamientos/Entrenamientos";
import About from "./pages/About/About";
import Planes from "./pages/Planes/Planes";
import Entrenadores from "./pages/Entrenadores/Entrenadores";
import Login from "./pages/Login/Login";
import Perfil from "./pages/Perfil/Perfil";
import Rutina from "./pages/MiRutina/Rutina";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>

      <Routes>
        <Route element={<Layout />}>
          <Route path="/entrenamientos" element={<Entrenamientos />} />
        </Route>
      </Routes>

      <Routes>
        <Route element={<Layout />}>
          <Route path="/sobre-nosotros" element={<About />} />
        </Route>
      </Routes>

      <Routes>
        <Route element={<Layout />}>
          <Route path="/planes" element={<Planes />} />
        </Route>
      </Routes>

      <Routes>
        <Route element={<Layout />}>
          <Route path="/entrenadores" element={<Entrenadores />} />
        </Route>
      </Routes>

      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>

      <Routes>
        <Route element={<Layout />}>
          <Route path="/perfil" element={<Perfil />} />
        </Route>
      </Routes>

      <Routes>
        <Route element={<Layout />}>
          <Route path="/mi-rutina" element={<Rutina />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
