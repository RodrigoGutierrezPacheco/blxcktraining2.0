import { Button } from "../../Components/Button";
import { Card, CardContent } from "../../Components/Card";
import { Badge } from "../../Components/Badge";
import {
  Dumbbell,
  ArrowRight,
  Play,
  Users,
  Clock,
  Flame,
  Heart,
  Target,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import PlanesComponent from "../../Home/Components/Planes";

export default function Gimnasio() {
  const navigate = useNavigate();

  const gymBenefits = [
    {
      icon: Dumbbell,
      title: "Acceso a Equipos Profesionales",
      description: "Máquinas y pesos para todos los niveles y objetivos.",
    },
    {
      icon: Users,
      title: "Asesoramiento Expertos",
      description: "Entrenadores certificados para guiarte.",
    },
    {
      icon: Flame,
      title: "Mayor Variedad de Ejercicios",
      description: "Posibilidad de trabajar todos los grupos musculares.",
    },
    {
      icon: Target,
      title: "Progresión Precisas",
      description: "Seguimiento exacto de cargas y repeticiones.",
    },
    {
      icon: Heart,
      title: "Ambiente Motivador",
      description: "Energía de otras personas entrenando.",
    },
    {
      icon: Clock,
      title: "Zonas Especializadas",
      description: "Áreas de cardio, peso libre y máquinas guiadas.",
    },
  ];

  const equipmentRoutines = [
    {
      icon: Dumbbell,
      title: "Zona de Pesas Libres",
      description:
        "Rutinas con barras, mancuernas y discos para ejercicios compuestos como press banca, sentadillas y peso muerto.",
      equipment: [
        "Barras olímpicas",
        "Mancuernas (2-50kg)",
        "Racks de sentadillas",
        "Bancos ajustables",
      ],
    },
    {
      icon: Dumbbell,
      title: "Máquinas de Poleas",
      description:
        "Ejercicios de aislamiento con poleas altas, bajas y medias para trabajo muscular específico.",
      equipment: [
        "Máquina de polea doble",
        "Crossover",
        "Polea baja para tríceps",
        "Máquina de remo",
      ],
    },
    {
      icon: Dumbbell,
      title: "Máquinas de Piernas",
      description:
        "Equipos especializados para desarrollo integral del tren inferior.",
      equipment: [
        "Prensa de piernas 45°",
        "Extensora de cuadriceps",
        "Máquina de femorales",
        "Máquina de glúteos",
      ],
    },
    {
      icon: Dumbbell,
      title: "Área Cardiovascular",
      description: "Equipos para mejorar resistencia y quema calórica.",
      equipment: [
        "Cintas de correr",
        "Elípticas",
        "Bicicletas estáticas",
        "Escaladoras",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black mb-6"
          >
            Entrenamiento en Gimnasio
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Maximiza tu Potencial{" "}
            <span className="block text-gray-300">
              con Equipos Profesionales
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Aprovecha al máximo las instalaciones y equipos del gimnasio con
            rutinas diseñadas para cada máquina y objetivo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() =>
                window.open(
                  "https://wa.me/5638686467?text=Hola,%20quiero%20una%20rutina%20personalizada%20para%20gimnasio",
                  "_blank"
                )
              }
              className="border border-white text-black hover:bg-white hover:text-black text-lg px-8 py-6"
            >
              <Play className="mr-2 h-5 w-5" />
              Comenzar Ahora
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                window.open(
                  "https://wa.me/5638686467?text=Hola,%20quiero%20asesoría%20sobre%20rutinas%20de%20gimnasio",
                  "_blank"
                )
              }
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 bg-transparent"
            >
              Hablar con un Entrenador
            </Button>
          </div>
        </div>
      </section>

      {/* Gym Advantages Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-black mb-4">
            Ventajas del Entrenamiento en Gimnasio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            El ambiente y equipamiento profesional aceleran tus resultados.
          </p>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <p className="text-lg text-gray-700 mb-6">
                En el gimnasio tienes acceso a equipos especializados que te
                permiten trabajar cada grupo muscular con la técnica y carga
                adecuada. Desde máquinas guiadas para principiantes hasta zonas
                de peso libre para atletas avanzados.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Nuestros programas aprovechan cada zona del gimnasio: área de
                cardio para resistencia, máquinas de resistencia para
                aislamiento muscular, racks para ejercicios compuestos y
                espacios funcionales para entrenamiento dinámico.
              </p>
              <Button
                variant="outline"
                className="bg-transparent text-black hover:bg-gray-100"
                onClick={() => navigate("/entrenamientos")}
              >
                Explorar Otros Entrenamientos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <img
                src="/gym-equipment.jpg"
                alt="Equipos de Gimnasio"
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              Beneficios Clave
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Por qué el gimnasio es la mejor opción para transformar tu físico
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {gymBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card
                  key={index}
                  className="border-2 hover:border-black transition-all duration-300 group"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Equipment Routines Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              Rutinas Adaptables a tu Gimnasio
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Personalizamos tu entrenamiento según los equipos disponibles
              donde entrenas
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {equipmentRoutines.map((routine, index) => {
              const IconComponent = routine.icon;
              return (
                <Card
                  key={index}
                  className="border-2 hover:border-black transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold">{routine.title}</h3>
                    </div>
                    <p className="text-gray-700 mb-4">{routine.description}</p>
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">
                        Ejemplos de equipos que podrías encontrar:
                      </h4>
                      <ul className="grid grid-cols-2 gap-2">
                        {routine.equipment.map((item, idx) => (
                          <li key={idx} className="flex items-center">
                            <span className="w-2 h-2 bg-black rounded-full mr-2"></span>
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm text-gray-500 mt-3">
                        * Adaptamos los ejercicios según lo que tenga tu
                        gimnasio
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Training Programs Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-black mb-4">
            Programas Especializados
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Selecciona el plan que mejor se adapte a tus objetivos
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-black transition-all duration-300">
              <CardContent className="p-6">
                <Dumbbell className="h-12 w-12 text-black mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">Fuerza Básica</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Enfoque en ejercicios compuestos con barras y mancuernas para
                  ganancia de fuerza.
                </p>
                <ul className="text-left text-sm space-y-2 mb-4">
                  <li>• Press banca, sentadillas, peso muerto</li>
                  <li>• 3-4 días por semana</li>
                  <li>• Progresión lineal</li>
                </ul>
                <Button
                  className="w-full mt-4"
                  onClick={() => navigate("/planes/fuerza")}
                >
                  Ver Detalles
                </Button>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-black transition-all duration-300">
              <CardContent className="p-6">
                <Dumbbell className="h-12 w-12 text-black mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">Hipertrofia</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Rutinas de volumen muscular usando máquinas y pesos libres.
                </p>
                <ul className="text-left text-sm space-y-2 mb-4">
                  <li>• Enfoque en aislamiento muscular</li>
                  <li>• 4-5 días por semana</li>
                  <li>• Series de 8-12 repeticiones</li>
                </ul>
                <Button
                  className="w-full mt-4"
                  onClick={() => navigate("/planes/hipertrofia")}
                >
                  Ver Detalles
                </Button>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-black transition-all duration-300">
              <CardContent className="p-6">
                <Dumbbell className="h-12 w-12 text-black mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">Definición</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Combinación de cardio y entrenamiento de fuerza para quemar
                  grasa.
                </p>
                <ul className="text-left text-sm space-y-2 mb-4">
                  <li>• Circuitos metabólicos</li>
                  <li>• Entrenamiento HIIT</li>
                  <li>• 5-6 días por semana</li>
                </ul>
                <Button
                  className="w-full mt-4"
                  onClick={() => navigate("/planes/definicion")}
                >
                  Ver Detalles
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
            <PlanesComponent type="gimnasio" />
      
    </div>
  );
}
