import { CheckCircle, Zap, BarChart2, Users, Award } from "lucide-react";

export default function PlanesEntrenadores() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
            Potencia tu Carrera como Entrenador
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Conecta con más clientes, gestiona tus rutinas eficientemente y haz
          crecer tu negocio con nuestra plataforma.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {/* Plan Básico */}
        <div className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <Zap className="h-6 w-6 text-yellow-500 mr-2" />
            <h3 className="text-xl font-bold text-gray-800">Plan Básico</h3>
          </div>
          <p className="text-gray-600 mb-6">
            Ideal para empezar a digitalizar tu servicio
          </p>

          <div className="mb-6">
            <span className="text-4xl font-bold text-gray-900">$50</span>
            <span className="text-gray-600">/mes por cliente</span>
          </div>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
              <span>Hasta 10 clientes activos</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
              <span>Creación de rutinas personalizadas</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
              <span>Seguimiento básico de progreso</span>
            </li>
          </ul>

          <button className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Empezar ahora
          </button>
        </div>

        {/* Plan Profesional - Destacado */}
        <div className="border-2 border-black rounded-xl p-6 shadow-lg relative bg-gray-50">
          <div className="absolute top-0 right-0 bg-black text-white px-3 py-1 text-sm font-medium rounded-bl-lg rounded-tr-lg">
            RECOMENDADO
          </div>
          <div className="flex items-center mb-4">
            <BarChart2 className="h-6 w-6 text-blue-500 mr-2" />
            <h3 className="text-xl font-bold text-gray-800">
              Plan Profesional
            </h3>
          </div>
          <p className="text-gray-600 mb-6">
            Para entrenadores que quieren escalar su negocio
          </p>

          <div className="mb-6">
            <span className="text-4xl font-bold text-gray-900">$45</span>
            <span className="text-gray-600">
              /mes por cliente (11-50 clientes)
            </span>
          </div>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
              <span>Hasta 50 clientes activos</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
              <span>Todas las funciones del Plan Básico</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
              <span>Análisis avanzado de progreso</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
              <span>Plantillas de rutinas reutilizables</span>
            </li>
          </ul>

          <button className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Potenciar mi negocio
          </button>
        </div>

        {/* Plan Elite */}
        <div className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <Award className="h-6 w-6 text-purple-500 mr-2" />
            <h3 className="text-xl font-bold text-gray-800">Plan Elite</h3>
          </div>
          <p className="text-gray-600 mb-6">
            Para estudios y entrenadores establecidos
          </p>

          <div className="mb-6">
            <span className="text-4xl font-bold text-gray-900">$40</span>
            <span className="text-gray-600">
              /mes por cliente (50+ clientes)
            </span>
          </div>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
              <span>Clientes ilimitados</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
              <span>Todas las funciones del Plan Profesional</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
              <span>Dashboard avanzado</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
              <span>Soporte prioritario</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
              <span>Branding personalizado</span>
            </li>
          </ul>

          <button className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Contactar ventas
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <div className="max-w-3xl mx-auto">
          <Users className="h-12 w-12 mx-auto text-gray-700 mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Por qué elegir nuestra plataforma?
          </h3>
          <p className="text-gray-600 mb-6">
            Por cada{" "}
            <span className="font-bold">$50 pesos mensuales por cliente</span>,
            obtienes acceso a herramientas profesionales que te permiten
            enfocarte en lo que mejor sabes hacer: entrenar. Nosotros nos
            encargamos de la tecnología, el seguimiento y la experiencia del
            usuario para que tú puedas escalar tu negocio sin límites.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 inline-block">
            <p className="text-yellow-800 font-medium">
              💡 <span className="font-bold">Ejemplo:</span> Con 20 clientes
              pagarías $1,000/mes y podrías generar ingresos de $8,000-$20,000
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
