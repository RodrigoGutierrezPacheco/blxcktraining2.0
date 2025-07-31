import { Outlet } from 'react-router-dom';
import Navbar from '../pages/Components/Navbar';
import Footer from '../pages/Components/Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* Aquí se renderizará el contenido de cada ruta */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;