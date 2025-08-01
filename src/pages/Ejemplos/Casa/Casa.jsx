import { Button } from "../../Components/Button";
import { Card, CardContent } from "../../Components/Card";
import { Badge } from "../../Components/Badge";
import {
  Home,
  Dumbbell,
  Clock,
  Flame,
  Heart,
  Users,
  ArrowRight,
  Play,
  Scale,
  Target,
  Activity,
  Move,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import PlanesComponent from "../../Home/Components/Planes";

export default function Casa() {
  const navigate = useNavigate();

  const homeBenefits = [
    {
      icon: Home,
      title: "Conveniencia Total",
      description: "Entrena cuando quieras sin salir de casa.",
    },
    {
      icon: Clock,
      title: "Ahorro de Tiempo",
      description: "Sin desplazamientos, maximiza tu tiempo de entrenamiento.",
    },
    {
      icon: Dumbbell,
      title: "Con o Sin Equipo",
      description: "Rutinas adaptables a lo que tengas disponible.",
    },
    {
      icon: Flame,
      title: "Quema Calorías Efectiva",
      description: "Entrenamientos intensos en espacios reducidos.",
    },
    {
      icon: Heart,
      title: "Salud Cardiovascular",
      description: "Mejora tu condición física sin necesidad de máquinas.",
    },
    {
      icon: Scale,
      title: "Progreso Personalizado",
      description: "Adapta la intensidad a tu nivel y objetivos.",
    },
  ];

  const workoutTypes = [
    {
      icon: Activity,
      title: "Entrenamiento con Peso Corporal",
      description:
        "Rutinas completas usando solo tu cuerpo como resistencia. Ideal para principiantes y avanzados.",
    },
    {
      icon: Dumbbell,
      title: "Entrenamiento con Equipo Básico",
      description:
        "Maximiza resultados con bandas de resistencia, mancuernas o kettlebells.",
    },
    {
      icon: Move,
      title: "HIIT en Casa",
      description:
        "Sesiones cortas e intensas para máxima quema de calorías en poco tiempo.",
    },
    {
      icon: Target,
      title: "Yoga y Movilidad",
      description:
        "Mejora flexibilidad, equilibrio y reduce estrés sin salir de casa.",
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
            Entrenamiento en Casa
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Transforma tu Hogar{" "}
            <span className="block text-gray-300">en tu Gimnasio</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Logra tus objetivos fitness sin salir de casa, con rutinas
            adaptables a cualquier espacio y nivel de equipamiento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() =>
                window.open(
                  "https://wa.me/5638686467?text=Hola,%20quiero%20un%20plan%20de%20entrenamiento%20en%20casa",
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
                  "https://wa.me/5638686467?text=Hola,%20quiero%20asesoría%20sobre%20entrenamiento%20en%20casa",
                  "_blank"
                )
              }
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 bg-transparent"
            >
              Hablar con un Experto
            </Button>
          </div>
        </div>
      </section>

      {/* What is Home Training Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-black mb-4">
            ¿Por Qué Entrenar en Casa?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            El entrenamiento en casa ofrece flexibilidad, privacidad y la
            posibilidad de mantener la constancia sin excusas.
          </p>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <p className="text-lg text-gray-700 mb-6">
                Ya sea que tengas un espacio dedicado o solo unos metros
                cuadrados, puedes lograr un entrenamiento efectivo. Las rutinas
                en casa se adaptan a tu horario, espacio disponible y nivel de
                equipamiento, desde cero equipo hasta gimnasios caseros
                completos.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Con la guía adecuada, los entrenamientos en casa pueden ser tan
                efectivos como los del gimnasio, enfocándose en movimientos
                funcionales que mejoran tu fuerza, resistencia y movilidad para
                la vida diaria.
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
                src="/home-workout-placeholder.jpg"
                alt="Entrenamiento en Casa"
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
              Beneficios del Entrenamiento en Casa
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre las ventajas de entrenar en tu propio espacio.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeBenefits.map((benefit, index) => {
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

      {/* Workout Types Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              Tipos de Entrenamiento en Casa
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Variedad de opciones adaptables a tus necesidades y equipamiento.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {workoutTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <div key={index} className="flex gap-6 items-start">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{type.title}</h3>
                    <p className="text-gray-700">{type.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-black mb-4">
            Equipamiento Recomendado
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Desde cero inversión hasta gimnasio casero completo.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-black transition-all duration-300">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-black mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">Sin Equipo</h3>
                <p className="text-gray-600 text-sm">
                  Rutinas efectivas usando solo tu peso corporal. Ideal para
                  principiantes o espacios limitados.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-black transition-all duration-300">
              <CardContent className="p-6">
                <Home className="h-12 w-12 text-black mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">Equipo Básico</h3>
                <p className="text-gray-600 text-sm">
                  Bandas de resistencia, mancuernas ajustables o kettlebells
                  para mayor variedad.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-black transition-all duration-300">
              <CardContent className="p-6">
                <Dumbbell className="h-12 w-12 text-black mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">Equipo Avanzado</h3>
                <p className="text-gray-600 text-sm">
                  Barras de dominadas, bancos ajustables o sistemas de
                  suspensión para entrenamiento completo.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <PlanesComponent type="casa" />
    </div>
  );
}
